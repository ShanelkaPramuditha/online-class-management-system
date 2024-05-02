import { useState } from 'react';
import './AddReview.css';
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
         errors['topic'] = 'Please enter Topic';
      }

      if (!reviewData.Name) {
         formIsValid = false;
         errors['description'] = 'Please enter Description';
      }

      if (!reviewData.ClassName) {
         formIsValid = false;
         errors['course'] = 'Please enter Course';
      }

      if (!reviewData.Description) {
         formIsValid = false;
         errors['grade'] = 'Please enter Grade';
      }

      setErrors(errors);
      return formIsValid;
   };

   return (
      <div>
         <h2>Review Form</h2>
         <form onSubmit={handleSubmit} noValidate>
            <div>
               <label htmlFor="StudentID">StudentID:</label>
               <input
                  type="text"
                  id="StudentID"
                  name="StudentID"
                  onChange={handleChange}
                  value={reviewData.StudentID}
                  required
               />
               <div className="error">{errors['StudentID']}</div>
            </div>
            <div>
               <label htmlFor="Name">Name:</label>
               <textarea
                  id="Name"
                  name="Name"
                  onChange={handleChange}
                  value={reviewData.Name}
                  required
               />
               <div className="error">{errors['Name']}</div>
            </div>
            <div>
               <label htmlFor="ClassName">ClassName:</label>
               <input
                  type="text"
                  id="ClassName"
                  name="ClassName"
                  onChange={handleChange}
                  value={reviewData.ClassName}
                  required
               />
               <div className="error">{errors['ClassName']}</div>
            </div>
            <div>
               <label htmlFor="Description">Description:</label>
               <input
                  type="text"
                  id="Description"
                  name="Description"
                  onChange={handleChange}
                  value={reviewData.Description}
                  required
               />
               <div className="error">{errors['Description']}</div>
            </div>
            <button type="submit">Submit</button>
         </form>
      </div>
   );
};

export default AddReview;
