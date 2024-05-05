// LiveClassUI.jsx
import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Card from './Cardview';
import axios from 'axios';
import backgroundImage from '../../../assets/images/LiveclassUI.jpg';

function LiveClassView() {
   const [sessions, setSessions] = useState([]);
   const navigate = useNavigate();

   useEffect(() => {
      fetchSessions();
   }, []);

   const fetchSessions = async () => {
      try {
         const response = await axios.get(
            'http://localhost:5000/api/liveSessions'
         );
         if (response.status === 200) {
            setSessions(response.data);
         } else {
            console.error('Failed to fetch sessions');
         }
      } catch (error) {
         console.error('Error fetching sessions:', error);
      }
   };

   return (
      <div
         className="flex flex-col items-center"
         style={{
            backgroundImage: `url(${backgroundImage})`,
            backgroundSize: 'cover',
            backgroundPosition: 'center',
            opacity: '1'
         }}>
         <div className="font-semibold text-3xl my-10 text-center">
            Live Sessions
         </div>
         {/* Chat Section */}
         <div className="ml-auto">
            <button
               className="bg-[#0057FF] hover:bg-[#000D85] text-[#FFFFFF] font-bold py-2 px-12 rounded-full mx-10"
               onClick={() => navigate('/chat')}>
               Enter to the chat
            </button>
         </div>
         <div className="flex flex-wrap justify-center">
            {sessions.map((session, index) => (
               <div key={index} className="m-4">
                  <Card
                     title={session.sessionName}
                     content={session.description}
                     link={session.link}
                     id={session._id} // Assuming _id is the ID of each session
                  />
               </div>
            ))}
         </div>
      </div>
   );
}

export default LiveClassView;
