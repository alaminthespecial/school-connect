"use client";
import React from 'react'
import { useState } from 'react';
import { useRef } from 'react';
import { Modal, Form, Input, Button, Select, message } from 'antd';
import { RedoOutlined, DownloadOutlined ,EditOutlined,QuestionOutlined} from '@ant-design/icons';

import axios from 'axios';
import { Spin } from 'antd';
import { remark } from 'remark';
import remarkHtml from 'remark-html';

const SetQuestions = () => {

    const [questions, setQuestions] = useState([]);
    const [loading,setLoading]=useState(false);
    const [showAIForm, setShowAIForm] = useState(true);
    
    const [currentQuestion, setCurrentQuestion] = useState({
        questionType: '',
        questionText: '',
        multipleChoiceOptions: [],
        correctAnswer: '',
        timeLimit: '',
        scheduledDate: '',
        scheduledTime: '',
    });
    const InputRef = useRef(null);
    const [inputValueRef, setInputValueRef] = useState('');
    const [questionGenerator, setQuestionsGenerated] = useState('')



  const onAIButtonClick = () => {
    setShowAIForm(false);
  };
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

    //handle question generation
    // const handleSummarize = async () => {



    //     try {
    //         // Fetch or generate summary based on user input (URL or text)
    //         //   if (isPaste) {
    //         //     // Handle summarization from pasted text
    //         //     const textareaValue = textareaRef.current.value;
    //         //     const summary = await generateSummaryFromText(textareaValue); // Replace with your text summarization logic
    //         //     setUrl('Pasted Text'); // Set a placeholder URL
    //         //     setSummarization(summary);
    //         //   } else {
    //         // Handle summarization from URL
    //         const InputRefValue = InputRef.current.value;
    //         const response = await axios.post('api/summerizer', { url: InputRefValue });
    //         setInputValueRef(response.data.url);
    //         setQuestionsGenerated(response.data.summarization);

    //     } catch (error) {
    //         // Handle errors
    //         console.error(error);
    //         message.error(error.response?.data?.message || "Something went wrong here");
    //     } finally {
    //         console.log('question generated')
    //     }
    // };

    const onFinish = async (values) => {
       
        setLoading(true);
    
        try {
          // alert('am still here')
        
          const response = await axios.post('api/questionroutes', { syllabus: values.syllabus, questionType: values.questionType });
    
          console.log('this is the questions generated', typeof response.data.summarization);
          const processRemark= remark().use(remarkHtml).processSync(response.data.summarization).toString();
          console.log(response.data.summarization)
          // setQuestions(response.data.summarization);
          // console.log('this is response',response.data.summarization)
          setQuestionsGenerated(processRemark);
    
          // setSummarization(response.data.summarization);
        } catch (error) {
          console.log(error)
          message.error(error.response?.data?.message || " Something went wrong from this");
        } finally {
          setLoading(false)
        }
      };
    return (
        <main className="max-w-screen-xl mx-auto py-16 px-4">

            {/* create a button click to help user assist generate questions with AI model with svg for AI */}
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

                    <Form.Item label="Kind of question" name="questionType" rules={[{ required: true, message: 'Please select the kind of question you want' }]}>
                        <Select>
                            <Option value="multipleChoice">Multiple choice</Option>
                            <Option value="trueFalse">True/false</Option>
                            <Option value="openEnded">Open-ended</Option>
                            <Option value="problemSolving">Problem-solving</Option>
                        </Select>
                    </Form.Item>
                    <Form.Item label="Syllabus or Content" name="syllabus">
                        <Input.TextArea rows={8} placeholder="Enter the syllabus here..." />
                    </Form.Item>
                    <Form.Item>
                        <Button type="primary" htmlType="submit" style={{ color: 'white', background: 'black' }}>

                            create
                        </Button>
                    </Form.Item>


                </Form>
                {loading && <Spin tip="Generating questions..." />}
                {questionGenerator &&
                <div>
                    Your genereated Question of {}
                 <div


                 className='mt-2 mr-6 ml-6 mb-6'
                
                 style={{
                   textOverflow: 'ellipsis',
                   fontFamily: 'Times New Roman',
                   fontSize: '12pt',
                 }}
                 suppressContentEditableWarning={true}
                 dangerouslySetInnerHTML={{ __html: questionGenerator }} />
                   <span style={{width:'5',float:'right'}}>
              <Button>
              <RedoOutlined />
              </Button>
              <Button>
              <EditOutlined />
              </Button>
             
            </span>
                 </div>
           
               }

            </div>
      )}
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

                    <svg
                        xmlns="http://www.w3.org/2000/svg"
                        className="h-6 w-6"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                    >
                        <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M12 6v6m0 0v6m0-6h6m-6 0H6"
                        />
                    </svg>
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


