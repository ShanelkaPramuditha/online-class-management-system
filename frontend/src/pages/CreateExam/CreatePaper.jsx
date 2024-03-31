import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

function CreatePapers() {
   const [title, setTitle] = useState('');
   const [description, setDescription] = useState('');
   const [error, setError] = useState('');

   const handleTitleChange = e => {
      setTitle(e.target.value);
      setError('');
   };

   const handleDescriptionChange = e => {
      setDescription(e.target.value);
      setError('');
   };

   const handleSubmit = async () => {
      if (!title.trim() || !description.trim()) {
         setError('Title and Description are required.');
         return;
      }

      try {
         const { data, status } = await axios.post(
            'http://localhost:5000/api/paper/create',
            { title: title, description: description }
         );

         console.log(data);
         console.log(status);

         if (status === 200) {
            toast.success('Paper created successfully!');
            // Clear form fields after successful submission
            setTitle('');
            setDescription('');
         } else {
            toast.error('Failed to create paper. Please try again.');
         }
      } catch (e) {
         console.log('An error occurred.');
         toast.error('Failed to create paper. Please try again.');
      }
   };

   return (
      <div className="flex items-center justify-center h-screen bg-white">
         {/* Left Section: Text "Create New Paper" */}
         <div className="text-gray-600 p-6 mr-4 flex-grow max-w-xs">
            <h2 className="text-7xl font-bold">
               Create New <br />
               Paper
            </h2>
         </div>

         {/* Right Section: Card with Input Fields */}
         <div className="flex-shrink-0 w-full max-w-md bg-gray-100 shadow-lg rounded-lg overflow-hidden">
            <div className="p-6">
               <form>
                  <div className="mb-4">
                     <label
                        className="block text-gray-700 text-sm font-bold mb-2"
                        htmlFor="title">
                        Title
                     </label>
                     <input
                        className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                        id="title"
                        type="text"
                        placeholder="Title"
                        value={title}
                        onChange={handleTitleChange}
                     />
                  </div>
                  <div className="mb-6">
                     <label
                        className="block text-gray-700 text-sm font-bold mb-2"
                        htmlFor="description">
                        Description
                     </label>
                     <input
                        className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                        id="description"
                        type="text"
                        placeholder="Description"
                        value={description}
                        onChange={handleDescriptionChange}
                     />
                  </div>
                  {error && (
                     <p className="text-red-500 text-sm mb-4">{error}</p>
                  )}
                  <div className="flex justify-end">
                     <button
                        onClick={handleSubmit}
                        className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-full">
                        Next
                     </button>
                  </div>
               </form>
            </div>
         </div>
      </div>
   );
}

export default CreatePapers;
