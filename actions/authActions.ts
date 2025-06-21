"use server"
import { type SignInValues, type SignUpValues, signInSchema, signUpSchema } from "../lib/formSchema"
import { PrismaClientKnownRequestError } from "@prisma/client/runtime/library"
import { AuthError } from "next-auth"
import { hashSync } from "bcryptjs"
// import { redirect } from "next/navigation"
import { signIn, signOut } from "@/lib/auth"
import { db } from "@/lib/prisma"
import { createVerificationToken } from "@/lib/verification"
import { sendVerificationEmail } from "@/lib/email"

export const signInAction = async (signInValues: SignInValues) => {
  try {
    const validatedFields = signInSchema.safeParse(signInValues);

    if (!validatedFields.success) {
      console.error("Validation error:", validatedFields.error);
      return { error: "Invalid fields provided." };
    }

    const { email, password } = validatedFields.data;

    const existingUser = await db.user.findUnique({
      where: { email },
    });

    if (!existingUser || !existingUser.email || !existingUser.password) {
      console.error("User not found or no password:", email);
      return { error: "Invalid credentials." };
    }

    if (!existingUser.emailVerified) {
      const token = await createVerificationToken(email);
      await sendVerificationEmail(
        email,
        token,
        existingUser.firstName
      );
      return { error: "Please verify your email. Another confirmation link has been sent to your inbox." };
    }

    try {
      await signIn("credentials", {
        email,
        password,
        redirectTo: "/dashboard",
      });
    } catch (error) {
      console.error("SignIn error:", error);
      if (error instanceof AuthError) {
        switch (error.type) {
          case "CredentialsSignin":
            return { error: "Invalid credentials." };
          case "CallbackRouteError":
            return { error: "Authentication callback error." };
          default:
            console.error("AuthError type:", error.type);
            return { error: `Authentication error: ${error.type}` };
        }
      }
      // Log the full error for debugging
      console.error("Full signIn error:", error);
      return { error: "Authentication failed. Please try again." };
    }
  } catch (error) {
    console.error("Unexpected error in signInAction:", error);
    return { error: "An unexpected error occurred." };
  }
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

