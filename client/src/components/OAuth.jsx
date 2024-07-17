import { Button } from "flowbite-react";
import React from "react";
import { AiFillGoogleCircle } from "react-icons/ai";
import { GoogleAuthProvider, signInWithPopup, getAuth } from "firebase/auth";
import { app } from "../firebase";


export default function OAuth() {
  const auth = getAuth(app);
  const handleGoogleClick = async () => {
    const provider = new GoogleAuthProvider(); // Create a new GoogleAuthProvider instance
  
    // // Optional: Set custom parameters (e.g., always prompt the user to select an account)
    provider.setCustomParameters({ prompt: "select_account" });
  
    try {
      // Sign in with a popup window using the Google provider
      const resultsFromGoogle = await signInWithPopup(auth, provider);
      console.log(resultsFromGoogle); // Log the user information
    } catch (error) {
      console.log(error); // Log any errors that occur during sign-in
    }
  };

  return (
    <Button
      type="button"
      gradientDuoTone="pinkToOrange"
      outline
      onClick={handleGoogleClick}
    >
      <AiFillGoogleCircle className="w-5 h-5 mr-2 " /> Continue With Google
    </Button>
  );
}
