import { useForm } from 'react-hook-form';
import Swal from 'sweetalert2';
import { insertPayment } from '../../../api/paymentAPI';
import { useLocation } from 'react-router-dom';
import { useState } from 'react';

const Payment = () => {
   const [paymentMethod, setPaymentMethod] = useState('card');
   const location = useLocation();
   const { courseName, courseValue, offerValue } = location.state || {};
   const {
      register,
      handleSubmit,
      formState: { errors }
   } = useForm({
      mode: 'onBlur'
   });

   const onSubmit = async values => {
      const otherData = {
         courseName,
         courseValue,
         offerValue
      };
      const data = { ...values, ...otherData };

      try {
         // Display Loading dialog
         Swal.fire({
            title: 'Payment Processing...',
            allowOutsideClick: false,
            showConfirmButton: false,
            didOpen: () => {
               Swal.showLoading();
            }
         });

         // Perform Payment
         const response = await insertPayment(data);

         // Close Loading Dialog
         Swal.close();

         // Display Payment Status
         if (response.status === 201) {
            Swal.fire({
               icon: 'success',
               title: 'Payment Successful!',
               showConfirmButton: false,
               timer: 1500
            }).then(() => {
               window.location.href = '/courses';
            });
         }
      } catch (error) {
         Swal.fire({
            icon: 'error',
            title: 'Could not Pay',
            showConfirmButton: false,
            timer: 1500
         });
      }
   };

   // Validate Expire Date
   const validateExpiryDate = value => {
      const today = new Date();
      const [month, year] = value.split('/');
      const expiryDate = new Date(`20${year}-${month}-01`);
      return expiryDate > today || 'Expiry Date must be in the future';
   };

   return (
      <div className="p-6 mx-auto grid grid-cols-2 min-h-[calc(100vh-170px)]">
         <div className="content-baseline px-10 border-r">
            <div className="text-3xl font-semibold text-start mb-6">
               Payment Details
               <span className="text-xl font-thin"> (Check details)</span>
            </div>
            <div className="mt-2 mb-10">
               <p>Course Name: {courseName}</p>
               <p>Course Fee: Rs. {courseValue}</p>
               {offerValue !== 0 && <p>Offer Value: Rs. {offerValue}</p>}
               <p>Total Payable: Rs. {courseValue - offerValue}</p>
            </div>
            <div className="text-3xl font-semibold text-start mb-6">
               Select Payment Method
            </div>
            {/* Card Payment and Bank Transfers */}
            <div className="w-60">
               <button
                  className={`w-full border mb-5  rounded-box ${
                     paymentMethod === 'card' ? ' text-white py-8' : ''
                  }`}
                  onClick={() => setPaymentMethod('card')}>
                  Pay with credit or debit card
                  {/* <CiCreditCard1
                     className={`w-full border mb-5  rounded-box ${
                        paymentMethod === 'card' ? ' text-white py-8' : ''
                     }`}
                  /> */}
               </button>

               <button
                  className={`w-full border mb-5  rounded-box ${
                     paymentMethod === 'bank' ? ' text-white py-8' : ''
                  }`}
                  onClick={() => setPaymentMethod('bank')}>
                  Pay with bank transfer
               </button>
            </div>
         </div>
         {/* Right side of the page */}
         <div className="content-baseline px-10">
            <div className="text-start mb-6">
               <h1 className="text-3xl font-semibold">Pay To Enroll</h1>
            </div>

            {/* Change form with select payment method condition*/}
            {paymentMethod === 'card' && (
               <form onSubmit={handleSubmit(onSubmit)}>
                  <div className="mb-5">
                     <label
                        htmlFor="cardHolderName"
                        className="block text-sm font-medium text-gray-700 mb-2">
                        Card Holder&apos;s Name
                     </label>
                     <input
                        {...register('cardHolderName', {
                           required: 'Card Holder Name is required'
                        })}
                        type="text"
                        id="cardHolderName"
                        name="cardHolderName"
                        placeholder="Card Holder Name"
                        className={`input input-bordered w-full ${
                           errors.cardHolderName ? 'input-error' : ''
                        }`}
                     />
                     {errors.cardHolderName && (
                        <span className="text-sm text-dark-red">
                           {errors.cardHolderName.message}
                        </span>
                     )}
                  </div>

                  <div className="mb-5">
                     <label
                        htmlFor="cardNumber"
                        className="block text-sm font-medium text-gray-700  mb-2">
                        Card Number
                     </label>
                     <input
                        {...register('cardNumber', {
                           required: 'Card Number is required',
                           pattern: {
                              value: /^[0-9]{16}$/,
                              message: 'Invalid Card Number'
                           }
                        })}
                        type="text"
                        id="cardNumber"
                        name="cardNumber"
                        placeholder="Card Number"
                        className={`input input-bordered w-full ${
                           errors.cardNumber ? 'input-error' : ''
                        }`}
                     />
                     {errors.cardNumber && (
                        <span className="text-sm text-dark-red">
                           {errors.cardNumber.message}
                        </span>
                     )}
                  </div>

                  <div className="grid grid-cols-2 gap-6 mb-5">
                     <div>
                        <label
                           htmlFor="exDate"
                           className="block text-sm font-medium text-gray-700  mb-2">
                           Expiry Date
                        </label>
                        <input
                           {...register('exDate', {
                              required: 'Expiry Date is required',
                              pattern: {
                                 value: /^(0[1-9]|1[0-2])\/\d{2}$/,
                                 message: 'Invalid Expiry Date'
                              },
                              validate: validateExpiryDate // Custom validation
                           })}
                           type="text"
                           id="exDate"
                           name="exDate"
                           placeholder="Expiry Date (MM/YY)"
                           className={`input input-bordered w-full ${
                              errors.exDate ? 'input-error' : ''
                           }`}
                        />
                        {errors.exDate && (
                           <span className="text-sm text-dark-red">
                              {errors.exDate.message}
                           </span>
                        )}
                     </div>

                     <div>
                        <label
                           htmlFor="csvNum"
                           className="block text-sm font-medium text-gray-700  mb-2">
                           CSV
                        </label>
                        <input
                           {...register('csvNum', {
                              required: 'CSV is required',
                              pattern: {
                                 value: /^[0-9]{3}$/,
                                 message: 'Invalid CSV'
                              }
                           })}
                           type="text"
                           id="csvNum"
                           name="csvNum"
                           placeholder="CSV"
                           className={`input input-bordered w-full ${
                              errors.csvNum ? 'input-error' : ''
                           }`}
                        />
                        {errors.csvNum && (
                           <span className="text-sm text-dark-red">
                              {errors.csvNum.message}
                           </span>
                        )}
                     </div>
                  </div>

                  <button type="submit" className="btn btn-primary w-full mt-7">
                     Pay Now
                  </button>
               </form>
            )}

            {paymentMethod === 'bank' && (
               // Bank Transfer reciept details with reciept upload
               <form onSubmit={handleSubmit(onSubmit)}>
                  <div className="mb-5">
                     <label
                        htmlFor="transactionId"
                        className="block text-sm font-medium text-gray-700 mb-2">
                        Transaction ID
                     </label>
                     <input
                        {...register('transactionId', {
                           required: 'Transaction ID is required'
                        })}
                        type="text"
                        id="transactionId"
                        name="transactionId"
                        placeholder="Transaction ID"
                        className={`input input-bordered w-full ${
                           errors.transactionId ? 'input-error' : ''
                        }`}
                     />
                     {errors.transactionId && (
                        <span className="text-sm text-dark-red">
                           {errors.transactionId.message}
                        </span>
                     )}
                  </div>

                  {/* <div className="mb-5">
                     <label
                        htmlFor="reciept"
                        className="block text-sm font-medium text-gray-700 mb-2">
                        Reciept
                     </label>
                     <input
                        {...register('reciept', {
                           required: 'Reciept is required'
                        })}
                        type="file"
                        id="reciept"
                        name="reciept"
                        className={`input input-bordered w-full ${
                           errors.reciept ? 'input-error' : ''
                        }`}
                     />
                     {errors.reciept && (
                        <span className="text-sm text-dark-red">
                           {errors.reciept.message}
                        </span>
                     )}
                  </div> */}
                  {/* Submit */}
                  <button type="submit" className="btn btn-primary w-full mt-7">
                     Pay Now
                  </button>
               </form>
            )}
         </div>
      </div>
   );
};

export default Payment;
