"use client";
import React from 'react'
import { useState } from 'react';
// const SetQuestions = () => {


//   const [questionType, setQuestionType] = useState('');
//   const [multipleChoiceOptions, setMultipleChoiceOptions] = useState([]);

//   const handleQuestionTypeChange = (event) => {
//     setQuestionType(event.target.value);
//   };

//   const addMultipleChoiceOption = () => {
//     // Implement logic to add a new option to multipleChoiceOptions array
//   };

//   return (
//     <>
//         <main className="max-w-screen-xl mx-auto py-16 px-4">
//         <h1 className="text-3xl font-bold text-center mb-8">Craft Your Question</h1>

//         <section className="bg-gray-100 p-8 rounded-lg shadow-md mb-16">
//           {/* create section that if user select a multiple choice they can add it with its options and if i user select others can be able to do it as well */}

//           {/* Question Input */}
//           {questionType === 'multiple-choice' && (
//     <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
//       {/* Dynamically render multiple choice options */}
//       {multipleChoiceOptions.map((option, index) => (
//         <div key={index} className="flex items-center">
//           <input
//             type="radio"
//             id={`option-${index}`}
//             name="selectedOption"
//             value={option}
//             // Handle option selection logic here
//           />
//           <label htmlFor={`option-${index}`} className="ml-2">{option}</label>
//         </div>
//       ))}

//       <button
//         className="bg-gray-200 hover:bg-gray-300 text-gray-600 px-4 py-2 rounded-md mt-4"
//         onClick={() => addMultipleChoiceOption()}
//       >
//         Add Option
//       </button>
//     </div>
//   )}

//   {/* Others Field */}
//   {questionType === 'others' && (
//     <textarea
//       className="w-full px-4 py-2 border border-gray-300 rounded-md mt-4"
//       placeholder="Enter your answer here..."
//       // Handle "others" input logic here
//     />
//   )}
//           <textarea
//             className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-teal-600 focus:ring-offset-2"
//             placeholder="Enter your question here..."
//           />

//           {/* Question Type Selector */}
//           <div className="flex items-center mt-4">
//             <label htmlFor="questionType" className="block text-gray-700 font-bold mb-2">Question Type:</label>
//             <select id="questionType" className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-teal-600 focus:ring-offset-2">
//               <option value="">Select a question type...</option>
//               <option value="multiple-choice">Multiple Choice</option>
//               <option value="true-false">True/False</option>
//               <option value="short-answer">Short Answer</option>
//               {/* Add more options as needed */}
//             </select>
//           </div>



//           {/* Additional Settings (time and scheduled for student to do assignment)) */}
          
//             <div className="flex items-center">
//               <label htmlFor="timeLimit" className="block text-gray-700 font-bold mb-2">Time Limit:</label>
//               <input
//                 type="number"
//                 id="timeLimit"
//                 className="w-24 px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-teal-600 focus:ring-offset-2"
//                 placeholder="Time in minutes"
//               />

//               <label htmlFor="scheduledDate" className="block text-gray-700 font-bold mb-2 ml-4">Scheduled Date:</label>
//               <input
//                 type="date"
//                 id="scheduledDate"
//                 className="w-48 px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-teal-600 focus:ring-offset-2"
//               />

//               <label htmlFor="scheduledTime" className="block text-gray-700 font-bold mb-2 ml-4">Scheduled Time:</label>
//               <input
//                 type="time"
//                 id="scheduledTime"
//                 className="w-36 px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-teal-600 focus:ring-offset-2"
//               />
//               <p className="text-gray-500 text-sm ml-4">Leave blank for no schedule</p>


//           </div>
//         </section>


//         {/* Submit Button */}
//         <button className="bg-teal-600 text-white font-bold py-2 px-4 rounded-full shadow-md hover:bg-teal-700 focus:ring-2 focus:ring-teal-600 focus:ring-offset-2">
//           Create Question
//         </button>
//       </main>
//     </>
//   )
// }

// export default SetQuestions


// Path: school-connect/app/set-question/page.jsx

// Compare this snippet from school-connect/app/sign-up/page.jsx:




const SetQuestions = () => {
  const [questions, setQuestions] = useState([]);
  const [currentQuestion, setCurrentQuestion] = useState({
    questionType: '',
    questionText: '',
    multipleChoiceOptions: [],
    correctAnswer: '',
    timeLimit: '',
    scheduledDate: '',
    scheduledTime: '',
  });
  const submitQuestionToFirebase = async () => {
    try {
      const db = firebase.firestore();
      // Assuming you have a 'questions' collection
      await db.collection('questions').add(currentQuestion);

      // Optionally, you can reset the state after submission
      setQuestions([]);
      setCurrentQuestion({
        questionType: '',
        questionText: '',
        multipleChoiceOptions: [],
        correctAnswer: '',
        timeLimit: '',
        scheduledDate: '',
        scheduledTime: '',
      });

      console.log('Question submitted to Firebase successfully!');
    } catch (error) {
      console.error('Error submitting question to Firebase:', error);
    }
  };

  const handleQuestionTypeChange = (event) => {
    const selectedType = event.target.value;
    setCurrentQuestion({
      ...currentQuestion,
      questionType: selectedType,
      multipleChoiceOptions: [],
      correctAnswer: '',
    });

    // Reset options for other question types
    if (selectedType === 'true-false' || selectedType === 'short-answer') {
      setCurrentQuestion({
        ...currentQuestion,
        multipleChoiceOptions: [],
        correctAnswer: '',
      });
    }
  };

  const handleOptionChange = (index, value) => {
    setCurrentQuestion({
      ...currentQuestion,
      multipleChoiceOptions: [...currentQuestion.multipleChoiceOptions.slice(0, index), value, ...currentQuestion.multipleChoiceOptions.slice(index + 1)],
    });
  };

  const addMultipleChoiceOption = () => {
    if (currentQuestion.questionType === 'multiple-choice') {
      setCurrentQuestion({
        ...currentQuestion,
        multipleChoiceOptions: [...currentQuestion.multipleChoiceOptions, ''],
      });
    }
  };

  const removeMultipleChoiceOption = (index) => {
    const updatedOptions = [...currentQuestion.multipleChoiceOptions];
    updatedOptions.splice(index, 1);
    setCurrentQuestion({
      ...currentQuestion,
      multipleChoiceOptions: updatedOptions,
    });
  };

  const handleCorrectAnswerChange = (event) => {
    setCurrentQuestion({
      ...currentQuestion,
      correctAnswer: event.target.value,
    });
  };

  const handleQuestionTextChange = (event) => {
    setCurrentQuestion({
      ...currentQuestion,
      questionText: event.target.value,
    });
  };

  const handleTimeLimitChange = (event) => {
    setCurrentQuestion({
      ...currentQuestion,
      timeLimit: event.target.value,
    });
  };

  const handleScheduledDateChange = (event) => {
    setCurrentQuestion({
      ...currentQuestion,
      scheduledDate: event.target.value,
    });
  };

  const handleScheduledTimeChange = (event) => {
    setCurrentQuestion({
      ...currentQuestion,
      scheduledTime: event.target.value,
    });
  };

  const addQuestion = () => {
    setQuestions([...questions, currentQuestion]);
    setCurrentQuestion({
      questionType: '',
      questionText: '',
      multipleChoiceOptions: [],
      correctAnswer: '',
      timeLimit: '',
      scheduledDate: '',
      scheduledTime: '',
    });
  };

  return (
    <main className="max-w-screen-xl mx-auto py-16 px-4">
      <h1 className="text-3xl font-bold text-center mb-8">Set Your Question</h1>

      <section className="bg-gray-100 p-8 rounded-lg shadow-md mb-16">
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <textarea
            value={currentQuestion.questionText}
            onChange={handleQuestionTextChange}
            className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-teal-600 focus:ring-offset-2"
            placeholder="Enter your question here..."
          />

          <div className="flex items-center mt-4">
            <label htmlFor="questionType" className="block text-gray-700 font-bold mb-2">
              Question Type:
            </label>
            <select
              id="questionType"
              value={currentQuestion.questionType}
              onChange={handleQuestionTypeChange}
              className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-teal-600 focus:ring-offset-2"
            >
              <option value="">Select a question type...</option>
              <option value="multiple-choice">Multiple Choice</option>
              <option value="true-false">True/False</option>
              <option value="short-answer">Short Answer</option>
            </select>
          </div>
        </div>

        {currentQuestion.questionType === 'multiple-choice' && (
          <>
            <div className="options mt-4">
              {currentQuestion.multipleChoiceOptions.map((option, index) => (
                <div key={index} className="option-row">
                  <input
                    type="text"
                    value={option}
                    onChange={(event) => handleOptionChange(index, event.target.value)}
                    placeholder={`Option ${index + 1}`}
                    className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-teal-600 focus:ring-offset-2"
                  />
                  <button onClick={() => removeMultipleChoiceOption(index)}>
                    Remove
                  </button>
                </div>
              ))}
              <button onClick={addMultipleChoiceOption} className="bg-gray-200 hover:bg-gray-300 text-gray-600 px-4 py-2 rounded-md mt-4">
                Add Option
              </button>
            </div>

            <label htmlFor="correctAnswer" className="block text-gray-700 font-bold mb-2 mt-4">
              Correct Answer:
            </label>
            <select
              id="correctAnswer"
              value={currentQuestion.correctAnswer}
              onChange={handleCorrectAnswerChange}
              className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-teal-600 focus:ring-offset-2"
            >
              <option value="">Select Correct Answer</option>
              {currentQuestion.multipleChoiceOptions.map((option) => (
                <option key={option} value={option}>
                  {option}
                </option>
              ))}
            </select>
          </>
        )}

        {currentQuestion.questionType === 'true-false' && (
          <div className="options mt-4">
            <label>
              <input
                type="radio"
                name="trueFalseOption"
                value="true"
                checked={currentQuestion.correctAnswer === 'true'}
                onChange={handleCorrectAnswerChange}
              />
              True
            </label>
            <label>
              <input
                type="radio"
                name="trueFalseOption"
                value="false"
                checked={currentQuestion.correctAnswer === 'false'}
                onChange={handleCorrectAnswerChange}
              />
              False
            </label>
          </div>
        )}

        {currentQuestion.questionType === 'short-answer' && (
          <div className="options mt-4">
            <input
              type="text"
              value={currentQuestion.correctAnswer}
              onChange={handleCorrectAnswerChange}
              placeholder="Enter correct answer"
              className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-teal-600 focus:ring-offset-2"
            />
          </div>
        )}

        <div className="flex items-center mt-4">
          <label htmlFor="timeLimit" className="block text-gray-700 font-bold mb-2">
            Time Limit:
          </label>
          <input
            type="number"
            id="timeLimit"
            value={currentQuestion.timeLimit}
            onChange={handleTimeLimitChange}
            className="w-24 px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-teal-600 focus:ring-offset-2"
            placeholder="Time in minutes"
          />

          <label htmlFor="scheduledDate" className="block text-gray-700 font-bold mb-2 ml-4">
            Scheduled Date:
          </label>
          <input
            type="date"
            id="scheduledDate"
            value={currentQuestion.scheduledDate}
            onChange={handleScheduledDateChange}
            className="w-48 px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-teal-600 focus:ring-offset-2"
          />

          <label htmlFor="scheduledTime" className="block text-gray-700 font-bold mb-2 ml-4">
            Scheduled Time:
          </label>
          <input
            type="time"
            id="scheduledTime"
            value={currentQuestion.scheduledTime}
            onChange={handleScheduledTimeChange}
            className="w-36 px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-teal-600 focus:ring-offset-2"
          />
          <p className="text-gray-500 text-sm ml-4">Leave blank for no schedule</p>
        </div>

        <button
          onClick={addQuestion}
          className="bg-teal-600 text-white font-bold py-2 px-4 rounded-full shadow-md hover:bg-teal-700 focus:ring-2 focus:ring-teal-600 focus:ring-offset-2 mt-4"
        >
          Add Question
        </button>
      </section>

      <div className="questions-list mt-8">
        {questions.map((question, index) => (
          <div key={index} className="bg-gray-100 p-8 rounded-lg shadow-md mb-8">
            <h2>{question.questionText}</h2>
            {question.questionType === 'multiple-choice' && (
              <div>
                {question.multipleChoiceOptions.map((option, index) => (
                  <div key={index}>
                    <input type="radio" name={`correctAnswer_${index}`} id={`correctAnswer_${index}`} checked={option === question.correctAnswer} disabled />
                    <label htmlFor={`correctAnswer_${index}`}>{option}</label>
                  </div>
                ))}
              </div>
            )}
            {question.questionType === 'true-false' && (
              <div>
                <label>
                  <input type="radio" checked={question.correctAnswer === 'true'} disabled />
                  True
                </label>
                <label>
                  <input type="radio" checked={question.correctAnswer === 'false'} disabled />
                  False
                </label>
              </div>
            )}
            {question.questionType === 'short-answer' && (
              <div>
                <p>Correct Answer: {question.correctAnswer}</p>
              </div>
            )}
          </div>
        ))}

<button
      onClick={submitQuestionToFirebase}
      className="bg-teal-600 text-white font-bold py-2 px-4 rounded-full shadow-md hover:bg-teal-700 focus:ring-2 focus:ring-teal-600 focus:ring-offset-2 mt-4"
    >
      Submit Question
    </button>
      </div>
    </main>
  );
};

export default SetQuestions;


