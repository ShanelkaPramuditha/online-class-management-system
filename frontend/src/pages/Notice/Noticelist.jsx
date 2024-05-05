import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Swal from 'sweetalert2';
import axios from 'axios';
import jsPDF from 'jspdf';
import 'jspdf-autotable';

const Noticelist = () => {
   const [notices, setNotices] = useState([]);
   const [searchOption, setSearchOption] = useState('');
   const [searchQuery, setSearchQuery] = useState('topic');
   const navigate = useNavigate();

   useEffect(() => {
      UpdateData();
   }, [notices]);

   async function UpdateData() {
      await axios
         .get('http://localhost:5000/api/notices')
         .then(res => {
            setNotices(res.data);
         })
         .catch(() => {
            console.log('Error while getting data');
         });
   }

   async function AddNotice() {
      navigate('/notices/add');
   }

   const FilteredNoticedList = notices.filter(notice => {
      switch (searchOption) {
         case 'topic':
            return notice.topic
               .toLowerCase()
               .includes(searchQuery.toLowerCase());
         case 'cource':
            return notice.cource
               ? notice.cource.toLowerCase().includes(searchQuery.toLowerCase())
               : '';
         case 'grade':
            return notice.grade
               .toLowerCase()
               .includes(searchQuery.toLowerCase());
         case 'description':
            return notice.description
               .toLowerCase()
               .includes(searchQuery.toLowerCase());
         default:
            return true;
      }
   });

   // Report handler
   async function RepGen() {
      const doc = new jsPDF();

      // Calculate total count
      const totalNotices = FilteredNoticedList.reduce(count => {
         count++;
         return count;
      }, 0);

      // Add header
      const headerTitle = 'Exported User List';
      const headerTitleX = doc.internal.pageSize.width / 2;
      doc.setFontSize(12);
      doc.text(headerTitle, headerTitleX, 10, { align: 'center' });

      // Table header
      doc.autoTable({
         head: [['Topic', 'Course', 'Grade', 'Description']],
         body: FilteredNoticedList.map(notice => [
            notice.topic,
            notice.course,
            notice.grade,
            notice.description
         ])
      });

      let currentY = doc.autoTable.previous.finalY + 10;

      // Total Students
      doc.text(`Total Notices: ${totalNotices}`, 14, currentY + 10);

      // Save the PDF
      doc.save('Admin-UserReport.pdf');
   }

   async function handleDelete(_id) {
      const url = 'http://localhost:5000/api/notice/' + _id;

      const payload = {
         _id
      };

      const notice = await axios.get('http://localhost:5000/api/notice/' + _id);
      console.log(notice.data);

      Swal.fire({
         title: `Are you sure to delete ${notice.data.topic}`,
         text: 'You will not be able to recover this again!',
         icon: 'warning',
         showCancelButton: true,
         confirmButtonText: 'Delete!',
         cancelButtonText: 'No Cancel'
      }).then(async result => {
         if (result.isConfirmed) {
            axios
               .delete(url, payload)
               .then(res => {
                  console.log(res);
                  Swal.fire(
                     'Deleted!',
                     `The ${notice.data.topic} has been deleted.`,
                     'success'
                  );
               })
               .catch(error => {
                  console.error('Error deleting payment:', error);
                  Swal.fire(
                     'Error!',
                     `Failed to delete the ${notice.data.topic}`,
                     'error'
                  );
               });

            window.location.reload;
         }
      });
      window.location.reload;
      await UpdateData();
   }

   return (
      <div className="show noticeList">
         {/* Add User And Report Generation Button */}
         <div className="flex justify-end mb-5">
            <button
               onClick={AddNotice}
               className="bg-[#1a1947] hover:bg-[#000D85] text-[white] font-bold  mr-4 py-2 px-6 rounded-full">
               Add Notice
            </button>
            <button
               onClick={RepGen}
               className="bg-[#1a1947] hover:bg-[#000D85] text-[white] font-bold  mr-4 py-2 px-6 rounded-full">
               Generate Report
            </button>
         </div>

         {/* Search Input */}
         <div className="mb-5 flex justify-start">
            <label className="p-2 text-lg">Filter</label>
            <select
               value={searchOption}
               onChange={e => setSearchOption(e.target.value)}
               className="border border-gray-300 rounded-md px-3 py-1 focus:outline-none focus:border-blue-500 mr-2">
               <option value="topic">By Topic</option>
               <option value="cource">By Cource</option>
               <option value="grade">By Grade</option>
               <option value="description">By Description</option>
            </select>

            <div className="mb-5 flex justify-start">
               {(() => {
                  switch (searchOption) {
                     case 'topic':
                     case 'cource':
                     case 'grade':
                     case 'description':
                        return (
                           <input
                              type="text"
                              value={searchQuery}
                              onChange={e => setSearchQuery(e.target.value)}
                              placeholder={`Search by ${
                                 searchOption === 'topic'
                                    ? 'Search By Topic'
                                    : searchOption === 'cource'
                                    ? 'Search By Cource'
                                    : searchOption === 'grade'
                                    ? 'Search By Grade'
                                    : searchOption === 'description'
                                    ? 'Search By Description'
                                    : null
                              }...`}
                              className="border border-gray-300 rounded-md px-3 py-1 focus:outline-none focus:border-blue-500"
                           />
                        );
                     default:
                        return null;
                  }
               })()}
            </div>
         </div>
         <div className="min-h-[calc(100vh-170px)] mx-auto mt-8 body-content">
            <h1 className="text-2xl font-bold mb-4">ALL Notices</h1>
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
               {FilteredNoticedList.map(notice => (
                  <div
                     key={notice._id}
                     className="bg-[white] hover:bg-[#e3e6e3] transition duration-300 ease-in-out shadow-md rounded-md p-6">
                     <h2 className="text-xl font-bold mb-2">{notice.topic}</h2>
                     <img src="https://st2.depositphotos.com/1186248/11327/i/950/depositphotos_113276844-stock-photo-important-notice-rubber-stamp.jpg"></img>
                     <p className="text-gray-700 mb-4">
                        Description: {notice.description}
                     </p>
                     <p className="text-gray-700 mb-4">
                        Cource: {notice.course}
                     </p>
                     <p className="text-gray-700 mb-4">Grade: {notice.grade}</p>

                     <button
                        onClick={() =>
                           navigate(`/notices/update/${notice._id}`)
                        }
                        className="bg-[#d6d6d6] hover:bg-[Black] hover:text-[white] text-[black] m-2 font-bold py-2 px-4 rounded transition duration-300 ease-in-out transform hover:scale-105">
                        Update
                     </button>
                     <button
                        onClick={() => handleDelete(notice._id)}
                        className="bg-[#d6d6d6] hover:bg-[Black] hover:text-[white] text-[black] m-2 font-bold py-2 px-4 rounded transition duration-300 ease-in-out transform hover:scale-105">
                        Delete
                     </button>
                  </div>
               ))}
            </div>
         </div>
      </div>
   );
};

export default Noticelist;
