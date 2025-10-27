"use client";
import { account, ID } from "@/lib/appwrite.client";
import { OAuthProvider } from "appwrite";

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

//sign in with email & password function
export async function signInUser({ email, password }: AuthProps) {
  try {
    return await account.createEmailPasswordSession({
      email,
      password,
    });
  } catch (error) {
    return null;
  }
}

//sign in with Google
export async function signInWithGoolge(success: string, failure: string) {
  try {
    const user = account.createOAuth2Session({
      provider: OAuthProvider.Google,
      success, // redirect here on success
      failure, // redirect here on failure
    });
    if (user) return user;
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

//sign out user function
export async function signOutUser() {
  await account.deleteSessions();
}
