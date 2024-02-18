"use client";
import React, { useState } from 'react';

import Link from 'next/link';
import TeamChat from '../components/TeamChat';
import LeaderBoard from '../components/LeaderBoard';
import Profile from '../components/Profile';
import { Spin } from 'antd';
import { Modal, Form, Input, Button, Select, message } from 'antd';
import axios from 'axios';
import { remark } from 'remark';
import remarkHtml from 'remark-html';
const Student = () => {
  const [selectedInterest, setSelectedInterest] = useState('');
  const [selectedTeam, setSelectedTeam] = useState('');
  const [joinedTeam, setJoinedTeam] = useState('');
  const [loading,setLoading]=useState(false);
  const [suggest,setSuggest]=useState('')
  const [currentTab, setCurrentTab] = useState('AreaOfInterest'); // Default tab is for adding students
  const [showAIForm, setShowAIForm] = useState(true);
  const handleTabChange = (tab) => {
    setCurrentTab(tab);
  };
  const onAIButtonClick = () => {
    setShowAIForm(false);
  };

  const interests = ['Mathematics', 'Science', 'Literature', 'History', 'Music', 'Others'];

  const teams = ['Team A', 'Team B', 'Team C', 'Team D', 'Create Team'];

  const handleInterestChange = (interest) => {
    setSelectedInterest(interest);
  };

  const handleTeamChange = (team) => {
    setSelectedTeam(team);
  };

  const handleJoinTeam = () => {
    setJoinedTeam(selectedTeam);
  };

  const onFinish = async (values) => {
       
    setLoading(true);

    try {
      // alert('am still here')
    
      const response = await axios.post('api/suggestroute', { syllabus: values.syllabus});

      console.log('this is the questions generated', typeof response.data.summarization);
      const processRemark= remark().use(remarkHtml).processSync(response.data.summarization).toString();
      console.log(response.data.summarization)
      // setQuestions(response.data.summarization);
      // console.log('this is response',response.data.summarization)
      setSuggest(processRemark);

      // setSummarization(response.data.summarization);
    } catch (error) {
      console.log(error)
      message.error(error.response?.data?.message || " Something went wrong from this");
    } finally {
      setLoading(false)
    }
  };




  return (
    <>
      <div className='p-8  justify-center items-center'>
        <h1 className=' border border-teal-600 p-4  rounded-md font-bold text-center bg-gray-700 text-white'>
          Student DashBoard</h1>
      </div>



      <div className="admin-panel flex p-8">

        <span className=" bg-teal-400 p-2 space-y-2">
          <div>
            <button
              className={`tab-button dark:text-gray-800 border-solid border-2 border-teal-600 hover:bg-gray-700 hover:text-white px-2 py-1 rounded-md text-sm font-medium ${currentTab === 'addStudent' ? 'active-tab' : ''
                }`}
              onClick={() => handleTabChange('ViewProfile')}
            >
              Profile
            </button>
          </div>
          <div>
            <button
              className={`tab-button dark:text-gray-800 border-solid border-2 border-teal-600 hover:bg-gray-700 hover:text-white px-2 py-1 rounded-md text-sm font-medium ${currentTab === 'addStudent' ? 'active-tab' : ''
                }`}
              onClick={() => handleTabChange('AreaOfInterest')}
            >
              Interested Area
            </button>
          </div>
          <div>
            <button
              className={`tab-button dark:text-gray-800 border-solid border-2 border-teal-600 hover:bg-gray-700 hover:text-white px-2 py-1 rounded-md text-sm font-medium ${currentTab === 'addStudent' ? 'active-tab' : ''
                }`}
              onClick={() => handleTabChange('Task')}
            >
              Assigment
            </button>
          </div>
          <div>
            <button
              className={`tab-button dark:text-gray-800 border-solid border-2 border-teal-600 hover:bg-gray-700 hover:text-white px-2 py-1 rounded-md text-sm font-medium ${currentTab === 'viewStudent' ? 'active-tab' : ''
                }`}
              onClick={() => handleTabChange('ViewTeam')}
            >
              View Teams
            </button>
          </div>
          <div>
            <button
              className={`tab-button dark:text-gray-800 border-solid border-2 border-teal-600 hover:bg-gray-700 hover:text-white px-2 py-1 rounded-md text-sm font-medium ${currentTab === 'viewStudent' ? 'active-tab' : ''
                }`}
              onClick={() => handleTabChange('Leaderboard')}
            >
              LeaderBoards
            </button>
          </div>
        </span>


        <div className="tab-content bg-white p-8 flex-1">
          {currentTab === 'AreaOfInterest' && (
            
            <div className="add-student-content">
              <h1 className="text-3xl font-bold text-center mb-8">Choose Your Area of Interest</h1>
                          {showAIForm ? (
        <button
          className="bg-teal-600 text-white font-bold py-2 px-4 rounded-full shadow-md hover:bg-teal-700 focus:ring-2 focus:ring-teal-600 focus:ring-offset-2"
          onClick={onAIButtonClick}
        >
          Use AI
        </button>
      ) : (
              

        <div className="flex items-center mt-4">
                
        <Form layout={'vertical'} onFinish={onFinish}>

            <Form.Item label="What do you want to be....?" name="syllabus">
                <Input.TextArea rows={8} placeholder="Type Area" />
            </Form.Item>
            <Form.Item>
                <Button type="primary" htmlType="submit" style={{ color: 'white', background: 'black' }}>

                    Suggest me
                </Button>
            </Form.Item>


        </Form>
        {loading && <Spin tip="Generating questions..." />}
        {suggest &&  <div


className='mt-2 mr-6 ml-6 mb-6'

style={{
  textOverflow: 'ellipsis',
  fontFamily: 'Times New Roman',
  fontSize: '12pt',
}}
suppressContentEditableWarning={true}
dangerouslySetInnerHTML={{ __html: suggest }} />}


    </div>
      )}
      <section className="bg-gray-100 p-8 rounded-lg shadow-md mb-16">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <h2 className="text-lg font-bold mb-4">Areas of Interest</h2>
                    <ul className="space-y-2">
                      {interests.map((interest) => (
                        <li key={interest}>
                          <label className="flex items-center space-x-2">
                            <input
                              type="checkbox"
                              name="interest"
                              value={interest}
                              checked={selectedInterest === interest}
                              onChange={() => handleInterestChange(interest)}
                              className="form-radio"
                            />
                            <span>{interest}</span>
                          </label>
                        </li>
                      ))}
                    </ul>
                  </div>

                  <div className="flex items-center justify-center">
                    <img
                      src="/maths.jpeg"
                      alt="Interest Image"
                      className="max-w-full h-auto rounded-md"
                    />
                  </div>
                </div>

                <h2 className="text-lg font-bold mt-4 mb-2">Choose a Team</h2>
                <div className="flex items-center space-x-2">
                  {teams.map((team) => (
                    <label key={team} className="flex items-center space-x-2">
                      <input
                        type="radio"
                        name="team"
                        value={team}
                        checked={selectedTeam === team}
                        onChange={() => handleTeamChange(team)}
                        className="form-radio"
                      />
                      <span>{team}</span>
                    </label>
                  ))}
                </div>

                <button
                  onClick={handleJoinTeam}
                  className="bg-teal-600 text-white font-bold py-2 px-4 rounded-full shadow-md hover:bg-teal-700 focus:ring-2 focus:ring-teal-600 focus:ring-offset-2 mt-4"
                >
                  Join Team
                </button>

                {joinedTeam && (
                  <p className="text-green-600 mt-2">
                    You have successfully joined <strong>{joinedTeam}</strong>!
                  </p>
                )}


              </section>
            </div>
          )}
          {currentTab === 'ViewTeam' && (
            <div className="add-student-content">
              <h2 className="text-2xl font-bold mb-4">Team Members</h2>
              <Profile />
            </div>
          )}
          {currentTab === 'ViewProfile' && (
            <div className="add-student-content">
              <h2 className="text-2xl font-bold mb-4">My Profile</h2>
              <div className="max-w-screen-xl mx-auto py-16 px-4">



                <Profile />

              </div>
            </div>
          )}
          {currentTab === 'Leaderboard' && (
            <div className="add-student-content">
              <h2 className="text-2xl font-bold mb-4">Team Members</h2>
              <LeaderBoard />
            </div>
          )}
          {currentTab === 'Task' && (
            <div className="add-student-content">
              <h2 className="text-2xl font-bold mb-4">Task</h2>
              <TeamChat />
            </div>
          )}






        </div>
      </div>

    </>

  );
};

export default Student;



