'use client'
import { useState } from 'react';
import { useAuthState, useSignInWithEmailAndPassword } from 'react-firebase-hooks/auth'
import { auth } from '../firebaseConfig';
import { useRouter } from 'next/navigation';
import { createUserWithEmailAndPassword } from 'firebase/auth';
import Link from 'next/link';
import Image from 'next/image';
import { getDocs, collection, where } from 'firebase/firestore';
import { db } from '../firebaseConfig';
import bcrypt from 'bcryptjs';
import { createHash } from 'crypto';

const SignIn = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [signInWithEmailAndPassword] = useSignInWithEmailAndPassword(auth);
  const router = useRouter();
 

  // const handleSignIn = async () => {
  //   console.log("this is value you provided",email, password);
  //   try {
  //     const querySnapshot = await getDocs(collection(db, "users"), where("email", "==", email));
  //     const userDoc = querySnapshot.docs[0];

  //     // Handle user not found case
  //     if (!userDoc) {
  //       console.error("User not found");
  //       // Show an error message to the user
  //       return;
  //     }

  //     const storedHashedPassword = userDoc.data().password;

  //     // Hash the entered password using bcrypt
  //     const hashedEnteredPassword = await bcrypt.hash(password, 10); // Adjust salt rounds as needed

  //     // Compare hashed passwords securely
  //     const isPasswordMatch = await bcrypt.compare(hashedEnteredPassword, storedHashedPassword);

  //     if (isPasswordMatch) {
  //       // Continue with authentication
  //       await signInWithEmailAndPassword(auth, email, password);
  //       console.log("User signed in successfully");
  //       alert("You signed in successfully");
  //       router.push('/student');
  //     } else {
  //       console.error("Invalid password");
  //       // Show an error message to the user
  //     }
  //   } catch (error) {
  //     console.error("Login error:", error.message);
  //     // Handle errors appropriately
  //   }
  // };


  
 

  async function comparePasswords(enteredPassword, storedHashedPassword) {
    // Hash the entered password using the same algorithm and salt used for storing the password
    // const hashedEnteredPassword = createHash('sha256').update(enteredPassword).digest('hex');
   
console.log("Entered Password:", enteredPassword);
console.log("Stored Hashed Password:", storedHashedPassword);
// console.log("Hashed Entered Password:", hashedEnteredPassword);

  
    // Compare the hashed entered password with the stored hashed password
    return storedHashedPassword == storedHashedPassword;
  }
  
 

  const handleSignIn = async () => {
    try {
      await createUserWithEmailAndPassword(auth, email, password); // Check for existing user
      console.log("User created successfully");
    } catch (error) {
      if (error.code === 'auth/email-already-in-use') {
        // User already exists, proceed with sign-in
        const res = await signInWithEmailAndPassword(auth, email, password);
        console.log({ res });
        sessionStorage.setItem('user', true);
        setEmail('');
        setPassword('');
        alert("You signed in successfully");
        router.push('/tutor');
      } else {
        console.error(error);
      }
    }
  };

  return (
    <>
      <div className="max-w-5xl w-full mx-4 md:mx-auto flex flex-col md:flex-row  ">
        <div className=" text-gray-600  border-solid border-2 border-teal-600 p-10 rounded-lg shadow-xl w-130 m-4">
          <h1 className="text-white text-2xl mb-5"><span className="text-gray-600">Welcome to</span> <span className="text-teal-600"> School </span><span className="text-gray-600">Connect</span></h1>
          <p>A platform for students, parents, and teachers to connect and collaborate</p>
          <p >sign up as a Class Coordinator or Tutor <Link className="text-white" href='/sign-up'>Sign Up</Link></p>
        </div>
        <div className="md:flex-1 p-10 text-gray-600  border-solid border-2 border-teal-600 rounded-lg shadow-xl w-124 m-4">


          <h1 className="text-teal-600 text-2xl mb-5">Sign In</h1>
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
            onClick={handleSignIn}
            className="w-full p-3 bg-indigo-600 rounded text-white hover:bg-indigo-500"
          >
            Sign In
          </button>


        </div>
      </div>
      {/* feedback from user */}
      <div className="mt-4 w-full lg:w-3/4 mx-auto p-2 text-gray-600  border-solid border-2 border-gray-600 rounded outline-none mb-4">


        <h3 className="text-2xl mb-5 font-bold text-teal-600 ">FeedBack</h3>
        <p>Feedback from users</p>





        <div className="flex flex-col md:flex-row justify-between items-center p-2  ">
          <div className="flex items-center gap-2">
            <Image
              src="/amin.png"
              width={50}
              height={50}
              alt='profile'
              className='rounded-full'
            />
            <div>
              <h3 className="text-teal-600 text-lg font-bold">Amin</h3>
              <p className="text-gray-800">Student</p>
            </div>
          </div>
          <p className="text-gray-800">2 days ago</p>
          <p className="text-gray-800 mt-2">I love this platform, it has helped me a lot in my studies</p>
        </div>

        <div className="flex flex-col md:flex-row justify-between items-center p-2">
          <div className="flex items-center gap-2">
            <Image
              src="/amin.png"
              width={50}
              height={50}
              alt='profile'
              className='rounded-full'
            />
            <div>
              <h3 className="text-teal-600 text-lg font-bold">Amin</h3>
              <p className="text-gray-400">Student</p>
            </div>
          </div>
          <p className="text-gray-800">2 days ago</p>
          <p className="text-gray-800 mt-2">I love this platform, it has helped me a lot in my studies</p>
        </div>
      </div>

    </>
  );
};

export default SignIn;