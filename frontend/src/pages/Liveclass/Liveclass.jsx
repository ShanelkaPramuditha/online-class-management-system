import React, { useState } from 'react';
import { Link } from 'react-router-dom';

function LiveClass() {
   const [sessionname, setSessionName] = useState('');
   const [sessiontime, setSessionTime] = useState('');
   const [description, setDescription] = useState('');
   const [link, setLink] = useState('');
   const [error, setError] = useState('');

   const handleSessionName = e => {
      setSessionName(e.target.value);
      setError('');
   };

   const handleSessionTime = e => {
      setSessionTime(e.target.value);
      setError('');
   };

   const handleDescription = e => {
      setDescription(e.target.value);
      setError('');
   };

   const handleLink = e => {
      setLink(e.target.value);
      setError('');
   };

   const handleSubmit = e => {
      e.preventDefault();
      if (!sessionname.trim() || !sessiontime.trim() || !link.trim()) {
         setError('Topic, Time Duration and Class Link are required.');
         return;
      }
      // Proceed with form submission
      console.log('Form submitted:', {
         sessionname,
         sessiontime,
         description,
         link
      });
   };

   return (
      <div className="flex items-center justify-center h-screen bg-white">
         {/* Left Section: Text "Create New Live Class Session" */}
         <div className="text-gray-600 p-6 mr-4 flex-grow max-w-xs">
            <h2 className="text-7xl font-bold">
               Create New <br />
               Live Class Session
            </h2>
         </div>

         {/* Right Section: Card with Input Fields */}
         <div className="flex-shrink-0 w-full max-w-md bg-gray-100 shadow-lg rounded-lg overflow-hidden">
            <div className="p-6">
               <form onSubmit={handleSubmit}>
                  <div className="mb-4">
                     <label
                        className="block text-gray-700 text-sm font-bold mb-2"
                        htmlFor="sessionname">
                        Topic
                     </label>
                     <input
                        className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                        id="sessionname"
                        type="text"
                        placeholder="Topic"
                        value={sessionname}
                        onChange={handleSessionName}
                     />
                  </div>
                  <div className="mb-4">
                     <label
                        className="block text-gray-700 text-sm font-bold mb-2"
                        htmlFor="sessiontime">
                        Time Duration
                     </label>
                     <input
                        className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                        id="sessiontime"
                        type="text"
                        placeholder="Topic"
                        value={sessiontime}
                        onChange={handleSessionTime}
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
                        onChange={handleDescription}
                     />
                  </div>
                  <div className="mb-4">
                     <label
                        className="block text-gray-700 text-sm font-bold mb-2"
                        htmlFor="link">
                        Link
                     </label>
                     <input
                        className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                        id="link"
                        type="text"
                        placeholder="Link"
                        value={link}
                        onChange={handleLink}
                     />
                  </div>
                  {error && (
                     <p className="text-red-500 text-sm mb-4">{error}</p>
                  )}
                  <div className="flex justify-end">
                     <Link
                        to="./CreateQue"
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

export default LiveClass;
