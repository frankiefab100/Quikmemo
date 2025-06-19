"use server";
import { SignInValues, SignUpValues, signUpSchema } from "../lib/formSchema";
import { PrismaClientKnownRequestError } from "@prisma/client/runtime/library";
import { AuthError } from "next-auth";
import { hashSync } from "bcryptjs";
import { redirect } from "next/navigation";
import { signIn, signOut } from "@/lib/auth";
import { db } from "@/lib/prisma";

export const signInAction = async (signInValues: SignInValues) => {
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
  redirect("/");
};

export const signUpAction = async (signUpValues: SignUpValues) => {
  const { data } = await signUpSchema.safeParseAsync(signUpValues);
  if (!data) return { error: "Invalid data" };
  try {
    await db.user.create({
      data: {
        ...data,
        password: hashSync(data.password, 12),
      },
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
  redirect("/login");
};

export const signInUser = async (provider: string) => {
  const result = await signIn(provider);
  return result;
}

export const signOutUser = async () => {
  const result = await signOut();
  return result
}