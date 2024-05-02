import React, { useState } from 'react';
import { createPaper } from '../../../api/examAPI';
import backgroundImage from '../../../assets/images/CreatePaperbg.jpg';
import { Link } from 'react-router-dom';
import axios from 'axios';

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

   const handleSubmit = async e => {
      e.preventDefault();

      // Validate title length
      if (title.trim().length < 5) {
         setError('Title must have at least 5 characters.');
         return;
      }

      // Validate title format using regular expression
      const titleFormat = /^[A-Za-z0-9\s]+$/;
      if (!title.match(titleFormat)) {
         setError('Title must only contain A-Z, a-z, and 0-9 characters.');
         return;
      }

      if (!title.trim() || !description.trim()) {
         setError('Title and Description are required.');
         return;
      }
      try {
         // Create a new paper
         const response = await createPaper({ title, description });

         const paperId = response.data.paper._id;
         // Redirect to create questions page with paperId
         window.location.href = `/questions/create/${paperId}`;
      } catch (error) {
         console.error('Failed to create paper:', error);
         setError('Failed to create paper. Please try again.');
      }
   };

   return (
      <div
         className="flex items-center justify-center h-screen bg-white min-h-[calc(100vh-170px)]"
         style={{
            backgroundImage: `url(${backgroundImage})`,
            backgroundSize: 'cover',
            backgroundPosition: 'center',
            opacity: '1'
         }}>
         {/*  */}
         <div className="text-gray-600 p-6 mr-4 flex-grow max-w-xs m-10">
            <h2 className="text-7xl font-bold">
               Create New <br />
               Paper
            </h2>
         </div>

         {/* Right Section: Card with Input Fields */}
         <div className="flex-shrink-0 w-full max-w-md bg-[#e8e8e8] shadow-lg rounded-lg overflow-hidden">
            <div className="p-6">
               <form onSubmit={handleSubmit}>
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
                  {error && <p className="text-[red] text-sm mb-4">{error}</p>}
                  <div className="flex justify-end">
                     <button
                        type="submit"
                        className="bg-[#d6d6d6] hover:bg-[Black] hover:text-[white] text-[black] font-bold py-2 px-4 rounded transition duration-300 ease-in-out transform hover:scale-105">
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
