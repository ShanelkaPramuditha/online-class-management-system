import { useState, useEffect } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';
import requestAuth from '../../../api/requestAuth';

const PaymentDetails = () => {
   const [payment, setPayment] = useState(null);
   const { id } = useParams();

   // Fetch payment details for the specified user ID
   useEffect(() => {
      const fetchPaymentDetails = async () => {
         try {
            const response = await axios.get(`/api/payment/${id}`, requestAuth);
            setPayment(response.data.payment);
         } catch (error) {
            console.error('Error fetching payment details:', error);
         }
      };

      fetchPaymentDetails();
   }, [id]);

   if (!payment) {
      return <div className="container mx-auto px-4">Wrong Payment ID...</div>;
   }

   // Format date and time for user-friendly view
   const formatDate = dateString => {
      const date = new Date(dateString);
      return date.toLocaleDateString();
   };

   const formatTime = timeString => {
      const time = new Date(timeString);
      return time.toLocaleTimeString();
   };

   // Format Course name
   const formatCourseName = name => {
      // Split the name by '-' and capitalize each word
      const words = name
         .split('-')
         .map(word => word.charAt(0).toUpperCase() + word.slice(1));
      // Join the words with a space
      return words.join(' ');
   };

   const courseName = payment.courseName;
   const formattedName = formatCourseName(courseName);

   return (
      <div className="min-h-[calc(100vh-170px)] flex justify-center items-center">
         <div className="bg-silver-mist p-4 rounded-md shadow-md w-96">
            <h4 className="text-2xl font-bold mb-4 text-center">
               Payment Details
            </h4>
            <table className="w-full">
               <tbody>
                  <tr>
                     <td className="font-semibold">Course Name</td>
                     <td>{formattedName}</td>
                  </tr>

                  <tr>
                     <td className="font-semibold">Email</td>
                     <td>{payment.email}</td>
                  </tr>
                  <tr>
                     <td className="font-semibold">Student Name</td>
                     <td>{payment.studentName}</td>
                  </tr>
                  <tr>
                     <td className="font-semibold">Card Holder Name</td>
                     <td>{payment.cardHolderName}</td>
                  </tr>
                  <tr>
                     <td className="font-semibold">Course Value</td>
                     <td>Rs. {payment.courseValue}.00</td>
                  </tr>
                  <tr>
                     <td className="font-semibold">Billed Value</td>
                     <td>Rs. {payment.billingAmount}.00</td>
                  </tr>
                  <tr>
                     <td className="font-semibold">Enrolled Time</td>
                     <td>
                        {formatDate(payment.createdAt)} at{' '}
                        {formatTime(payment.createdAt)}
                     </td>
                  </tr>
                  <tr>
                     <td className="font-semibold">Valid Time</td>
                     <td>
                        {formatDate(payment.expireDate)} at{' '}
                        {formatTime(payment.expireDate)}
                     </td>
                  </tr>
               </tbody>
            </table>
         </div>
      </div>
   );
};

export default PaymentDetails;
