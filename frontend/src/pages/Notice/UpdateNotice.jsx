import { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import axios from 'axios';
import Swal from 'sweetalert2';

const UpdateNotice = () => {
   const navigate = useNavigate();
   const [noticeData, setNotices] = useState({
      topic: '',
      description: '',
      course: '',
      grade: ''
   });

   const { id } = useParams();

   useEffect(() => {
      axios
         .get('http://localhost:5000/api/notice/' + id)
         .then(response => setNotices(response.data));
   }, [id]);

   const handlechange = e => {
      const { name, value } = e.target;
      setNotices({
         ...noticeData,
         [name]: value
      });

      console.log(setNotices);
   };

   //http://localhost:3000/api/notices/6628dc68a614c39997ca777b

   const haddlesubmit = e => {
      e.preventDefault();

      Swal.fire({
         title: 'Update User Request',
         text: `Do You Want To Update the Notice ${noticeData.topic}`,
         icon: 'warning',
         showCancelButton: true,
         confirmButtonText: 'Yes',
         cancelButtonText: 'No'
      }).then(async result => {
         if (result.isConfirmed) {
            axios
               .put(`http://localhost:5000/api/notice/${id}`, noticeData)
               .then(() => {
                  setNotices({
                     noticeID: '',
                     topic: '',
                     description: '',
                     course: '',
                     grade: ''
                  });
                  Swal.fire('Notice update Successfuly!');
                  navigate('/notices/');
               });
         }
      });
   };

   return (
      <div>
         <h2>Update Notice Form</h2>
         <form action="#" method="POST" onSubmit={haddlesubmit}>
            <div>
               <label htmlFor="topic">Topic:</label>
               <input
                  type="text"
                  id="topic"
                  name="topic"
                  onChange={handlechange}
                  value={noticeData.topic}
                  required
               />
            </div>
            <div>
               <label htmlFor="description">Description:</label>
               <textarea
                  id="description"
                  name="description"
                  onChange={handlechange}
                  value={noticeData.description}
                  required
               />
            </div>
            <div>
               <label htmlFor="course">Course:</label>
               <input
                  type="text"
                  id="course"
                  name="course"
                  onChange={handlechange}
                  value={noticeData.course}
                  required
               />
            </div>
            <div>
               <label htmlFor="grade">Grade:</label>
               <input
                  type="text"
                  id="grade"
                  name="grade"
                  onChange={handlechange}
                  value={noticeData.grade}
                  required
               />
            </div>
            <button type="submit">Up date</button>
         </form>
      </div>
   );
};

export default UpdateNotice;
