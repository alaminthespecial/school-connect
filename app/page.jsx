"use client";
import Image from "next/image";
import { collection, addDoc } from "firebase/firestore";
import {  signInWithEmailAndPassword, signOut } from 'firebase/auth';
import { createUserWithEmailAndPassword } from "firebase/auth";
import React, { useState } from "react";
// Your component or file
import { auth, db } from './firebaseConfig';

import {useAuthState} from 'react-firebase-hooks/auth'
import { useRouter } from "next/navigation";
import WelcomePage from "./components/WelcomePage";
import Navbar from "./components/Navbar";
import AdminSet from "./components/AdminSet";
import SignIn from "./sign-in/page";


export default function Home() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [school, setSchool] = useState("");
  const [position, setPosition] = useState("");
  const [profilePic, setProfilePic] = useState("");
  const [teamPreference, setTeamPreference] = useState("");
  const [password, setPassword] = useState("");
  const [signInEmail, setSignInEmail] = useState("");
  const [signInPassword, setSignInPassword] = useState("");
  
  const [user] =useAuthState(auth);
  const router =useRouter();
  const userSession=sessionStorage.getItem('user');
  if(!user && !userSession){
    router.push('/sign-up')
  }
  
  
  //sign in with email and password
  // const auth = getAuth();
  const handleSignIn = async () => {
    try {
      const userCredential = await signInWithEmailAndPassword(auth, signInEmail, signInPassword);
      const user = userCredential.user;
      console.log(user);
      alert("Signed in successfully!");
      // You can redirect or perform other actions after successful sign-in

    } catch (e) {
      console.error(e);
      alert("Error signing in. Please check your email and password.");
    }
  };
  
  
 

  
  //add data to firestore

  async function addDataToFirestore() {
    try {
      const docRef = await addDoc(collection(db, "users"), {
        name,
        email,
        school,
        position,
        profilePic,
        teamPreference,
        password,
      });
      console.log("Document written with ID: ", docRef.id);
      return true;
    } catch (e) {
      console.error("Error adding document: ", e);
      return false;
    }
  }
  //validation for form
  const isValidEmail = (email) => {
    // Use a regular expression for basic email validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  };

  // Inside your handleSubmit function
  const handleSubmit = async (e) => {
    e.preventDefault();

    // Validate email before submitting
    if (!isValidEmail(email)) {
      alert("Please enter a valid email address");
      return;
    }

    const isAdded = await addDataToFirestore();
    if (isAdded) {
      alert("Data added successfully");
    }
  };


  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-24">
     {/* <SignIn/> */}
      {/* if user is student take him to welcome student else if is tutor or class coordinator take him to welcome admin */}
     <WelcomePage/>
     
      {/* Handle submit button  */}
      {/* <form
        onSubmit={handleSubmit}
        className="flex flex-col items-center justify-between space-y-4"
      >
        <div className="flex flex-row items-center justify-between space-y-4">
          <label htmlFor="name">Name:</label>
          <input
            type="text"
            id="name"
            placeholder="Name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            className="p-2 border-2 border-gray-300 rounded-md"
          />
        </div>
        <div className="flex flex-row items-center justify-between space-y-4">
          <label htmlFor="email">Email:</label>
          <input
            type="email"
            id="email"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="p-2 border-2 border-gray-300 rounded-md"
          />
        </div>
        {/* ... existing form fields ... */}
        {/* <label htmlFor="password">Password:</label>
        <input
          type="password"
          placeholder="Password"
          id="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          className="p-2 border-2 border-gray-300 rounded-md"
        />

        <div className="flex flex-row items-center justify-between space-y-4">
          <input
            type="text"
            id="school"
            placeholder="School"
            value={school}
            onChange={(e) => setSchool(e.target.value)}
            className="p-2 border-2 border-gray-300 rounded-md"
          />
        </div>
        <input
          type="text"
          placeholder="Position"
          id="position"
          value={position}
          onChange={(e) => setPosition(e.target.value)}
          className="p-2 border-2 border-gray-300 rounded-md"
        />
        <div className="flex flex-col items-center justify-between space-y-4">
          <label htmlFor="profilePic">Profile Picture:</label>
          <input
            type="text"
            id="profilePic"
            placeholder="Profile Picture"
            value={profilePic}
            onChange={(e) => setProfilePic(e.target.value)}
            className="p-2 border-2 border-gray-300 rounded-md"
          />
        </div>
        <label htmlFor="teamPreference">Team Preference:</label>

        <input
          type="text"
          placeholder="Team Preference"
          id="teamPreference"
          value={teamPreference}
          onChange={(e) => setTeamPreference(e.target.value)}
          className="p-2 border-2 border-gray-300 rounded-md"
        />
        <button
          type="submit"

          className="p-2 bg-blue-500 text-white rounded-md"
        >submit</button> */}
      {/* </form> */} 

      {/* Sign-in form */}
      {/* <form onSubmit={handleSignIn} className="flex flex-col items-center justify-between space-y-4">
        <label htmlFor="signInEmail">Email:</label>
        <input
          type="email"
          id="signInEmail"
          placeholder="Email"
          value={signInEmail}
          onChange={(e) => setSignInEmail(e.target.value)}
          className="p-2 border-2 border-gray-300 rounded-md"
        />
        <label htmlFor="signInPassword">Password:</label>
        <input
          type="password"
          id="signInPassword"
          placeholder="Password"
          value={signInPassword}
          onChange={(e) => setSignInPassword(e.target.value)}
          className="p-2 border-2 border-gray-300 rounded-md"
        />
        <button type="submit" className="p-2 bg-blue-500 text-white rounded-md">
          Sign In
        </button>
      </form> */}
      
    </main>
  );
}
