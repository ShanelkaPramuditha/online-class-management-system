import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';

function ViewExams() {
   const [papers, setPapers] = useState([]);

   useEffect(() => {
      const fetchPapers = async () => {
         try {
            const response = await axios.get('/api/paper');
            setPapers(response.data);
         } catch (error) {
            console.error('Error fetching papers:', error);
         }
      };

      fetchPapers();
   }, []);

   return (
      <div className="min-h-[calc(100vh-170px)] mx-auto mt-8 body-content">
         <h1 className="text-2xl font-bold mb-4">Online Exams</h1>
         <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
            {papers.map(paper => (
               <div
                  key={paper._id}
                  className="bg-[white] hover:bg-[#e3e6e3] transition duration-300 ease-in-out shadow-md rounded-md p-6">
                  <h2 className="text-xl font-bold mb-2">{paper.title}</h2>
                  <p className="text-gray-700 mb-4">{paper.description}</p>
                  <Link
                     to={`/exam/paper/${paper._id}`}
                     className="bg-[#d6d6d6] hover:bg-[Black] hover:text-[white] text-[black] font-bold py-2 px-4 rounded transition duration-300 ease-in-out transform hover:scale-105">
                     View Paper
                  </Link>
               </div>
            ))}
         </div>
      </div>
   );
}

export default ViewExams;
