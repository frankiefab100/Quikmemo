"use server";

// import { User } from "@/models/User";
import { redirect } from "next/navigation";
import { CredentialsSignin } from "next-auth";
import { signIn, signOut } from "@/auth";

export const signInUser = async (formData: FormData) => {
  const email = formData.get("email") as string;
  const password = formData.get("password") as string;

  try {
    await signIn("credentials", {
      redirect: false,
      callbackUrl: "/",
      email,
      password,
    });
  } catch (error) {
    const someError = error as CredentialsSignin;
    return someError.cause;
  }
  redirect("/");
};

export const registerUser = async (formData: FormData) => {
  const firstName = formData.get("firstname") as string;
  const lastName = formData.get("lastname") as string;
  const email = formData.get("email") as string;
  const password = formData.get("password") as string;

  if (!firstName || !lastName || !email || !password) {
    throw new Error("Please fill all fields");
  }

  // existing user
  //   const existingUser = await User.findOne({ email });
  //   if (existingUser) throw new Error("User already exists");

  //   await User.create({ firstName, lastName, email, password});
  //   console.log(`User created successfully 🥂`);
  //   redirect("/login");
  // };

  // const fetchAllUsers = async () => {
  //   const users = await User.find({});
  //   return users;
};


export const signOutUser = async () => {
  "use server";
  await signOut();
};