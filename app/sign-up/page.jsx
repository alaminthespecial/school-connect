'use client'
import { useState } from 'react';
import {useCreateUserWithEmailAndPassword} from 'react-firebase-hooks/auth'
import { auth } from '../firebaseConfig';
import Link from 'next/link';
import Image from 'next/image';

const SignUp = () => {
  
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [createUserWithEmailAndPassword] = useCreateUserWithEmailAndPassword(auth);

  const handleSignUp = async () => {
    try {
        const res = await createUserWithEmailAndPassword(email, password)
        console.log({res})
        sessionStorage.setItem('user', true)
        setEmail('');
        setPassword('')

    } catch(e){
        console.error(e)
    }
  };

  return (
    <>
    <div className="max-w-5xl w-full mx-4 md:mx-auto flex flex-col md:flex-row ">
    <div className="bg-gray-800 p-10 rounded-lg shadow-xl w-130 m-4">
      <h1 className="text-white text-2xl mb-5">Welcome to School Connect</h1>
      <p>A platform for students, parents, and teachers to connect and collaborate</p>
      <p >sign in as a tutor or student <Link  className="text-white" href='/sign-in'>Sign In</Link></p>
    </div>
    <div className="md:flex-1  bg-gray-800 p-10 rounded-lg shadow-xl w-124 m-4">
        <h1 className="text-white text-2xl mb-5">Sign Up</h1>
        <input 
          type="email" 
          placeholder="Email" 
          value={email} 
          onChange={(e) => setEmail(e.target.value)} 
          className="w-full p-3 mb-4 bg-gray-700 rounded outline-none text-white placeholder-gray-500"
        />
        <input 
          type="password" 
          placeholder="Password" 
          value={password} 
          onChange={(e) => setPassword(e.target.value)} 
          className="w-full p-3 mb-4 bg-gray-700 rounded outline-none text-white placeholder-gray-500"
        />
        <button 
          onClick={handleSignUp}
          className="w-full p-3 bg-indigo-600 rounded text-white hover:bg-indigo-500"
        >
          Sign Up
        </button>
      </div>
    </div>
     {/* feedback from user */}
     <div className="mt-4 w-full lg:w-3/4 mx-auto p-2 text-gray-600  border-solid border-2 border-gray-600 rounded outline-none mb-4">


</div>
    </>
  );
};

export default SignUp;