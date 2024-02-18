
import React, { useState } from 'react';
import { collection, addDoc } from 'firebase/firestore';
import { getAuth, createUserWithEmailAndPassword, sendEmailVerification } from 'firebase/auth';
 // Not firebase/react

import { FirebaseAuthProvider } from 'firebase/auth';
import {  db } from '../firebaseConfig';
// import { getMessaging, getToken } from "firebase/messaging";

// import { messaging } from '../config/Admin';


const Add_Student = () => {
  const auth = getAuth();
  
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [school, setSchool] = useState('');
    const [teamPreference, setTeamPreference] = useState('');
    const [password, setPassword] = useState('');
    const [addstudent, setAddStudent] = useState(true);
  
    const addDataToFirestore = async () => {
      try {
        // Create user in Firebase Authentication
        const userCredential = await createUserWithEmailAndPassword(auth, email, password);
        const user = userCredential.user;
        
        // Send email verification
        await sendEmailVerification(user);
  
        // Add user data to Firestore
        const docRef = await addDoc(collection(db, 'users'), {
          name,
          email,
          school,
          teamPreference,
          uid: user.uid, // Add the user's UID to Firestore
        });
  
        console.log('Document written with ID: ', docRef.id);
        return true;
      } catch (e) {
        console.error('Error adding document: ', e);
        return false;
      }
    };
    
    
   
    // validation for form
    const isValidEmail = (email) => {
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      return emailRegex.test(email);
    };
  
    // Inside your handleSubmit function
    const handleSubmit = async (e) => {
      e.preventDefault();
  
      // Validate email before submitting
      if (!isValidEmail(email)) {
        alert('Please enter a valid email address');
        return;
      }
  
      const isAdded = await addDataToFirestore();
      if (isAdded) {
        alert('Data added successfully');
        try {
          const studentToken = 'YOUR_STUDENT_FCM_TOKEN'; // Replace with the student's token
          const payload = {
            notification: {
              title: 'Registration Successful!',
              body: `Welcome, ${name}! You have been successfully registered.`,
            },
            // Add data payload if needed:
            data: {
              // ... additional data to be sent to the student
            },
          };
    
          await Messaging.send({ token: studentToken, payload });
          console.log('Notification sent to student');
        } catch (error) {
          console.error('Error sending notification:', error);
          // Handle notification errors gracefully (e.g., display user-friendly messages)
        }
    
        setAddStudent(false);
      }
    };
  return (
    <>

      <div className="max-w-4xl w-full mx-2 md:mx-auto flex flex-col md:flex-row ">
        {/* Left Section - Description */}
        {addstudent ? (<button
          onClick={
            setAddStudent(false)
          }
          className="w-full p-3 bg-indigo-600 rounded text-white hover:bg-indigo-500"
        >
          Register
        </button>) : (<form
          onSubmit={handleSubmit}
          className=""
        >
          <div className="md:flex-1  border-solid border-2 border-teal-600 p-10 rounded-lg shadow-xl w-96 m-2">

            <h3 className="text-teal-600 text-2xl mb-5 font-bold  ">Add Students</h3>

            <input
              type="name"
              placeholder="Name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="w-full p-3 mb-4  rounded outline-none border-solid border-2 border-gray-600 text-teal-600 placeholder-gray-500"
            />
            <input
              type="email"
              placeholder="Email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full p-3 mb-4 rounded outline-none border-solid border-2 border-gray-600 text-teal-600 placeholder-gray-500"
            />
            <input
              type="password"
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full p-3 mb-4 text-gray-600  border-solid border-2 border-gray-600 rounded outline-none  placeholder-gray-500"
            />



            <input
              type="text"
              id="school"
              placeholder="School"
              value={school}
              onChange={(e) => setSchool(e.target.value)}
              className="w-full p-3 mb-4 border-solid border-2 border-gray-600 text-teal-600 rounded outline-none  placeholder-gray-500"
            />
            <input
              type="text"
              placeholder="class"
              id="teamPreference"
              value={teamPreference}
              onChange={(e) => setTeamPreference(e.target.value)}
              className="w-full p-3 mb-4 border-solid border-2 border-gray-600 text-teal-600 rounded outline-none  placeholder-gray-500"
            />

            <button
              type="submit"
              onClick={() => addDataToFirestore()}
              className="w-full p-3 bg-teal-600 text-white font-bold py-2 px-4 rounded-full shadow-md hover:bg-teal-700 focus:ring-2 focus:ring-teal-600 focus:ring-offset-2"
            >
             Add
            </button>


          </div>
        </form>)}
       
      </div>




    </>
  )
}

export default Add_Student