"use client";
import { account, ID } from "@/lib/appwrite.client";


export type AuthProps = {
  email: string;
  password: string;
};

//check auth status
export async function checkAuthStatus() {
  try {
    return await account.get();
  } catch (error) {
    return null;
  }
}

//sign up user function
export async function signUpUser({ email, password }: AuthProps) {
  try {
    const user = await account.create({
      userId: ID.unique(),
      email,
      password,
    });
    return user ?? null;
  } catch (error) {
    console.error("User signup not sucessful");
  }
}

//sign in user function
export async function signInUser({ email, password }: AuthProps) {
  try {
    const result = await account.createEmailPasswordSession({
      email,
      password,
    });
    return result ?? null;
  } catch (error) {
    console.error("Error signing in", error);
  }
}

//sign out user function
async function signOutUser() {
  await account.deleteSessions();
}
