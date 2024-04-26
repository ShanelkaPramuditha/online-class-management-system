import { useState, useEffect } from 'react';
import axios from 'axios';
import { useParams, Link } from 'react-router-dom';
import { FaTrashAlt, FaEdit } from 'react-icons/fa';
import backgroundImage from '../../../assets/images/editPapersBg.jpg';
import Swal from 'sweetalert2';

function EditPaper() {
   const [title, setTitle] = useState('');
   const [description, setDescription] = useState('');
   const [questions, setQuestions] = useState([]);
   const [newQuestion, setNewQuestion] = useState('');
   const [newAnswer, setNewAnswer] = useState('');
   const [editIndex, setEditIndex] = useState(null); // Track the index of the question being edited
   const [error, setError] = useState('');

   const { paperId } = useParams(); // Extract paperId from URL params

   useEffect(() => {
      const fetchPaper = async () => {
         try {
            const response = await axios.get(`/api/paper/${paperId}`);
            setTitle(response.data.title);
            setDescription(response.data.description);
         } catch (error) {
            setError('Failed to fetch paper details. Please try again.');
         }
      };

      const fetchQuestions = async () => {
         try {
            const response = await axios.get(`/api/quiz/${paperId}`);
            setQuestions(response.data);
         } catch (error) {
            setError('Failed to fetch questions. Please try again.');
         }
      };

      fetchPaper();
      fetchQuestions();
   }, [paperId]);

   const handleTitleChange = e => {
      setTitle(e.target.value);
   };

   const handleDescriptionChange = e => {
      setDescription(e.target.value);
   };

   const handleSavePaper = async () => {
      try {
         await axios.patch(`/api/update/${paperId}`, {
            title,
            description
         });

         Swal.fire({
            icon: 'success',
            title: 'Paper details updated successfully',
            showConfirmButton: false,
            timer: 1500,
            timerProgressBar: true
         });
      } catch (error) {
         setError('Failed to update paper details. Please try again.');
      }
   };

   const handleDeleteQuestion = async index => {
      try {
         await axios.delete(`/api/quiz/${questions[index]._id}`);
         const updatedQuestions = [...questions];
         updatedQuestions.splice(index, 1);
         setQuestions(updatedQuestions);
      } catch (error) {
         setError('Failed to delete the question. Please try again.');
      }
   };

   const handleEditQuestion = (question, answer, index) => {
      // Set the question and answer to the input areas
      setNewQuestion(question);
      setNewAnswer(answer);
      setEditIndex(index);
   };

   const handleNewQuestionChange = e => {
      setNewQuestion(e.target.value);
   };

   const handleNewAnswerChange = e => {
      setNewAnswer(e.target.value);
   };

   const handleSaveNewQuestion = async () => {
      try {
         if (editIndex !== null) {
            // If editIndex is set, update the existing question at that index
            const response = await axios.patch(
               `/api/quiz/${questions[editIndex]._id}`,
               {
                  question: newQuestion,
                  correctAnswer: newAnswer
               }
            );
            const updatedQuestions = [...questions];
            updatedQuestions[editIndex] = response.data;
            setQuestions(updatedQuestions);
            setNewQuestion('');
            setNewAnswer('');
            setEditIndex(null); // Reset editIndex after updating
         } else {
            // Otherwise, create a new question
            const response = await axios.post(
               `/api/question/create/${paperId}`,
               {
                  question: newQuestion,
                  correctAnswer: newAnswer
               }
            );
            setQuestions([...questions, response.data]);
            setNewQuestion('');
            setNewAnswer('');
         }

         Swal.fire({
            icon: 'success',
            title: 'Question saved successfully',
            showConfirmButton: false,
            timer: 1500,
            timerProgressBar: true
         });
         // Refresh session
         fetchSessions();
      } catch (error) {
         setError('Failed to save the question. Please try again.');
      }
   };

   return (
      <div
         className="min-h-[calc(100vh-170px)] flex justify-center"
         style={{
            backgroundImage: `url(${backgroundImage})`,
            backgroundSize: 'cover',
            backgroundPosition: 'center',
            opacity: '1'
         }}>
         <div className="max-w-6xl w-full bg-[white] shadow-lg rounded-lg overflow-hidden p-4 m-4">
            <div className="flex">
               <div className="w-1/2 pr-4">
                  <h2 className="text-xl font-bold mb-4">Edit Paper</h2>
                  <div className="mb-4">
                     <label className="block text-gray-700 text-sm font-bold mb-2">
                        Title
                     </label>
                     <input
                        type="text"
                        value={title}
                        onChange={handleTitleChange}
                        placeholder="Enter paper title"
                        className="w-full border rounded py-2 px-3"
                     />
                  </div>
                  <div className="mb-4">
                     <label className="block text-gray-700 text-sm font-bold mb-2">
                        Description
                     </label>
                     <textarea
                        className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                        rows="4"
                        value={description}
                        onChange={handleDescriptionChange}
                        placeholder="Enter paper description"
                     />
                  </div>
                  {error && (
                     <p className="text-red-500 text-sm mb-4">{error}</p>
                  )}
                  <button
                     className="bg-[gray] hover:bg-[Black] hover:text-[white] text-[black] font-bold py-2 px-4 rounded transition duration-300 ease-in-out transform hover:scale-105"
                     onClick={handleSavePaper}>
                     Save Paper
                  </button>
               </div>
               <div className="w-1/2 pl-4">
                  {questions.length > 0 && (
                     <div className="mb-4">
                        <h2 className="text-xl font-bold mb-4">Questions</h2>
                        {questions.map((q, index) => (
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
                                    onClick={() => handleDeleteQuestion(index)}>
                                    <FaTrashAlt />
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
                                    <FaEdit />
                                 </button>
                              </div>
                           </div>
                        ))}
                     </div>
                  )}
                  <div className="mb-4">
                     <h2 className="text-xl font-bold mb-4">
                        Add New Question
                     </h2>
                     <div className="mb-4">
                        <label className="block text-gray-700 text-sm font-bold mb-2">
                           Question
                        </label>
                        <textarea
                           className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                           rows="4"
                           value={newQuestion}
                           onChange={handleNewQuestionChange}
                           placeholder="Enter new question"
                        />
                     </div>
                     <div className="mb-4">
                        <label className="block text-gray-700 text-sm font-bold mb-2">
                           Answer
                        </label>
                        <input
                           type="text"
                           value={newAnswer}
                           onChange={handleNewAnswerChange}
                           placeholder="Enter the correct answer"
                           className="w-full border rounded py-2 px-3"
                        />
                     </div>
                     <button
                        className="bg-[gray] hover:bg-[Black] hover:text-[white] text-[black] font-bold py-2 px-4 rounded transition duration-300 ease-in-out transform hover:scale-105"
                        onClick={handleSaveNewQuestion}>
                        Save Question
                     </button>
                  </div>
               </div>
            </div>
         </div>
         {/* Button to navigate to papers page */}

         <div>
            <button className="bg-[#0eb009] hover:bg-[#0d5c0a] text-[white] font-bold py-2 px-4 rounded transition duration-300 ease-in-out transform hover:scale-105 mt-10">
               <Link to="/exam">Back to Papers</Link>
            </button>
         </div>
      </div>
   );
}

export default EditPaper;
