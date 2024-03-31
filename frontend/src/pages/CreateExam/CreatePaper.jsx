import React, { useState } from 'react';
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
      if (!title.trim() || !description.trim()) {
         setError('Title and Description are required.');
         return;
      }

      // try {
      //   // Make a GET request to a specific URL
      //   const response = await axios.get('https://api.example.com/data');

      //   // Handle successful response
      //   console.log('Data:', response.data); // Log the data returned by the server
      //   console.log('Status:', response.status); // Log the HTTP status code
      //   console.log('Headers:', response.headers); // Log the response headers
      // } catch (error) {
      //   // Handle error
      //   console.error('Error:', error); // Log any errors that occur during the request

      //   if (error.response) {
      //     // Log the HTTP status code if available
      //     console.log('Status:', error.response.status);
      //     // Log the error response data if available
      //     console.log('Data:', error.response.data);
      //   }
      // }

      try {
         const { data, status } = await axios.post(
            'http://localhost:5000/api/paper/create',
            { title: 'No Name', description: 'Amo eka' }
         );

         console.log(data);
         console.log(status);
      } catch (e) {
         console.log('An error occured.');
      }
   };

   const sample = [1, 2, 4, 5];

   handleSubmit();

   return (
      <div className="flex items-center justify-center h-screen bg-white">
         {/* Left Section: Text "Create New Paper" */}
         <div className="text-gray-600 p-6 mr-4 flex-grow max-w-xs">
            <h2 className="text-7xl font-bold">
               Create New <br />
               Paper
            </h2>
         </div>

         {sample.map(number => (
            <p>{number}</p>
         ))}

         {/* Right Section: Card with Input Fields */}
         <div className="flex-shrink-0 w-full max-w-md bg-gray-100 shadow-lg rounded-lg overflow-hidden">
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
                  {error && (
                     <p className="text-red-500 text-sm mb-4">{error}</p>
                  )}
                  <div className="flex justify-end">
                     <Link
                        to="/CreateQues"
                        className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-full">
                        Next
                     </Link>
                  </div>
               </form>
            </div>
         </div>
      </div>
   );
}

export default CreatePapers;
