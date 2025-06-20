"use server"
import { type SignInValues, type SignUpValues, signUpSchema } from "../lib/formSchema"
import { PrismaClientKnownRequestError } from "@prisma/client/runtime/library"
import { AuthError } from "next-auth"
import { hashSync } from "bcryptjs"
import { redirect } from "next/navigation"
import { signIn, signOut } from "@/lib/auth"
import { db } from "@/lib/prisma"
import { createVerificationToken } from "@/lib/verification"
import { sendVerificationEmail } from "@/lib/email"

export const signInAction = async (signInValues: SignInValues) => {
  try {
    await signIn("credentials", signInValues)
  } catch (error) {
    if (error instanceof AuthError) {
      switch (error.type) {
        case "CredentialsSignin":
          return { error: "Invalid Credentials" }
        default:
          return { error: "An error occurred" }
      }
    }
    throw error
  }
  redirect("/")
}

export const signUpAction = async (signUpValues: SignUpValues) => {
  const { data } = await signUpSchema.safeParseAsync(signUpValues)
  if (!data) return { error: "Invalid data" }

  try {
    // Create user with emailVerified as null (unverified)
    const user = await db.user.create({
      data: {
        ...data,
        password: hashSync(data.password, 12),
        emailVerified: null,
      },
    })

    // Generate verification token and send email
    const token = await createVerificationToken(data.email)
    await sendVerificationEmail(data.email, token, data.firstName)

    return {
      success: true,
      message: "Account created! Please check your email to verify your account.",
    }
  } catch (error) {
    if (error instanceof PrismaClientKnownRequestError) {
      console.log(error.code)
      switch (error.code) {
        case "P2002":
          return { error: "Email already exists" }
        default:
          return { error: "An error occurred" }
      }
    }
    return { error: "An error occurred" }
  }
}

export const resendVerificationEmail = async (email: string) => {
  try {
    const user = await db.user.findUnique({
      where: { email },
    })

    if (!user) {
      return { error: "User not found" }
    }

    if (user.emailVerified) {
      return { error: "Email already verified" }
    }

    const token = await createVerificationToken(email)
    await sendVerificationEmail(email, token, user.firstName)

    return { success: true, message: "Verification email sent!" }
  } catch (error) {
    console.error("Error resending verification email:", error)
    return { error: "Failed to send verification email" }
  }
}

export const signInUser = async (provider: string) => {
  const result = await signIn(provider)
  return result
}

export const signOutUser = async () => {
  const result = await signOut()
  return result
}
