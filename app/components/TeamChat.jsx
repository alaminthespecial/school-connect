"use client";
// TeamChat.js
// TeamChat.js
import React, { useState } from 'react';

const TeamChat = ({questions}) => {
  const [message, setMessage] = useState('');
  const [chatMessages, setChatMessages] = useState([]);
  const [answer, setAnswer] = useState('');

  const handleSendMessage = () => {
    if (message.trim() !== '') {
      setChatMessages([...chatMessages, { sender: 'You', message, timestamp: new Date() }]);
      setMessage('');
    }
  };

  return (
    <>
    
    <div className="team-chat-container bg-white p-4 rounded-md shadow-md flex">
      {/* Left section for chat */}
      
      <div className="team-chat-messages h-48 overflow-y-auto flex">
        {chatMessages.map((chat, index) => (
          <div key={index} className="team-chat-message">
            <span className="team-chat-sender font-bold">{chat.sender}:</span>
            <span className="team-chat-text ml-2">{chat.message}</span>
          </div>
        ))}
      </div>
      {/* <div className="questions-box">
        <h2>Recent Questions</h2>
        {questions && Array.isArray(questions) && questions.length > 0 ? (
          questions.map((question, index) => (
            <div key={index} className="question-card">
            
            </div>
          ))
        ) : (
          <p>No recent questions available.</p>
        )}
      </div> */}
      

      {/* Right section for answering questions */}
      <div className="team-answer-section ml-4 flex-1">
     
      {questions && Array.isArray(questions) && questions.length > 0 ? (
          questions.map((question, index) => (
            <div key={index} className="question-card">
            
            </div>
          ))
        ) : (
          <p>No recent questions available.</p>
        )}
         
        <button
          onClick={() => {
            // Implement logic to submit the answer
            console.log('Answer submitted:', answer);
            setAnswer('');
          }}
          className="bg-teal-600 text-white px-4 py-2 rounded-md hover:bg-teal-700"
        >
          Submit Answer
        </button>
      </div>

      {/* Input area for chat */}
      <div className="team-chat-input ml-4">
        <textarea
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          placeholder="Type your message..."
          className="w-full p-2 border border-gray-300 rounded-md"
        />
        <button
          onClick={handleSendMessage}
          className="bg-teal-600 text-white px-4 py-2 rounded-md ml-2 hover:bg-teal-700"
        >
          Send
        </button>
      </div>
    </div>
    </>
  );
};

export default TeamChat;


