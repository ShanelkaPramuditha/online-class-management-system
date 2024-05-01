import { useEffect, useState, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import QRCode from 'react-qr-code';
import axios from 'axios';

function Profile() {
   const [user, setUser] = useState({});
   const qrCodeRef = useRef(null);
   const navigate = useNavigate();

   async function GetUser() {
      const x = JSON.parse(localStorage.getItem('authStore'));

      await axios
         .get('http://localhost:5000/api/usermain/getbyemail/' + x.state.email)
         .then(res => setUser(res.data[0]));
   }

   useEffect(() => {
      GetUser();
   }, []);

   return (
      <>
         <div className="max-w-3xl mx-auto">
            <h2 className="text-2xl font-bold mb-4">User Information</h2>
            <div className="grid grid-cols-2 gap-4">
               <div>
                  <div ref={qrCodeRef}>
                     <QRCode value={JSON.stringify(user)} />
                  </div>
               </div>

               <div>
                  <p className="font-semibold">First Name:</p>
                  <p>{user.firstName}</p>
                  <p className="font-semibold">Last Name:</p>
                  <p>{user.lastName}</p>
                  <p className="font-semibold">Email:</p>
                  <p>{user.email}</p>
               </div>
               <div>
                  <p className="font-semibold">User Role:</p>
                  <p>{user.userRole}</p>
               </div>
               <div>
                  <p className="font-semibold">Gender:</p>
                  <p>{user.gender}</p>
               </div>
               <div>
                  <p className="font-semibold">Mobile Number:</p>
                  <p>{user.mobileNumber}</p>
               </div>
               <div>
                  <p className="font-semibold">Register Date:</p>
                  <p>{new Date(user.registerDate).toLocaleDateString()}</p>
               </div>
               <button
                  className="mt-4 bg-[#77c0c0] hover:bg-[#4276b3] text-white font-bold py-2 px-4 rounded"
                  onClick={() => navigate('/students/')}>
                  Back
               </button>
            </div>
         </div>
      </>
   );
}

export default Profile;
