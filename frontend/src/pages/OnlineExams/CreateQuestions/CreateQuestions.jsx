import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useParams, Link } from 'react-router-dom';
import { FaTrashAlt } from 'react-icons/fa';
import { FaEdit } from 'react-icons/fa';
import backgroundImage from '../../../assets/images/editPapersBg.jpg';
import Swal from 'sweetalert2';

function CreateQuestions() {
   const [question, setQuestion] = useState('');
   const [answer, setAnswer] = useState('');
   const [createdQuestions, setCreatedQuestions] = useState([]);
   const [error, setError] = useState('');
   const [isEditing, setIsEditing] = useState(false);
   const [editedQuestion, setEditedQuestion] = useState('');
   const [editedAnswer, setEditedAnswer] = useState('');
   const [editIndex, setEditIndex] = useState(null);
   const { paperId } = useParams(); // Extract paperId from URL params

   useEffect(() => {
      const fetchQuestions = async () => {
         try {
            const response = await axios.get(`/api/quiz/${paperId}`); // 0/api/quiz/
            setCreatedQuestions(response.data);
            console.log(createdQuestions);
            console.log(createdQuestions.length);
         } catch (error) {
            setError('Failed to fetch questions. Please try again.');
         }
      };

      fetchQuestions();
   }, [createdQuestions.length]);

   const handleQuestionChange = e => {
      setQuestion(e.target.value);
   };

   const handleAnswerChange = e => {
      setAnswer(e.target.value);
   };

   const handleSaveQuestion = async () => {
      try {
         if (editIndex !== null) {
            await handleSaveEditedQuestion();
         } else {
            const response = await axios.post(
               `/api/question/create/${paperId}`,
               {
                  question,
                  correctAnswer: answer,
                  paperId // Pass paperId to the backend
               }
            );
            setCreatedQuestions([...createdQuestions, response.data]);
            setQuestion('');
            setAnswer('');

            Swal.fire({
               icon: 'success',
               title: 'Question saved successfully',
               showConfirmButton: false,
               timer: 1500,
               timerProgressBar: true
            });
         }
      } catch (error) {
         setError('Failed to save the question. Please try again.');
      }
   };

   // const handleDeleteQuestion = async id => {
   //    try {
   //       await axios.delete(`/api/quiz/${id}`);
   //       setCreatedQuestions(createdQuestions.filter(q => q._id !== id));
   //    } catch (error) {
   //       setError('Failed to delete the question. Please try again.');
   //    }
   // };

   // const handleEditQuestion = (question, answer, index) => {
   //    setEditedQuestion(question);
   //    setEditedAnswer(answer);
   //    setIsEditing(true);
   //    setEditIndex(index);
   // };
   const handleDeleteQuestion = async index => {
      try {
         await axios.delete(`/api/quiz/${createdQuestions[index]._id}`);
         const updatedQuestions = [...createdQuestions];
         updatedQuestions.splice(index, 1);
         setCreatedQuestions(updatedQuestions);
      } catch (error) {
         setError('Failed to delete the question. Please try again.');
      }
   };

   const handleEditQuestion = (question, answer, index) => {
      // setEditedQuestion(question);
      // setEditedAnswer(answer);
      // setIsEditing(true);
      setEditIndex(index);
   };

   // Set values
   useEffect(() => {
      if (editIndex !== null) {
         setEditedQuestion(createdQuestions[editIndex].question);
         setEditedAnswer(createdQuestions[editIndex].correctAnswer);
      }
   }, [editIndex]);

   const handleSaveEditedQuestion = async () => {
      try {
         await axios.put(`/api/question/${createdQuestions[editIndex]._id}`, {
            question: editedQuestion,
            correctAnswer: editedAnswer
         });
         const updatedQuestions = [...createdQuestions];
         updatedQuestions[editIndex].question = editedQuestion;
         updatedQuestions[editIndex].answer = editedAnswer;
         setCreatedQuestions(updatedQuestions);
         setIsEditing(false);
         setEditIndex(null);
      } catch (error) {
         setError('Failed to update the question. Please try again.');
      }
   };

   return (
      <div
         className=" min-h-[calc(100vh-170px)] flex justify-center"
         style={{
            backgroundImage: `url(${backgroundImage})`,
            backgroundSize: 'cover',
            backgroundPosition: 'center',
            opacity: '1'
         }}>
         <div className="max-w-xl w-full bg-[white] shadow-lg rounded-lg overflow-hidden p-4 m-4">
            <div>
               {createdQuestions.length > 0 && (
                  <p className="text-[black] text-sm mb-4">
                     {/* Right Section: Preview of Created Questions */}
                     <div className="w-full bg-white shadow-lg rounded-lg overflow-hidden p-4">
                        <h2 className="text-xl font-bold mb-4">
                           Preview Questions
                        </h2>
                        <div>
                           {createdQuestions.map((q, index) => (
                              <div
                                 key={index}
                                 className="mb-4 border p-4 rounded-lg">
                                 <h3 className="text-lg font-bold mb-2">
                                    Question:
                                 </h3>
                                 <p>{q.question}</p>
                                 <h3 className="text-lg font-bold mt-4 mb-2">
                                    Answer:
                                 </h3>
                                 <p>{q.correctAnswer}</p>
                                 <div className="flex justify-end">
                                    <button
                                       className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded-full"
                                       onClick={() =>
                                          handleDeleteQuestion(index)
                                       }>
                                       <div>
                                          <FaTrashAlt className="hover:text-[red] transition duration-300 ease-in-out hover:scale-110 ml-4" />
                                       </div>
                                    </button>
                                    <button
                                       className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-full ml-2"
                                       onClick={() =>
                                          handleEditQuestion(
                                             q.question,
                                             q.correctAnswer,
                                             index
                                          )
                                       }>
                                       <div>
                                          <FaEdit className="hover:text-[#06a800] transition duration-300 ease-in-out hover:scale-110 ml-4" />
                                       </div>
                                    </button>
                                 </div>
                              </div>
                           ))}
                        </div>
                     </div>
                  </p>
               )}
            </div>
            <h2 className="text-xl font-bold mb-4">Create Question</h2>
            <div className="mb-4">
               <label className="block text-gray-700 text-sm font-bold mb-2">
                  Question
               </label>
               <textarea
                  className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                  rows="4"
                  defaultValue={editedQuestion}
                  onChange={handleQuestionChange}
                  placeholder="Enter your question here"
               />
            </div>
            <div className="mb-4">
               <label className="block text-gray-700 text-sm font-bold mb-2">
                  Answer
               </label>
               <input
                  type="text"
                  defaultValue={editedAnswer}
                  onChange={handleAnswerChange}
                  placeholder="Enter the correct answer"
                  className="w-full border rounded py-2 px-3"
               />
            </div>
            {error && <p className="text-red-500 text-sm mb-4">{error}</p>}
            <button
               className="bg-[#d6d6d6] hover:bg-[Black] hover:text-[white] text-[black] font-bold py-2 px-4 rounded transition duration-300 ease-in-out transform hover:scale-105"
               onClick={handleSaveQuestion}>
               {isEditing ? 'Save Edited Question' : 'Save Question'}
            </button>
         </div>

         {/* Button to navigate to papers page */}
         <div>
            <button className="bg-[#0eb009] hover:bg-[#0d5c0a] text-[white] font-bold py-2 px-4 rounded transition duration-300 ease-in-out transform hover:scale-105 m-6 mt-10">
               <Link to="../exam">Finish and Go to Papers Page</Link>
            </button>
         </div>
      </div>
   );
}

export default CreateQuestions;
