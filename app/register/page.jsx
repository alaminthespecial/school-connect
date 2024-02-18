"use client";
import React, { useState } from 'react';
import { collection, addDoc } from 'firebase/firestore';
import {  db } from '../firebaseConfig';
const Add_Student = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [school, setSchool] = useState("");

  const [teamPreference, setTeamPreference] = useState("");
  const [password, setPassword] = useState("");
  const [addstudent, setAddStudent] = useState(true);

  async function addDataToFirestore() {
    try {
      const docRef = await addDoc(collection(db, "users"), {
        name,
        email,
        school,
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
    <>

      <div className="max-w-4xl w-full mx-4 md:mx-auto flex flex-col md:flex-row ">
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
        <div className="md:flex-1 border-solid border-2 border-teal-600 p-10 rounded-lg shadow-xl w-126 m-2">

          <table className="table w-full">
            <thead>
              <tr>
                <th className="px-4 py-2 text-left text-teal-600">Name</th>
                <th className="px-4 py-2 text-left text-teal-600">Field of Interest</th>
                <th className="px-4 py-2 text-left text-teal-600">Team Perfomance</th>
                <th className="px-4 py-2 text-left text-teal-600">
                  <button>
                    Delete
                  </button></th>
              </tr>
            </thead>
            <tbody>
              {/* {students.map((student) => (
                <tr key={student.id}>
                  <td className="px-4 py-2">{student.name}</td>
                  <td className="px-4 py-2">{student.fieldOfInterest}</td>
                </tr>
              ))} */}
              <tr >
                  <td className="px-4 py-2">Al Amin</td>
                  <td className="px-4 py-2">Software Engineering</td>
                  <td className="px-4 py-2">50%</td>
                  {/* svg delete */}
                  <td className="px-4 py-2">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-red-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                    </svg>
                  </td>
                </tr>
                <tr >
                  <td className="px-4 py-2">Muhammad Al Amin</td>
                  <td className="px-4 py-2">DevOps Engineering</td>
                  <td className="px-4 py-2">70%</td>
                  <td className="px-4 py-2">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-red-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                    </svg>
                  </td>
                </tr>
            </tbody>
          </table>


        </div>
      </div>




    </>
  )
}

export default Add_Student