import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';

function Papers() {
   const [papers, setPapers] = useState([]);

   useEffect(() => {
      fetchPapers();
   }, []);

   const fetchPapers = async () => {
      try {
         const response = await axios.get('http://localhost:5000/api/paper');
         setPapers(response.data);
      } catch (error) {
         console.error('Failed to fetch papers:', error);
      }
   };

   const handleDelete = async id => {
      try {
         await axios.delete('http://localhost:5000/api/paper', {
            data: { id }
         });
         setPapers(prevPapers => prevPapers.filter(paper => paper.id !== id));
      } catch (error) {
         console.error('Failed to delete paper:', error);
      }
   };

   return (
      <div className="container mx-auto mt-8">
         <div className="flex justify-end mb-4">
            <Link
               to="/exam/create"
               className="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded-full">
               Create New Paper
            </Link>
         </div>
         <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
            {papers.map(paper => (
               <div
                  key={paper.id}
                  className="bg-white shadow-md rounded-md p-6">
                  <div className="text-xl font-bold mb-2">{paper.title}</div>
                  <div className="text-gray-700 mb-2">{paper.description}</div>
                  <div className="text-gray-500 mb-4">
                     Quiz Count: {paper.quizCount}
                  </div>
                  <div className="flex justify-end">
                     <Link
                        to={`/update/${paper.id}`}
                        className="text-blue-500 hover:text-blue-700 mr-2">
                        Edit
                     </Link>
                     <button
                        onClick={() => handleDelete(paper.id)}
                        className="text-red-500 hover:text-red-700">
                        Delete
                     </button>
                  </div>
               </div>
            ))}
         </div>
      </div>
   );
}

export default Papers;
