import toast from 'react-hot-toast';
import { authenticate } from './helper.js';

/* Validate login page UserName */
export async function emailValidate(values) {
   const errors = emailVerify({}, values);
   if (values.email) {
      // check username in database
      const { status } = await authenticate(values.email);

      if (status !== 200) {
         errors.exist = toast.error("User doesn't exist");
      }
   }
   return errors;
}

/* Validate Password */
export async function passwordValidate(values) {
   const errors = passwordVerify({}, values);
   return errors;
}

/* Validate Reset Password */
export async function resetPasswordValidation(values) {
   const errors = passwordVerify({}, values);
   if (values.password !== values.confirm_password) {
      errors.confirm_password = toast.error('Password does not match');
   }
   return errors;
}

/* Validate Sign Up PopUp / form */
export async function registerValidation(values) {
   const errors = emailVerify({}, values);
   passwordVerify(errors, values);
   emailVerify(errors, values);

   return errors;
}

/* Validate Profile form */
export async function profileValidation(values) {
   const errors = emailVerify({}, values);

   return errors;
}

/* Validate login page Password */
function passwordVerify(errors = {}, values) {
   if (!values.password) {
      errors.password = toast.error('Password is required');
   } else if (values.password.length < 4) {
      errors.password = toast.error('Password should be at least 4 characters');
   }

   return errors;
}

// /* Validate Email */
// function usernameVerify(error = {}, values) {
//    if (!values.username) {
//       error.username = toast.error('Username is required');
//    } else if (values.username.includes(' ')) {
//       error.username = toast.error('Username should not contain space');
//    }

//    return error;
// }

/* Validate Email */
function emailVerify(error = {}, values) {
   if (!values.email) {
      error.email = toast.error('Email is required');
   } else if (values.email.includes(' ')) {
      error.email = toast.error('Invalid Email');
   } else if (!/\S+@\S+\.\S+/.test(values.email)) {
      error.email = toast.error('Invalid Email');
   }

   return error;
}
