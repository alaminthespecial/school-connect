"use client";
import React from 'react'

import { useState, useEffect } from 'react';
import { collection, getDocs } from 'firebase/firestore';
import { db } from '../firebaseConfig';

const Profile = () => {
  const [students, setStudents] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const querySnapshot = await getDocs(collection(db, 'users'));
        const data = querySnapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() }));
        setStudents(data);
      } catch (error) {
        console.error('Error fetching data from Firestore:', error);
      }
    };

    fetchData();
  }, []);

  return (
    <div className="md:flex-1 border-solid border-2 border-teal-600 p-10 rounded-lg shadow-xl w-126 m-2">
      <table className="table w-full">
        <thead>
          <tr>
            <th className="px-4 py-2 text-left text-teal-600">Name</th>
            <th className="px-4 py-2 text-left text-teal-600">Field of Interest</th>
            <th className="px-4 py-2 text-left text-teal-600">Team Performance</th>
            <th className="px-4 py-2 text-left text-teal-600">Delete</th>
          </tr>
        </thead>
        <tbody>
          {students.map((student) => (
            <tr key={student.id}>
              <td className="px-4 py-2">{student.name}</td>
              <td className="px-4 py-2">{student.email}</td>
              <td className="px-4 py-2">{student.password}</td>
              <td className="px-4 py-2">
                <button onClick={() => handleDelete(student.id)}>Delete</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default Profile;
