import { useNavigate } from 'react-router-dom';
import toast, { Toaster } from 'react-hot-toast';

import { useAuthStore } from '../store/authStore';
import { generateOTP, verifyOTP } from '../api/helper';
import { useState, useEffect } from 'react';

export default function Recovery() {
   const navigate = useNavigate();
   const { username } = useAuthStore(state => state.auth);
   const [OTP, setOTP] = useState();

   useEffect(() => {
      generateOTP(username).then(OTP => {
         console.log(OTP);
         if (OTP) return toast.success('OTP Sent');
         return toast.error('Could not send OTP');
      });
   }, [username]);

   async function onSubmit(e) {
      e.preventDefault();
      try {
         let { status } = await verifyOTP({ username, code: OTP });
         if (status === 201) {
            toast.success('Verify Successfully!');
            return navigate('/reset');
         }
      } catch (error) {
         return toast.error('Wront OTP! Check email again!');
      }
   }

   // handler of resend OTP
   function resendOTP() {
      let sendPromise = generateOTP(username);

      toast.promise(sendPromise, {
         loading: 'Sending OTP...',
         success: 'OTP Sent',
         error: 'Could not send OTP'
      });

      sendPromise.then(OTP => {
         console.log(OTP);
      });
   }

   return (
      <div className="container mx-auto">
         <Toaster position="top-center" reverseOrder={false}></Toaster>

         <div className="flex h-screen">
            <div>
               <div className="title flex flex-col items-center">
                  <h4 className="text-5xl font-bold">Recovery</h4>
                  <span className="py-4 text-xl w-2/3 text-center text-gray-500">
                     Enter OTP to recover Password
                  </span>
               </div>

               <form className="py-1" onSubmit={onSubmit}>
                  <div className="textbox flex flex-col items-center gap-6">
                     <input
                        onChange={e => setOTP(e.target.value)}
                        type="text"
                        placeholder="OTP"
                     />
                     <button type="submit">Sign In</button>
                  </div>
               </form>
               <div className="text-center py-4">
                  <span className="text-gray-500">
                     Can&apos;t get OTP?{' '}
                     <button onClick={resendOTP} className="text-red-500">
                        Resend OTP
                     </button>
                  </span>
               </div>
            </div>
         </div>
      </div>
   );
}
