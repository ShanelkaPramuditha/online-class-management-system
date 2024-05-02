import { useState } from 'react';
import './AddNotice.css';
import axios from 'axios';
import swal from 'sweetalert2';
import { useNavigate } from 'react-router-dom';

const AddNotice = () => {
   const navigate = useNavigate();

   const [noticeData, setNotices] = useState({
      topic: '',
      description: '',
      course: '',
      grade: ''
   });

   const [errors, setErrors] = useState({});

   const handleChange = e => {
      const { name, value } = e.target;
      setNotices({
         ...noticeData,
         [name]: value
      });
   };

   const handleSubmit = async e => {
      e.preventDefault();
      if (validateForm()) {
         console.log(noticeData);
         await axios
            .post('http://localhost:5000/api/notices', noticeData)
            .then(() => {
               swal.fire('Notice added successfully!');
               navigate('/notices/');
            })
            .catch(error => {
               console.error('Error adding notice:', error);
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

      if (!noticeData.topic) {
         formIsValid = false;
         errors['topic'] = 'Please enter Topic';
      }

      if (!noticeData.description) {
         formIsValid = false;
         errors['description'] = 'Please enter Description';
      }

      if (!noticeData.course) {
         formIsValid = false;
         errors['course'] = 'Please enter Course';
      }

      if (!noticeData.grade) {
         formIsValid = false;
         errors['grade'] = 'Please enter Grade';
      }

      setErrors(errors);
      return formIsValid;
   };

   return (
      <div>
         <h2>Notice Form</h2>
         <form onSubmit={handleSubmit} noValidate>
            <div>
               <label htmlFor="topic">Topic:</label>
               <input
                  type="text"
                  id="topic"
                  name="topic"
                  onChange={handleChange}
                  value={noticeData.topic}
                  required
               />
               <div className="error">{errors['topic']}</div>
            </div>
            <div>
               <label htmlFor="description">Description:</label>
               <textarea
                  id="description"
                  name="description"
                  onChange={handleChange}
                  value={noticeData.description}
                  required
               />
               <div className="error">{errors['description']}</div>
            </div>
            <div>
               <label htmlFor="course">Course:</label>
               <input
                  type="text"
                  id="course"
                  name="course"
                  onChange={handleChange}
                  value={noticeData.course}
                  required
               />
               <div className="error">{errors['course']}</div>
            </div>
            <div>
               <label htmlFor="grade">Grade:</label>
               <input
                  type="text"
                  id="grade"
                  name="grade"
                  onChange={handleChange}
                  value={noticeData.grade}
                  required
               />
               <div className="error">{errors['grade']}</div>
            </div>
            <button type="submit">Submit</button>
         </form>
      </div>
   );
};

export default AddNotice;
