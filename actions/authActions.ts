"use server";
import { SignInValues, SignUpValues, signUpSchema } from "../lib/formSchema";
import { PrismaClientKnownRequestError } from "@prisma/client/runtime/library";
import { AuthError } from "next-auth";
import { hashSync } from "bcryptjs";
import { signIn, signOut } from "@/lib/auth";
import { db } from "@/lib/prisma";
import { sendVerificationRequest } from "@/lib/authSendRequest";
import crypto from "crypto";

export const signInAction = async (signInValues: SignInValues) => {
  const { email } = signInValues;
  const user = await db.user.findUnique({ where: { email } });
  if (user && !user.emailVerified) {
    // Generate a secure token and expiry for 24hrs
    const token = crypto.randomBytes(32).toString("hex");
    const expires = new Date(Date.now() + 24 * 60 * 60 * 1000);
    // Update user with token fields
    await db.user.update({
      where: { email },
      data: { verificationToken: token, verificationTokenExpires: expires },
    });
    const url = `${process.env.BASE_URL}/auth/verify-email?token=${token}`;
    await sendVerificationRequest({ identifier: email, url, firstName: user.firstName });
    return { error: "Please verify your email. We've sent you a new link." };
  }
  try {
    await signIn("credentials", signInValues);
  } catch (error) {
    if (error instanceof AuthError) {
      switch (error.type) {
        case "CredentialsSignin":
          return { error: "Invalid Credentials" };
        default:
          return { error: "An error occurred" };
      }
    }
    throw error;
  }
  return { redirectTo: "/" };
};

export const signUpAction = async (signUpValues: SignUpValues) => {
  const { data } = await signUpSchema.safeParseAsync(signUpValues);
  if (!data) return { error: "Invalid data" };
  try {
    const token = crypto.randomBytes(32).toString("hex");
    const expires = new Date(Date.now() + 24 * 60 * 60 * 1000);

    await db.user.create({
      data: {
        ...data,
        password: hashSync(data.password, 12),
        verificationToken: token,
        verificationTokenExpires: expires,
        emailVerified: null,
      },
    });
    // Send verification email
    const url = `${process.env.BASE_URL}/auth/verify-email?token=${token}`;
    await sendVerificationRequest({
      identifier: data.email,
      url,
      firstName: data.firstName,
    });
  } catch (error) {
    if (error instanceof PrismaClientKnownRequestError) {
      console.log(error.code);
      switch (error.code) {
        case "P2002":
          return { error: "Email already exists" };
        default:
          return { error: "An error occurred" };
      }
    }
    return { error: "An error occurred" };
  }
  return { redirectTo: "/login" };
};

export const signInUser = async (provider: string) => {
  const result = await signIn(provider);
  return result;
}

export const signOutUser = async () => {
  const result = await signOut();
  return result
}