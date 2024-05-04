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
         <h2>Update Review Form</h2>
         <form action="#" method="POST" onSubmit={haddlesubmit}>
            <div>
               <label htmlFor="StudentID">StudentID:</label>
               <input
                  type="text"
                  id="StudentID"
                  name="StudentID"
                  onChange={handlechange}
                  value={reviewData.StudentID}
                  required
               />
            </div>
            <div>
               <label htmlFor="Name">Name:</label>
               <textarea
                  type="text"
                  id="Name"
                  name="Name"
                  onChange={handlechange}
                  value={reviewData.Name}
                  required
               />
            </div>
            <div>
               <label htmlFor="ClassName">ClassName:</label>
               <input
                  type="text"
                  id="ClassName"
                  name="ClassName"
                  onChange={handlechange}
                  value={reviewData.ClassName}
                  required
               />
            </div>
            <div>
               <label htmlFor="Description">Description:</label>
               <input
                  type="text"
                  id="Description"
                  name="Description"
                  onChange={handlechange}
                  value={reviewData.Description}
                  required
               />
            </div>
            <button type="submit">Up date</button>
         </form>
      </div>
   );
};

export default UpdateReview;
