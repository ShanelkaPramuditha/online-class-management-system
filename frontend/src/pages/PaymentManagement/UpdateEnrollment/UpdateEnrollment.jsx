import { useForm } from 'react-hook-form';
import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import Swal from 'sweetalert2';
import { getPayment, updatePayment } from '../../../api/paymentAPI';

const UpdateEnrollment = () => {
   const [payment, setPayment] = useState(null);
   const { id } = useParams();

   const {
      register,
      handleSubmit,
      formState: { errors },
      setValue
   } = useForm({
      mode: 'onBlur'
   });

   useEffect(() => {
      const fetchPayment = async () => {
         try {
            const response = await getPayment(id);
            setPayment(response.data);
            setValue('cardHolderName', response.data.payment.cardHolderName);
            setValue('holderLName', response.data.payment.studentName);
            setValue('courseName', response.data.payment.courseName);
            setValue('courseValue', response.data.payment.courseValue);
            setValue('offerValue', response.data.payment.offerValue);
            setValue('status', response.data.payment.status);
         } catch (error) {
            console.error('Error fetching payment:', error);
         }
      };
      fetchPayment();
   }, [id, setValue]);

   const onSubmit = async data => {
      try {
         // Display Loading dialog
         Swal.fire({
            title: 'Updating Payment...',
            allowOutsideClick: false,
            showConfirmButton: false,
            didOpen: () => {
               Swal.showLoading();
            }
         });

         const response = await updatePayment(id, data);

         // Close Loading Dialog
         Swal.close();

         if (response.status === 200) {
            Swal.fire({
               icon: 'success',
               title: 'Payment Updated Successfully!',
               showConfirmButton: false,
               timer: 1500
            }).then(() => {
               window.location.href = '/payments';
            });
         }
      } catch (error) {
         Swal.fire({
            icon: 'error',
            title: 'Could not update payment',
            text: 'Please try again later',
            showConfirmButton: true
         });
      }
   };

   return (
      <div className="p-6 mx-auto">
         <h1 className="text-3xl font-semibold mb-6">Update Payment</h1>
         {payment && (
            <form onSubmit={handleSubmit(onSubmit)}>
               <div className="grid grid-cols-2 gap-6">
                  <div className="mb-5">
                     <label
                        htmlFor="cardHolderName"
                        className="block text-sm font-medium text-gray-700 mb-2">
                        Card Holder Name
                     </label>
                     <input
                        {...register('cardHolderName', {
                           required: 'Name is required'
                        })}
                        disabled
                        type="text"
                        id="cardHolderName"
                        name="cardHolderName"
                        placeholder="First Name"
                        defaultValue={payment.cardHolderName}
                        className={`input input-bordered w-full ${
                           errors.cardHolderName ? 'input-error' : ''
                        }`}
                     />
                     {errors.cardHolderName && (
                        <span className="text-sm text-red-600">
                           {errors.cardHolderName.message}
                        </span>
                     )}
                  </div>
                  <div className="mb-5">
                     <label
                        htmlFor="studentName"
                        className="block text-sm font-medium text-gray-700 mb-2">
                        Student Name
                     </label>
                     <input
                        {...register('holderLName', {
                           required: 'Last Name is required'
                        })}
                        disabled
                        type="text"
                        id="holderLName"
                        name="holderLName"
                        placeholder="Last Name"
                        defaultValue={payment.studentName}
                        className={`input input-bordered w-full ${
                           errors.holderLName ? 'input-error' : ''
                        }`}
                     />
                     {errors.holderLName && (
                        <span className="text-sm text-red-600">
                           {errors.holderLName.message}
                        </span>
                     )}
                  </div>
                  <div className="mb-5">
                     <label
                        htmlFor="courseName"
                        className="block text-sm font-medium text-gray-700 mb-2">
                        Course Name
                     </label>
                     <input
                        {...register('courseName', {
                           required: 'Course Name is required'
                        })}
                        type="text"
                        id="courseName"
                        name="courseName"
                        placeholder="Course Name"
                        defaultValue={payment.courseName}
                        className={`input input-bordered w-full ${
                           errors.courseName ? 'input-error' : ''
                        }`}
                     />
                     {errors.courseName && (
                        <span className="text-sm text-[red]">
                           {errors.courseName.message}
                        </span>
                     )}
                  </div>
                  <div className="mb-5">
                     <label
                        htmlFor="courseValue"
                        className="block text-sm font-medium text-gray-700 mb-2">
                        Course Value
                     </label>
                     <input
                        {...register('courseValue', {
                           required: 'Course Value is required'
                        })}
                        disabled
                        type="number"
                        id="courseValue"
                        name="courseValue"
                        placeholder="Course Value"
                        defaultValue={payment.courseValue}
                        className={`input input-bordered w-full ${
                           errors.courseValue ? 'input-error' : ''
                        }`}
                     />
                     {errors.courseValue && (
                        <span className="text-sm text-red-600">
                           {errors.courseValue.message}
                        </span>
                     )}
                  </div>
                  <div className="mb-5">
                     <label
                        htmlFor="offerValue"
                        className="block text-sm font-medium text-gray-700 mb-2">
                        Offer Value
                     </label>
                     <input
                        {...register('offerValue', {
                           required: 'Offer Value is required'
                        })}
                        type="number"
                        id="offerValue"
                        name="offerValue"
                        placeholder="Offer Value"
                        defaultValue={payment.offerValue}
                        className={`input input-bordered w-full ${
                           errors.offerValue ? 'input-error' : ''
                        }`}
                     />
                     {errors.offerValue && (
                        <span className="text-sm text-[red]">
                           {errors.offerValue.message}
                        </span>
                     )}
                  </div>
                  <div className="mb-5">
                     <label
                        htmlFor="status"
                        className="block text-sm font-medium text-gray-700 mb-2">
                        Status
                     </label>
                     <select
                        {...register('status', {
                           required: 'Status is required'
                        })}
                        id="status"
                        name="status"
                        defaultValue={payment.status}
                        className={`input input-bordered w-full ${
                           errors.status ? 'input-error' : ''
                        }`}>
                        <option value="">Select Status</option>
                        <option value="Approved">Approved</option>
                        <option value="Cancelled">Cancelled</option>
                     </select>
                     {errors.status && (
                        <span className="text-sm text-[red]">
                           {errors.status.message}
                        </span>
                     )}
                  </div>
               </div>
               <button type="submit" className="btn btn-primary w-full mt-7">
                  Update Payment
               </button>
            </form>
         )}
      </div>
   );
};

export default UpdateEnrollment;
