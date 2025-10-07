"use client";
import {
  createContext,
  useState,
  useContext,
  useEffect,
  ReactNode,
} from "react";

import { account } from "@/lib/appwrite.client";

const AuthContext = createContext(undefined);

export const AuthContextProvider = ({ children }) => {

  //check auth status
  async function checkAuthStatus() {
    try {
        // If successful, user is authenticated
        const user = await account.get();
        if(user) console.log("User is authenticated:", user);
        // Proceed with your authenticated app flow
        return user;
    } catch (error) {
        console.error("User is not authenticated:", error);
        // Redirect to login page or show login UI
        // window.location.href = '/login';
        return null;
    }
}
  //sign up user function
  async function signUpUser(email, password) {
    try {
    const user = await account.create({
        userId: '[USER_ID]',
        email,
        password
    });
    console.log(user)
} catch (e){
    console.error(e)
}
  }

  //sign in user function
  async function signInUser(email, password) {

    try {
      const result = await account.createEmailPasswordSession({
      email,
      password,

      if(error) {
        throw error;
      }      
      
    });
      console.log("Signin successful");
    } catch (error) {
      console.log("Error while signing in", error.message);      
    }
    
  }

  //sign in user function
  async function signInWithGoogle() {}

  //sign out user function
  async function signOutUser() {}
};
