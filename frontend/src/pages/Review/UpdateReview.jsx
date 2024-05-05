import { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import axios from 'axios';
import Swal from 'sweetalert2';

const UpdateReview = () => {
   const { id } = useParams();
   const navigate = useNavigate();
   const [reviewData, setReviews] = useState({
      StudentID: '',
      Name: '',
      ClassName: '',
      Description: ''
   });

   useEffect(() => {
      axios
         .get('http://localhost:5000/api/review/get/' + id)
         .then(response => setReviews(response.data));
   }, [id]);

   const handlechange = e => {
      const { name, value } = e.target;
      setReviews({
         ...reviewData,
         [name]: value
      });

      console.log(setReviews);
   };

   const haddlesubmit = e => {
      e.preventDefault();

      Swal.fire({
         title: 'Update User Request',
         text: `Do You Want To Update the Review ${reviewData.topic}`,
         icon: 'warning',
         showCancelButton: true,
         confirmButtonText: 'Yes',
         cancelButtonText: 'No'
      }).then(async result => {
         if (result.isConfirmed) {
            axios
               .put(`http://localhost:5000/api/review/edit/${id}`, reviewData)
               .then(() => {
                  setReviews({
                     StudentID: '',
                     Name: '',
                     ClassName: '',
                     Description: ''
                  });
                  Swal.fire('Review update Successfuly!');
                  navigate('/reviews/');
               });
         }
      });
   };

   return (
      <div>
         <h2 className="text-center font-bold text-2xl ">Update Review Form</h2>
         <form action="#" method="POST" onSubmit={haddlesubmit} className="max-w-md mx-auto p-8 border border-gray-300 rounded">
            <div>
               <label htmlFor="StudentID" className="block font-bold mb-1">StudentID:</label>
               <input
                  type="text"
                  id="StudentID"
                  name="StudentID"
                  onChange={handlechange}
                  value={reviewData.StudentID}
                  required
                  className="w-full px-4 py-2 mb-10 border border-gray-300 rounded"
               />
            </div>
            <div>
               <label htmlFor="Name" className="block font-bold mb-1">Name:</label>
               <textarea
                  type="text"
                  id="Name"
                  name="Name"
                  onChange={handlechange}
                  value={reviewData.Name}
                  required
                  className="w-full px-4 py-2 mb-10 border border-gray-300 rounded"
               />
            </div>
            <div>
               <label htmlFor="ClassName" className="block font-bold mb-1">ClassName:</label>
               <input
                  type="text"
                  id="ClassName"
                  name="ClassName"
                  onChange={handlechange}
                  value={reviewData.ClassName}
                  required
                  className="w-full px-4 py-2 mb-10 border border-gray-300 rounded"
               />
            </div>
            <div>
               <label htmlFor="Description" className="block font-bold mb-1">Description:</label>
               <input
                  type="text"
                  id="Description"
                  name="Description"
                  onChange={handlechange}
                  value={reviewData.Description}
                  required
                  className="w-full px-4 py-2 mb-10 border border-gray-300 rounded"
               />
            </div>

            <button type="submit"className="bg-[blue] hover:bg-[blue] text-white px-4 py-2 rounded cursor-pointer">Up date</button>
         </form>
      </div>
   );
};

export default UpdateReview;
