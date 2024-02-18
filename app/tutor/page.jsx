"use client";
import Add_Student from '../components/AddStudent';
import AdminSet from '../components/AdminSet'

import React, { useState } from 'react';
import ViewStudent from '../components/ViewStudent';
import SetQuestions from '../components/SetQuestions';
// Assuming you have a SetQuestions component

const Tutor = () => {
    const [currentTab, setCurrentTab] = useState('addStudent'); // Default tab is for adding students

    const handleTabChange = (tab) => {
        setCurrentTab(tab);
    };

    return (
        <>
            <div className='p-8  justify-center items-center'>
            <h1 className=' border border-teal-600 p-4 rounded-md font-bold text-center bg-gray-700 text-white'>                    
                    Tutor DashBoard</h1>
            </div>



            <div className="admin-panel flex p-8">

                <span className=" bg-teal-400 p-2 space-y-2">
                    <div>
                        <button
                            className={`tab-button dark:text-gray-800 border-solid border-2 border-teal-600 hover:bg-gray-700 hover:text-white px-2 py-1 rounded-md text-sm font-medium ${currentTab === 'addStudent' ? 'active-tab' : ''
                                }`}
                            onClick={() => handleTabChange('viewProfile')}
                        >
                            Profile         
                        </button>
                    </div>
                    <div>
                        <button
                            className={`tab-button dark:text-gray-800 border-solid border-2 border-teal-600 hover:bg-gray-700 hover:text-white px-2 py-1 rounded-md text-sm font-medium ${currentTab === 'addStudent' ? 'active-tab' : ''
                                }`}
                            onClick={() => handleTabChange('addStudent')}
                        >
                            Add Students
                        </button>
                    </div>
                    <div>
                        <button
                            className={`tab-button dark:text-gray-800 border-solid border-2 border-teal-600 hover:bg-gray-700 hover:text-white px-2 py-1 rounded-md text-sm font-medium ${currentTab === 'viewStudent' ? 'active-tab' : ''
                                }`}
                            onClick={() => handleTabChange('viewStudent')}
                        >
                            View Students
                        </button>
                    </div>
                    <div>
                        <button
                            className={`tab-button dark:text-gray-800 border-solid border-2 border-teal-600 hover:bg-gray-700 hover:text-white px-2 py-1 rounded-md text-sm font-medium ${currentTab === 'setQuestions' ? 'active-tab' : ''
                                }`}
                            onClick={() => handleTabChange('setQuestions')}
                        >
                            Set Questions
                        </button>
                    </div>
                </span>


                <div className="tab-content bg-white p-8 flex-1">
                    {currentTab === 'addStudent' && (
                        <div className="add-student-content">
                            <h2 className="text-2xl font-bold mb-4">Add Student</h2>
                            <Add_Student />
                        </div>
                    )}

                    {currentTab === 'viewStudent' && (
                        <div className="view-student-content">
                            <h2 className="text-2xl font-bold mb-4">View Students</h2>
                            <ViewStudent />
                        </div>
                    )}


                    {currentTab === 'setQuestions' && (
                        <div className="set-questions-content">
                            {/* Your SetQuestions component goes here */}
                            <h2 className="text-2xl font-bold mb-4">Set Questions</h2>
                            <SetQuestions />
                        </div>
                    )}

                    {currentTab === 'viewProfile' && (
                        <div className="view-student-content">
                            <h2 className="text-2xl font-bold mb-4">View Profile</h2>
                            <ViewStudent />
                        </div>
                    )}
                </div>
            </div>
        </>
    );
};


export default Tutor