import { Link, useNavigate } from 'react-router-dom';
import toast, { Toaster } from 'react-hot-toast';
import { useFormik } from 'formik';

import { profileValidation } from '../../api/validate';
import { updateUser } from '../../api/helper';
import useFetch from '../../hooks/fetch.hook';

export default function Profile() {
   const [{ isLoading, apiData, serverError }] = useFetch();
   const navigate = useNavigate();
   const formik = useFormik({
      initialValues: {
         firstName: apiData?.firstName || '',
         lastName: '',
         email: apiData?.email || '',
         username: apiData?.username || ''
         // password: apiData?.password || ''
      },
      enableReinitialize: true,
      validate: profileValidation,
      validateOnBlur: false,
      validateOnChange: false,
      onSubmit: async values => {
         let updatePromise = updateUser(values);
         toast.promise(updatePromise, {
            loading: 'Updating...',
            success: <b>Update Successfully!</b>,
            error: <b>Could not Updated Data</b>
         });
      }
   });

   // Logout handler function
   const userLogout = () => {
      localStorage.removeItem('token');
      navigate('/');
   };
   if (isLoading) {
      return <h1>Loading...</h1>;
   }

   if (serverError) {
      return <h1>Error: {serverError.message}</h1>;
   }

   return (
      <div className="container mx-auto">
         <Toaster position="top-center" reverseOrder={false}></Toaster>

         <div className="flex h-screen">
            <div>
               <div className="title flex flex-col items-center">
                  <h4 className="text-5xl font-bold">Profile</h4>
                  <span className="py-4 text-xl w-2/3 text-center text-gray-500">
                     Update Profile
                  </span>
               </div>

               <form className="py-1" onSubmit={formik.handleSubmit}>
                  <div className="profile flex justify-center py-4">
                     <label htmlFor="profile"></label>
                     <input type="file" id="profile" name="profile" />
                  </div>

                  <div className="textbox flex flex-col items-center gap-6">
                     <input
                        {...formik.getFieldProps('firstName')}
                        type="text"
                        placeholder="First Name"
                     />
                     <input
                        {...formik.getFieldProps('lastName')}
                        type="text"
                        placeholder="Last Name"
                     />

                     <input
                        {...formik.getFieldProps('email')}
                        type="text"
                        placeholder="Email*"
                     />
                     <input
                        {...formik.getFieldProps('username')}
                        type="text"
                        placeholder="Username*"
                     />
                     {/* <input {...formik.getFieldProps('password')} type='password' placeholder='Password*' /> */}

                     <button type="submit">Update</button>
                  </div>

                  <div className="text-center py-4">
                     <span className="text-gray-500">
                        Come Back Later?{' '}
                        <Link
                           onClick={userLogout}
                           className="text-red-500"
                           to="/">
                           Log Out
                        </Link>
                     </span>
                  </div>
               </form>
            </div>
         </div>
      </div>
   );
}
