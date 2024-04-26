import { useFormik } from 'formik';
import { PiUserCirclePlusLight } from 'react-icons/pi';
import { registerValidation } from '../../api/validate';
import toast, { Toaster } from 'react-hot-toast';
import { Link } from 'react-router-dom';
import { registerUser } from '../../api/helper';

const SignUp = () => {
   const formik = useFormik({
      initialValues: {
         firstName: '',
         lastName: '',
         email: '',
         gender: '',
         mobileNumber: '',
         password: '',
         rePassword: ''
      },
      validate: registerValidation,
      validateOnBlur: false,
      validateOnChange: false,
      onSubmit: async values => {
         console.log(values);
         let registerPromise = registerUser(values);
         toast.promise(registerPromise, {
            loading: 'Registering...',
            success: <b>Registration Successfully!</b>,
            error: <b>Could not Register</b>
         });
         registerPromise.then(() => {
            window.location.href = '/';
         });
      }
   });

   return (
      <dialog id="sign-up" className="modal">
         <Toaster position="top-center" reverseOrder={false}></Toaster>
         <div className="modal-box bg-light-gray">
            {/* Close Button */}
            <form method="dialog">
               <button className="btn btn-sm btn-circle btn-ghost absolute right-2 top-2">
                  ✕
               </button>
            </form>

            {/* Sign Up Form */}
            <h3 className="font-bold text-lg text-center">SIGN UP</h3>
            <form className="py-1" onSubmit={formik.handleSubmit}>
               <div className="flex items-center justify-center p-0">
                  <PiUserCirclePlusLight size={120} />
               </div>
               {/* Input Fields */}
               <div className="textbox flex flex-col items-center gap-4">
                  <div className="grid grid-cols-2 gap-4 w-full">
                     <div className="grid grid-rows-2">
                        <label htmlFor="firstName">First Name</label>
                        <input
                           {...formik.getFieldProps('firstName')}
                           id="firstName"
                           type="text"
                           placeholder="First Name"
                           className="px-4 h-[27px] w-full border-2 border-[#00000066] rounded-lg"
                        />
                     </div>
                     <div className="grid grid-rows-2">
                        <label htmlFor="lastName">Last Name</label>
                        <input
                           {...formik.getFieldProps('lastName')}
                           id="lastName"
                           type="text"
                           placeholder="Last Name"
                           className="px-4 h-[27px] w-full border-2 border-[#00000066] rounded-lg"
                        />
                     </div>
                  </div>
                  <div className="grid grid-rows-2 w-full">
                     <label htmlFor="signUpEmail">Email</label>
                     <input
                        {...formik.getFieldProps('email')}
                        id="signUpEmail"
                        type="email"
                        placeholder="Email"
                        autoComplete="on"
                        className="px-4 h-[27px] w-full border-2 border-[#00000066] rounded-lg"
                     />
                  </div>
                  <div className="grid grid-cols-2 gap-4 w-full">
                     <div className="grid grid-rows-2">
                        <label htmlFor="gender">Gender</label>
                        <select
                           {...formik.getFieldProps('gender')}
                           id="gender"
                           className="px-4 h-[27px] w-full border-2 border-[#00000066] rounded-lg"
                           value={formik.values.gender} // Set the value prop to the current value from formik
                           onChange={formik.handleChange} // Make sure to handle the change event
                        >
                           <option value="" disabled>
                              Select Gender
                           </option>
                           <option value="male">Male</option>
                           <option value="female">Female</option>
                        </select>
                     </div>
                     <div className="grid grid-rows-2">
                        <label htmlFor="mobileNumber">Mobile Number</label>
                        <input
                           {...formik.getFieldProps('mobileNumber')}
                           id="mobileNumber"
                           type="text"
                           placeholder="Mobile Number"
                           className="px-4 h-[27px] w-full border-2 border-[#00000066] rounded-lg"
                        />
                     </div>
                  </div>
                  <div className="grid grid-cols-2 gap-4 w-full">
                     <div className="grid grid-rows-2">
                        <label htmlFor="password">Password</label>
                        <input
                           {...formik.getFieldProps('password')}
                           id="password"
                           type="password"
                           placeholder="Password"
                           className="px-4 h-[27px] w-full border-2 border-[#00000066] rounded-lg"
                        />
                     </div>
                     <div className="grid grid-rows-2">
                        <label htmlFor="rePassword">Retype Password</label>
                        <input
                           {...formik.getFieldProps('rePassword')}
                           id="rePassword"
                           type="password"
                           placeholder="Re-Enter Password"
                           className="px-4 h-[27px] w-full border-2 border-[#00000066] rounded-lg"
                        />
                     </div>
                  </div>
                  <button
                     type="submit"
                     className="bg-[#0057FF] hover:bg-[#000D85] text-[#FFFFFF] font-bold py-2 px-16 rounded-full">
                     SIGN UP
                  </button>
               </div>
               <div>
                  <p className="text-center py-4">
                     <span className="text-gray-500">
                        Have an Account?{' '}
                        <Link
                           onClick={() =>
                              document.getElementById('sign-in').showModal()
                           }
                           className="text-[#0077B6]">
                           Sign Up
                        </Link>
                     </span>
                  </p>
               </div>
            </form>
            <p className="py-0"></p>
         </div>
      </dialog>
   );
};

export default SignUp;
