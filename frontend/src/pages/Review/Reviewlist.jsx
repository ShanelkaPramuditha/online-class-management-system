import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Swal from 'sweetalert2';
import axios from 'axios';
import jsPDF from 'jspdf';
import 'jspdf-autotable';

const Reviewlist = () => {
   const [reviews, setReviews] = useState([]);
   const [searchOption, setSearchOption] = useState('StudentID');
   const [searchQuery, setSearchQuery] = useState('');
   const navigate = useNavigate();

   useEffect(() => {
      UpdateData();
   }, []);

   async function UpdateData() {
      await axios
         .get('http://localhost:5000/api/review/get')
         .then(res => {
            setReviews(res.data);
         })
         .catch(() => {
            console.log('Error while getting data');
         });
   }

   async function AddReview() {
      navigate('/review/add');
   }

   const FilteredReviewdList = reviews.filter(review => {
      switch (searchOption) {
         case 'StudentID':
            return review.StudentID.toLowerCase().includes(
               searchQuery.toLowerCase()
            );
         case 'Name':
            return review.Name
               ? review.Name.toLowerCase().includes(searchQuery.toLowerCase())
               : '';
         case 'ClassName':
            return review.ClassName.toLowerCase().includes(
               searchQuery.toLowerCase()
            );
         case 'Description':
            return review.Description.toLowerCase().includes(
               searchQuery.toLowerCase()
            );
         default:
            return true;
      }
   });

   // Report handler
   async function RepGen() {
      const doc = new jsPDF();

      // Calculate total count
      const totalReviews = FilteredReviewdList.reduce(count => {
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
         head: [['StudentID', 'Course', 'ClassName', 'Description']],
         body: FilteredReviewdList.map(review => [
            review.StudentID,
            review.Name,
            review.ClassName,
            review.Description
         ])
      });

      let currentY = doc.autoTable.previous.finalY + 10;

      // Total Students
      doc.text(`Total Reviews: ${totalReviews}`, 14, currentY + 10);

      // Save the PDF
      doc.save('Admin-UserReport.pdf');
   }

   async function handleDelete(_id) {
      const url = 'http://localhost:5000/api/review/delete/' + _id;

      const payload = {
         _id
      };

      const review = await axios.get(
         'http://localhost:5000/api/review/get/' + _id
      );
      console.log(review.data);

      Swal.fire({
         title: `Are you sure to delete ${review.data.StudentID}`,
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
                     `The ${review.data.StudentID} has been deleted.`,
                     'success'
                  );
               })
               .catch(error => {
                  console.error('Error deleting payment:', error);
                  Swal.fire(
                     'Error!',
                     `Failed to delete the ${review.data.StudentID}`,
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
      <div className="show reviewList">
         {/* Add User And Report Generation Button */}
         <div className="flex justify-end mb-5">
            <button
               onClick={AddReview}
               className="bg-[#1a1947] hover:bg-[#000D85] text-[white] font-bold  mr-4 py-2 px-6 rounded-full">
               Add Review
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
               <option value="StudentID">By StudentID</option>
               <option value="Name">By Name</option>
               <option value="ClassName">By ClassName</option>
               <option value="Description">By Description</option>
            </select>

            <div className="mb-5 flex justify-start">
               {(() => {
                  switch (searchOption) {
                     case 'StudentID':
                     case 'Name':
                     case 'ClassName':
                     case 'Description':
                        return (
                           <input
                              type="text"
                              value={searchQuery}
                              onChange={e => setSearchQuery(e.target.value)}
                              placeholder={`Search by ${
                                 searchOption === 'StudentID'
                                    ? 'Search By StudentID'
                                    : searchOption === 'Name'
                                    ? 'Search By Name'
                                    : searchOption === 'ClassName'
                                    ? 'Search By ClassName'
                                    : searchOption === 'Description'
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
            <h1 className="text-2xl font-bold mb-4">All the Student Reviews</h1>
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
               {FilteredReviewdList.map(review => (
                  <div
                     key={review._id}
                     className="bg-[white] hover:bg-[#e3e6e3] transition duration-300 ease-in-out shadow-md rounded-md p-6">
                     <h2 className="text-xl font-bold mb-2">
                        {review.StudentID}
                     </h2>
                     <img src="https://th.bing.com/th/id/OIP.PdK-XW9X8xTJ7O6E-iwi6QHaHa?w=733&h=733&rs=1&pid=ImgDetMain"></img>
                     <p className="text-gray-700 mb-4">
                        Description: {review.Description}
                     </p>
                     <p className="text-gray-700 mb-4">Name: {review.Name}</p>
                     <p className="text-gray-700 mb-4">
                        ClassName: {review.ClassName}
                     </p>

                     <button
                        onClick={() => navigate(`/review/update/${review._id}`)}
                        className="bg-[#d6d6d6] hover:bg-[Black] hover:text-[white] text-[black] m-2 font-bold py-2 px-4 rounded transition duration-300 ease-in-out transform hover:scale-105">
                        Update
                     </button>
                     <button
                        onClick={() => handleDelete(review._id)}
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

export default Reviewlist;
