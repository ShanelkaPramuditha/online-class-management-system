import { useState } from 'react';
import { useFormik } from 'formik';
import { PiUserCircleLight } from 'react-icons/pi';
import { emailValidate, passwordValidate } from '../../api/validate';
import { useAuthStore } from '../../store/authStore';
import toast, { Toaster } from 'react-hot-toast';
import { Link } from 'react-router-dom';
import { verifyPassword } from '../../api/helper';
import Swal from 'sweetalert2';

const SignIn = () => {
   const { login } = useAuthStore();

   const [showPasswordForm, setShowPasswordForm] = useState(false);
   const [showModal, setShowModal] = useState(true);

   // Formik for Email
   const userFormik = useFormik({
      initialValues: {
         email: ''
      },
      validate: emailValidate,
      validateOnBlur: false,
      validateOnChange: false,
      onSubmit: async () => {
         setShowPasswordForm(true);
      }
   });

   // Formik for Password
   const passwordFormik = useFormik({
      initialValues: {
         password: ''
      },
      validate: passwordValidate,
      validateOnBlur: false,
      validateOnChange: false,
      onSubmit: async values => {
         let loginPromise = verifyPassword({
            email: userFormik.values.email,
            password: values.password
         });
         toast.promise(loginPromise, {
            loading: 'Logging In...',
            success: <b>Logged In Successfully!</b>,
            error: <b>Could not Login</b>
         });

         loginPromise.then(res => {
            let { token } = res.data;
            login(
               res.data.email,
               res.data.userRole,
               token,
               res.data.firstName,
               res.data.lastName,
               res.data.gender,
               res.data.mobileNumber,
               res.data.dateOfRegistration,
               res.data.dateOfUpdated
            );
            setShowPasswordForm(false);
            setShowModal(false);
            Swal.fire({
               icon: 'success',
               title: 'Logged In Successfully!',
               showConfirmButton: false,
               timerProgressBar: true,
               timer: 2000
            }).then(() => {
               window.location.href = '/';
            });
         });
      }
   });

   if (showModal) {
      return (
         <dialog id="sign-in" className="modal">
            <Toaster position="top-center" reverseOrder={false}></Toaster>
            <div className="modal-box bg-light-gray">
               {/* Close Button */}
               <form method="dialog">
                  <button
                     className="btn btn-sm btn-circle btn-ghost absolute right-2 top-2"
                     onClick={() => {
                        setShowPasswordForm(false);
                     }}>
                     ✕
                  </button>
               </form>

               {/* Sign In Form */}
               <h3 className="font-bold text-lg text-center">SIGN IN</h3>
               {showPasswordForm ? (
                  // Password form
                  <form className="py-1" onSubmit={passwordFormik.handleSubmit}>
                     {/* Password form fields */}
                     <div className="textbox flex flex-col items-center gap-6">
                        <div className="flex items-center justify-center p-3">
                           <PiUserCircleLight size={120} />
                        </div>
                        <input
                           {...passwordFormik.getFieldProps('password')}
                           type="password"
                           placeholder="Password"
                           className="input input-bordered w-full"
                        />
                        <button type="submit">SIGN IN</button>
                     </div>
                  </form>
               ) : (
                  // Username form
                  <form className="py-1" onSubmit={userFormik.handleSubmit}>
                     {/* Username form fields */}
                     <div className="flex items-center justify-center p-3">
                        <PiUserCircleLight size={120} />
                     </div>
                     <div className="textbox flex flex-col items-center gap-5">
                        <div className="flex flex-col w-[calc(100%-5rem)]">
                           <label htmlFor="signInEmail">E-mail</label>
                           <input
                              {...userFormik.getFieldProps('email')}
                              id="signInEmail"
                              type="email"
                              placeholder="Email"
                              autoComplete="on"
                              className="input input-bordered w-full"
                           />
                        </div>
                        <button
                           type="submit"
                           className="bg-[#0057FF] hover:bg-[#000D85] text-[#FFFFFF] font-bold py-2 px-16 rounded-full">
                           NEXT
                        </button>
                     </div>
                     <div>
                        <p className="text-center py-4">
                           <span className="text-gray-500">
                              Not a member yet?{' '}
                              <Link
                                 onClick={() =>
                                    document
                                       .getElementById('sign-up')
                                       .showModal()
                                 }
                                 className="text-[#0077B6]">
                                 Sign Up
                              </Link>
                           </span>
                        </p>
                     </div>
                  </form>
               )}
               <p className="py-4"></p>
            </div>
         </dialog>
      );
   }
};

export default SignIn;
