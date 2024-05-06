import { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import Swal from 'sweetalert2';
import jsPDF from 'jspdf';
import 'jspdf-autotable';
import requestAuth from '../../../api/requestAuth';
import { deletePayment } from '../../../api/paymentAPI';
import ScrollToTop from '../../../components/ScrollToTop';

const ViewPayment = () => {
   const [payments, setPayments] = useState([]);
   const [searchQuery, setSearchQuery] = useState('');

   const navigate = useNavigate();

   // Fetch payments data from the backend API
   useEffect(() => {
      const fetchPayments = async () => {
         try {
            const response = await axios.get('/api/payments', requestAuth); // Assuming this is your backend API endpoint to fetch payments
            setPayments(response.data.payments);
         } catch (error) {
            console.error('Error fetching payments:', error);
         }
      };
      fetchPayments();
   }, []);

   // View handler
   const handleView = async paymentId => {
      navigate(`/payment/${paymentId}`);
   };

   // Update handler
   const handleUpdate = async paymentId => {
      navigate(`/payment/update/${paymentId}`);
   };

   // Delete handler
   const handleDelete = async paymentId => {
      Swal.fire({
         title: 'Are you sure?',
         text: 'You will not be able to recover this payment!',
         icon: 'warning',
         showCancelButton: true,
         confirmButtonText: 'Yes, delete it!',
         cancelButtonText: 'No, keep it'
      }).then(async result => {
         if (result.isConfirmed) {
            try {
               await deletePayment(paymentId);
               setPayments(prevPayments =>
                  prevPayments.filter(payment => payment._id !== paymentId)
               );
               Swal.fire(
                  'Deleted!',
                  'The payment has been deleted.',
                  'success'
               );
            } catch (error) {
               console.error('Error deleting payment:', error);
               Swal.fire('Error!', 'Failed to delete the payment.', 'error');
            }
         }
      });
   };

   // Report handler
   const reportHandler = async () => {
      const { value: formValues } = await Swal.fire({
         title: 'Enter Date Range',
         html:
            '<input id="swal-input-from" class="swal2-input" placeholder="From Date" type="date">' +
            '<input id="swal-input-to" class="swal2-input" placeholder="To Date" type="date">',
         focusConfirm: false,
         preConfirm: () => {
            return [
               document.getElementById('swal-input-from').value,
               document.getElementById('swal-input-to').value
            ];
         }
      });

      // Validate date inputs
      if (!formValues || !formValues[0] || !formValues[1]) {
         Swal.fire(
            'Error!',
            'Please enter both From Date and To Date.',
            'error'
         );
         return;
      }

      const fromTimestamp = new Date(formValues[0]).getTime();
      const toTimestamp = new Date(formValues[1]).getTime();

      if (isNaN(fromTimestamp) || isNaN(toTimestamp)) {
         Swal.fire(
            'Error!',
            'Invalid date format. Please use YYYY-MM-DD format.',
            'error'
         );
         return;
      }

      // Filter payments within the date range
      const filteredPaymentsInRange = filteredPayments.filter(payment => {
         const paymentDate = new Date(payment.createdAt).getTime();
         return paymentDate >= fromTimestamp && paymentDate <= toTimestamp;
      });

      // Generate report with filtered payments
      const doc = new jsPDF();

      // Calculate total payments within the range
      const totalPaymentsInRange = filteredPaymentsInRange.length;

      // Total billing amount within the range
      const totalAmountInRange = filteredPaymentsInRange.reduce(
         (acc, payment) => acc + payment.billingAmount,
         0
      );

      // Add header
      const headerTitle = 'Payment Report';
      const headerTitleX = doc.internal.pageSize.width / 2;
      doc.setFontSize(12);
      doc.text(headerTitle, headerTitleX, 10, { align: 'center' });

      // Table header
      doc.autoTable({
         head: [
            [
               'STUDENT NAME',
               'COURSE NAME',
               'BILLING DATE',
               'VALID DATE',
               'VALUE(RS)'
            ]
         ],
         body: filteredPaymentsInRange.map(payment => [
            payment.studentName,
            payment.courseName,
            new Date(payment.createdAt).toISOString().split('T')[0],
            new Date(payment.expireDate).toISOString().split('T')[0],
            payment.billingAmount
         ])
      });

      let currentY = doc.autoTable.previous.finalY + 10;

      // total payments within the range
      doc.text(`Total Payment Count: ${totalPaymentsInRange}`, 14, currentY);

      // Total Amounts within the range
      doc.text(`Total Value: ${totalAmountInRange}`, 14, currentY + 10);

      // Save the PDF
      doc.save('payments-report.pdf');
   };

   // Filtered payments based on search query
   const filteredPayments = payments.filter(payment =>
      payment.studentName.toLowerCase().includes(searchQuery.toLowerCase())
   );

   return (
      <div className="body-content min-h-[calc(100vh-270px)]">
         <h4 className="font-semibold text-3xl my-10 text-center">Payments</h4>

         {/* Report Generation Button */}
         <div className="flex justify-end mb-5">
            <button
               onClick={reportHandler}
               className="bg-[#0057FF] hover:bg-[#000D85] text-[white] font-bold py-2 px-6 rounded-full">
               Generate Report
            </button>
         </div>

         {/* Search Input */}
         <div className="mb-5 flex justify-start w-52">
            <input
               type="text"
               value={searchQuery}
               onChange={e => setSearchQuery(e.target.value)}
               placeholder="Search by student name..."
               className="border border-gray-300 rounded-md px-3 py-1 focus:outline-none focus:border-blue-500"
            />
         </div>
         <div className="relative overflow-x-auto shadow-md sm:rounded-lg">
            <table className="w-full text-sm text-left rtl:text-right text-[gray] dark:text-[gray]">
               <thead className="text-xs text-[white] uppercase bg-[gray] dark:bg-[black] dark:text-[white] text-center">
                  <tr>
                     <th scope="col" className="px-6 py-3">
                        Student Name
                     </th>
                     {/* <th scope="col" className="px-6 py-3">
                        Email
                     </th> */}
                     <th scope="col" className="px-6 py-3">
                        Course Name
                     </th>

                     <th scope="col" className="px-6 py-3">
                        Billing Date
                     </th>
                     <th scope="col" className="px-6 py-3">
                        Billing Time
                     </th>
                     <th scope="col" className="px-6 py-3">
                        Valid Date
                     </th>
                     <th scope="col" className="px-6 py-3">
                        Billing Value (RS.)
                     </th>
                     <th scope="col" className="px-6 py-3">
                        Status
                     </th>
                     <th scope="col" className="px-6 py-3">
                        <span className="sr-only">Actions</span>
                     </th>
                  </tr>
               </thead>
               <tbody className="text-center">
                  {filteredPayments.map((payment, index) => (
                     // {payments.map((payment, index) => (
                     <tr
                        key={index}
                        className="bg-[white] border-b dark:bg-gray-800 dark:border-[gray] hover:bg-silver-mist dark:hover:bg-silver-mist">
                        <td className="px-6 py-4 text-start">
                           {payment.studentName}
                        </td>
                        {/* <td className="px-6 py-4 text-start">
                           {payment.email}
                        </td> */}
                        <td className="px-6 py-4 text-start">
                           {payment.courseName}
                        </td>
                        <td className="px-6 py-4">
                           {new Date(payment.createdAt).getFullYear()}/
                           {String(
                              new Date(payment.createdAt).getMonth() + 1
                           ).padStart(2, '0')}
                           /
                           {String(
                              new Date(payment.createdAt).getDate()
                           ).padStart(2, '0')}
                        </td>
                        <td className="px-6 py-4">
                           {String(
                              new Date(payment.createdAt).getHours()
                           ).padStart(2, '0')}
                           :
                           {String(
                              new Date(payment.createdAt).getMinutes()
                           ).padStart(2, '0')}
                           :
                           {String(
                              new Date(payment.createdAt).getSeconds()
                           ).padStart(2, '0')}
                        </td>
                        <td className="px-6 py-4">
                           {new Date(payment.expireDate).getFullYear()}/
                           {String(
                              new Date(payment.expireDate).getMonth() + 1
                           ).padStart(2, '0')}
                           /
                           {String(
                              new Date(payment.expireDate).getDate()
                           ).padStart(2, '0')}
                        </td>
                        <td className="px-6 py-4">
                           {payment.billingAmount}.00
                        </td>
                        <td className="px-6 py-4">
                           <div
                              className={`${
                                 payment.status === 'Approved'
                                    ? 'badge bg-[green] text-[white]'
                                    : 'badge bg-dark-red text-[white]'
                              }`}>
                              {payment.status}
                           </div>
                        </td>
                        <td className="px-6 py-4">
                           <div className="">
                              {/* View Button */}
                              <button
                                 onClick={() => handleView(payment._id)}
                                 className="bg-[#0057FF] hover:bg-[#000D85] text-[white] font-bold py-1 px-4 rounded-full me-3">
                                 View
                              </button>
                              {/* Update Button */}
                              <button
                                 onClick={() => handleUpdate(payment._id)}
                                 className="bg-[#FFA500] hover:bg-[#FF8500] text-[white] font-bold py-1 px-4 rounded-full me-3">
                                 Update
                              </button>
                              {/* Delete Button */}
                              <button
                                 onClick={() => handleDelete(payment._id)}
                                 className="bg-[#FF0000] hover:bg-[#850000] text-[white] font-bold py-1 px-4 rounded-full">
                                 Delete
                              </button>
                           </div>
                        </td>
                     </tr>
                  ))}
               </tbody>
            </table>
         </div>
         <ScrollToTop />
      </div>
   );
};

export default ViewPayment;
