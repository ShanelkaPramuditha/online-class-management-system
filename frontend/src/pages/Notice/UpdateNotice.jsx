import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom';
import  axios from 'axios';

const UpdateNotice = () => {

  const[noticeData,setNotices]=useState({
    noticeID:"",
    topic:"",
    description:"",
    course:"",
    grade:""
  });

  const  { id }  = useParams();

  useEffect(()=>{
    axios.get("http://localhost:3000/api/notices/" + id).then((response)=>setNotices(response.data))
  },[])

  const handlechange = (e)=> {
    const { name, value } = e.target;
    setNotices({
        ...noticeData,
        [name]:value,
    });

    console.log(setNotices);
    
  }; 

  //http://localhost:3000/api/notices/6628dc68a614c39997ca777b
 
  const haddlesubmit =(e)=> {
    e.preventDefault();
    axios.put(`http://localhost:3000/api/notices/${id}`,noticeData).then(()=> {
        setNotices({
            noticeID:"",
            topic:"",
            description:"",
            course:"",
            grade:""
            
        })
        swal("Notice update Successfuly!");
       
    })

  };


  return (
    
      <div>
          <h2>Update Notice Form</h2>
          <form action="#" method="POST"onSubmit={haddlesubmit}>
              <div>
              <label for="noticeID">Notice ID:</label>
              <input type="text" id="noticeID" name="noticeID" onChange={handlechange} value={noticeData.noticeID} required/>
              </div>
              <div>
              <label for="topic">Topic:</label>
              <input type="text" id="topic" name="topic" onChange={handlechange} value={noticeData.topic} required/>
              </div>
              <div>
              <label for="description">Description:</label>
              <textarea id="description" name="description" onChange={handlechange} value={noticeData.description} required />
              </div>
              <div>
              <label for="course">Course:</label>
              <input type="text" id="course" name="course" onChange={handlechange}value={noticeData.course} required/>
              </div>
              <div>
              <label for="grade">Grade:</label>
              <input type="text" id="grade" name="grade"onChange={handlechange} value={noticeData.grade} required/>
              </div>
              <button type="submit">Up  date</button>
              
          </form>
      </div>
    )
  
}

export default UpdateNotice;
