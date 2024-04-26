import { Link, useNavigate } from 'react-router-dom';
import toast, { Toaster } from 'react-hot-toast';
import { useFormik } from 'formik';

import avatar from '../assets/react.svg';
import { passwordValidate } from '../api/validate';
import useFetch from '../hooks/fetch.hook';
import { useAuthStore } from '../store/store';
import { verifyPassword } from '../api/helper';

export default function Password() {
   const navigate = useNavigate();
   const { username } = useAuthStore(state => state.auth);
   const [{ isLoading, apiData, serverError }] = useFetch(`/user/${username}`);

   const formik = useFormik({
      initialValues: {
         password: ''
      },
      validate: passwordValidate,
      validateOnBlur: false,
      validateOnChange: false,
      onSubmit: async values => {
         let loginPromise = verifyPassword({
            username,
            password: values.password
         });
         toast.promise(loginPromise, {
            loading: 'Logging In...',
            success: <b>Logged In Successfully!</b>,
            error: <b>Could not Login</b>
         });

         loginPromise.then(res => {
            let { token } = res.data;
            localStorage.setItem('token', token);
            navigate('/profile');
         });
      }
   });

   if (isLoading) {
      return <h1>Loading...</h1>;
   }

   if (serverError) {
      console.log(isLoading, apiData, serverError);
      return <h1>Error: {serverError.message}</h1>;
   }

   return (
      <div className="container mx-auto">
         <Toaster position="top-center" reverseOrder={false}></Toaster>

         <div className="flex h-screen">
            <div>
               <div className="title flex flex-col items-center">
                  <h4 className="text-5xl font-bold">
                     Hello {apiData?.firstName || apiData?.username} Every
                  </h4>
                  <span className="py-4 text-xl w-2/3 text-center text-gray-500">
                     Explore more with connecting with us.
                  </span>
               </div>

               <form className="py-1" onSubmit={formik.handleSubmit}>
                  <div className="profile flex justify-center py-4">
                     <img src={apiData?.profile || avatar} alt="avatar" />
                  </div>

                  <div className="textbox flex flex-col items-center gap-6">
                     <input
                        {...formik.getFieldProps('password')}
                        type="password"
                        placeholder="Password"
                     />
                     <button type="submit">Sign In</button>
                  </div>

                  <div className="text-center py-4">
                     <span className="text-gray-500">
                        Forgot Password?{' '}
                        <Link className="text-red-500" to="/recovery">
                           Recover Now
                        </Link>
                     </span>
                  </div>
               </form>
            </div>
         </div>
      </div>
   );
}
