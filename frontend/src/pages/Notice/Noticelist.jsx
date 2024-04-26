import React,{useState,useEffect} from 'react';
import axios from "axios";
import NoticeCard from './NoticeCard';
import "./Noticelist.css";

const Noticelist = () => {

  const [notices , setNotices]=useState([]);

  useEffect(()=>{
    axios.get("http://localhost:3000/api/notices").then((res)=>{
      setNotices(res.data);
      console.log(res.data);

    }).catch(()=>{
      console.log("Error while getting data");
    });
  },[]);

  const Noticelist = notices.length===0 ? "No notices found" : notices.map((notice,index)=><NoticeCard key={index} notice={notice}/>);


  return (
    <div className ="show noticeList">
      {/* Search Input */}
      <div className="mb-5 flex justify-start">
            <input
               type="text"
               
               onChange={e => setSearchQuery(e.target.value)}
               placeholder="Search by student name..."
               className="border border-gray-300 rounded-md px-3 py-1 focus:outline-none focus:border-blue-500"
            />
         </div>
      <div className="container">
        <div className="list">{Noticelist}</div>
      </div>
      
     
    </div>
  );
};

export default Noticelist ;
