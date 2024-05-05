// LiveClassUI.jsx
import { useState, useEffect } from 'react';
import Swal from 'sweetalert2';
import Card from './Card';
import axios from 'axios';
import jsPDF from 'jspdf';
import 'jspdf-autotable';
import backgroundImage from '../../../assets/images/LiveclassUI.jpg';

function LiveClassUI() {
   const [sessions, setSessions] = useState([]);

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

   const handleEdit = id => {
      // Navigate to edit page with session ID
      window.location.href = `/liveclassedit/${id}`;
   };

   const handleDelete = async id => {
      try {
         const confirm = await Swal.fire({
            title: 'Are you sure?',
            text: 'You will not be able to recover this team!',
            icon: 'warning',
            showCancelButton: true,
            confirmButtonText: 'Yes, delete it!',
            cancelButtonText: 'No, keep it'
         });

         if (confirm.isConfirmed) {
            // Send delete request to backend
            const response = await axios.delete(
               `http://localhost:5000/api/liveSessions/delete/${id}`,
               {
                  data: { id }
               }
            );
            if (response.status === 200) {
               Swal.fire(
                  'Deleted!',
                  'Your session has been deleted.',
                  'success'
               );
               // Refresh session
               fetchSessions();
            }
         }
      } catch (error) {
         console.error('Error deleting team: ', error);
      }
   };

   const handleCreateSession = () => {
      window.location.href = '/liveclassform';
   };

   const generateReport = () => {
      const doc = new jsPDF();

      // Add header
      const headerTitle = 'Live Sessions Report';
      const headerTitleX = doc.internal.pageSize.width / 2;
      doc.setFontSize(12);
      doc.text(headerTitle, headerTitleX, 10, { align: 'center' });

      // Table header
      doc.autoTable({
         head: [['Session Name', 'Description', 'Link']],
         body: sessions.map(session => [
            session.sessionName,
            session.description,
            session.link
         ])
      });

      // Save the PDF
      doc.save('live-sessions-report.pdf');
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
         <button
            className="btn fixed bottom-10 right-10 bg-[blue] hover:bg-[#00008B] text-[white] font-bold py-2 px-4 rounded"
            onClick={handleCreateSession}>
            Create a New Session
         </button>
         <button
            className="btn fixed bottom-10 right-60 bg-[green] hover:bg-[#008000] text-[white] font-bold py-2 px-4 rounded"
            onClick={generateReport}>
            Generate Report
         </button>
         <div className="flex flex-wrap justify-center">
            {sessions.map((session, index) => (
               <div key={index} className="m-4">
                  <Card
                     title={session.sessionName}
                     content={session.description}
                     link={session.link}
                     id={session._id} // Assuming _id is the ID of each session
                     onEdit={handleEdit}
                     onDelete={handleDelete}
                  />
               </div>
            ))}
         </div>
      </div>
   );
}

export default LiveClassUI;
