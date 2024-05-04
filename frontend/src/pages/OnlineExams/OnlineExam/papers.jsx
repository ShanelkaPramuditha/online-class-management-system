import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { FaTrashAlt, FaEdit, FaFilePdf } from 'react-icons/fa';
import { IoMdAddCircle } from 'react-icons/io';
import backgroundImage from '../../../assets/images/papersGg.jpg';
import axios from 'axios';
import jsPDF from 'jspdf';
import 'jspdf-autotable';
import Swal from 'sweetalert2';

function Papers() {
   const [papers, setPapers] = useState([]);
   const [searchQuery, setSearchQuery] = useState('');
   const [searchOption, setSearchOption] = useState('');

   useEffect(() => {
      // Fetch papers from the backend when the component mounts
      const fetchPapers = async () => {
         try {
            const response = await axios.get('http://localhost:5000/api/paper');
            setPapers(response.data);
         } catch (error) {
            console.error('Error fetching papers:', error);
         }
      };

      fetchPapers();
   }, []); // Empty dependency array ensures the effect runs only once on mount

   const filteredPaperList = papers.filter(paper => {
      var searchDate = new Date(searchQuery);
      var userDate = new Date(paper.createdAt);
      switch (searchOption) {
         case 'topic':
            return paper.title
               .toLowerCase()
               .includes(searchQuery.toLowerCase());
         case 'date':
            return userDate < searchDate;
         default:
            return true;
      }
   });

   const handleDelete = async id => {
      try {
         const confirm = await Swal.fire({
            title: 'Are you sure?',
            text: 'You will not be able to recover this team!',
            icon: 'warning',
            showCancelButton: true,
            confirmButtonText: 'Yes, delete it!',
            cancelButtonText: 'No, keep it'
         });
         if (confirm.isConfirmed) {
            // Send delete request to backend
            const response = await axios.delete(
               'http://localhost:5000/api/paper',
               {
                  data: { id }
               }
            );
            // Remove the deleted paper from the local state
            setPapers(papers.filter(paper => paper._id !== id));
            if (response.status === 200) {
               Swal.fire('Deleted!', 'Your Paper has been deleted.', 'success');
            }
         }
      } catch (error) {
         console.error('Error deleting paper:', error);
      }
   };

   const generateReport = () => {
      const doc = new jsPDF();

      // Add header
      doc.text('Papers Report', 105, 10, { align: 'center' });

      // Table header
      const tableData = filteredPaperList.map(paper => [
         paper.title,
         paper.description,
         paper.quizCount,
         new Date(paper.createdAt).toLocaleDateString() // Display created date
      ]);
      doc.autoTable({
         head: [
            ['Title', 'Description', 'Number of Questions', 'Created Date']
         ],
         body: tableData
      });

      // Show total number of papers
      const totalPapers = filteredPaperList.length;
      doc.text(
         `Total Papers: ${totalPapers}`,
         14,
         doc.autoTable.previous.finalY + 10
      );

      // Save the PDF
      doc.save('papers-report.pdf');
   };

   return (
      <div
         className=" min-h-[calc(100vh-170px)] container mx-auto mt-8 p-10"
         // style={{ background: 'linear-gradient(to top, #f7fbff, #cfcfcf)' }}
         style={{
            backgroundImage: `url(${backgroundImage})`,
            backgroundSize: 'cover',
            backgroundPosition: 'center',
            opacity: '1'
         }}>
         <div className="flex justify-between mb-4">
            <div></div>
            {/* Search Input */}
            <div className="mb-5 flex justify-start">
               <label className="p-2 text-lg">Filter</label>
               <select
                  value={searchOption}
                  onChange={e => setSearchOption(e.target.value)}
                  className="border border-gray-300 rounded-md px-3 py-1 focus:outline-none focus:border-blue-500 mr-2">
                  <option value="topic">By Topic</option>
                  <option value="date">By Date Before</option>
               </select>

               <div className="mb-5 flex justify-start">
                  {(() => {
                     switch (searchOption) {
                        case 'topic':
                           return (
                              <input
                                 type="text"
                                 value={searchQuery}
                                 onChange={e => setSearchQuery(e.target.value)}
                                 placeholder={`Search by topic`}
                                 className="border border-gray-300 rounded-md px-3 py-1 focus:outline-none focus:border-blue-500"
                              />
                           );
                        case 'date':
                           return (
                              <input
                                 type="date"
                                 value={searchQuery}
                                 onChange={e => setSearchQuery(e.target.value)}
                                 className="border border-gray-300 rounded-md px-3 py-1 focus:outline-none focus:border-blue-500"
                              />
                           );
                        default:
                           return null;
                     }
                  })()}
               </div>
            </div>
            <div>
               <button
                  className="bg-[#dbdbdb] hover:bg-[black] text-[black] hover:text-[white] font-bold py-2 px-4 rounded transition duration-300 ease-in-out transform hover:scale-105 m-6"
                  onClick={generateReport}>
                  <div className="flex justify-between ">
                     <FaFilePdf className="mr-2 mt-1" /> Generate Report
                  </div>
               </button>
               <button className="bg-[#0eb009] hover:bg-[#0d5c0a] text-[white] font-bold py-2 px-4 rounded transition duration-300 ease-in-out transform hover:scale-105 m-6">
                  <Link to="/exam/create">
                     <div className="flex justify-between ">
                        <IoMdAddCircle className="mr-2 mt-1" /> Add Paper
                     </div>
                  </Link>
               </button>
            </div>
         </div>
         <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
            {filteredPaperList.map(paper => (
               <div
                  key={paper._id}
                  className="bg-[white] hover:bg-[#e3e6e3] transition duration-300 ease-in-out shadow-md rounded-md p-6">
                  <div className="text-xl font-bold mb-2">{paper.title}</div>
                  <div className="text-gray-700">{paper.description}</div>
                  <div className="text-gray-700 mt-2">
                     No of Questions: {paper.quizCount}
                  </div>

                  <div className="flex justify-end mt-4">
                     <Link
                        to={`/exam/update/${paper._id}`}
                        className="text-blue-500 hover:text-blue-700 mr-2">
                        <div>
                           <FaEdit className="hover:text-[#06a800] transition duration-300 ease-in-out hover:scale-110 ml-4" />
                        </div>
                     </Link>
                     <button
                        onClick={() => handleDelete(paper._id)}
                        className="text-red-500 hover:text-red-700">
                        <div>
                           <FaTrashAlt className="hover:text-[red] transition duration-300 ease-in-out hover:scale-110 ml-4" />
                        </div>
                     </button>
                  </div>
               </div>
            ))}
         </div>
      </div>
   );
}

export default Papers;
