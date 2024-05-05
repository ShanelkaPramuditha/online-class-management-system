import { useState } from 'react';
import axios from 'axios';
import swal from 'sweetalert2';
import { useNavigate } from 'react-router-dom';

const AddReview = () => {
   const navigate = useNavigate();

   const [reviewData, setReviews] = useState({
      StudentID: '',
      Name: '',
      ClassName: '',
      Description: ''
   });

   const [errors, setErrors] = useState({});

   const handleChange = e => {
      const { name, value } = e.target;
      setReviews({
         ...reviewData,
         [name]: value
      });
   };

   const handleSubmit = async e => {
      e.preventDefault();
      if (validateForm()) {
         console.log(reviewData);
         await axios
            .post('http://localhost:5000/api/review/add', reviewData)
            .then(() => {
               swal.fire('Review added successfully!');
               navigate('/review/');
            })
            .catch(error => {
               console.error('Error adding review:', error);
               swal.fire(
                  'Oops!',
                  'Something went wrong. Please try again later.',
                  'error'
               );
            });
      }
   };

   const validateForm = () => {
      let errors = {};
      let formIsValid = true;

      if (!reviewData.StudentID) {
         formIsValid = false;
         errors['StudentID'] = 'Please enter Student ID';
      }

      if (!reviewData.Name) {
         formIsValid = false;
         errors['Name'] = 'Please enter Name';
      }

      if (!reviewData.ClassName) {
         formIsValid = false;
         errors['ClassName'] = 'Please enter Class Name';
      }

      if (!reviewData.Description) {
         formIsValid = false;
         errors['Description'] = 'Please enter Description';
      }

      setErrors(errors);
      return formIsValid;
   };

   return (
      <div>
         <h2 className="text-center font-bold text-2xl ">Review Form</h2>
         <form onSubmit={handleSubmit} className="max-w-md mx-auto p-8 border border-gray-300 rounded">
            <div className="mb-4">
               <label htmlFor="StudentID" className="block font-bold mb-1">Student ID:</label>
               <input
                  type="text"
                  id="StudentID"
                  name="StudentID"
                  onChange={handleChange}
                  value={reviewData.StudentID}
                  required
                  className="w-full px-4 py-2 mb-10 border border-gray-300 rounded"
               />
               <div className="error">{errors['StudentID']}</div>
            </div>
            <div className="mb-4">
               <label htmlFor="Name" className="block font-bold mb-1">Name:</label>
               <input
                  type="text"
                  id="Name"
                  name="Name"
                  onChange={handleChange}
                  value={reviewData.Name}
                  required
                  className="w-full px-4 py-2 mb-10 border border-gray-300 rounded"
               />
               <div className="error">{errors['Name']}</div>
            </div>
            <div className="mb-4">
               <label htmlFor="ClassName" className="block font-bold mb-1">Class Name:</label>
               <input
                  type="text"
                  id="ClassName"
                  name="ClassName"
                  onChange={handleChange}
                  value={reviewData.ClassName}
                  required
                  className="w-full px-4 py-2 mb-10 border border-gray-300 rounded"
               />
               <div className="error">{errors['ClassName']}</div>
            </div>
            <div className="mb-4">
               <label htmlFor="Description" className="block font-bold mb-1">Description:</label>
               <textarea
                  id="Description"
                  name="Description"
                  onChange={handleChange}
                  value={reviewData.Description}
                  required
                  className="w-full px-4 py-2 mb-10 border border-gray-300 rounded"
               />
               <div className="error">{errors['Description']}</div>
            </div>
            <button type="submit" className="bg-[blue] hover:bg-[blue] text-white px-4 py-2 rounded cursor-pointer">Submit</button>
         </form>
      </div>
   );
};

export default AddReview;
