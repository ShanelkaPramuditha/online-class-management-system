import axios from 'axios';
import { jwtDecode } from 'jwt-decode';
import ENV from '../config';

axios.defaults.baseURL = ENV.BACKEND_URL;

// Make API Requests

// Get Username from Token
export async function getUsername() {
   const token = localStorage.getItem('token');
   if (!token) {
      return Promise.reject('Cannot find Token');
   }
   let decode = jwtDecode(token);
   return decode;
}

// Authentication
export async function authenticate(email) {
   try {
      return await axios.post('/api/authenticate', { email });
   } catch (error) {
      return { error: "User doesn't exist" };
   }
}

//  Get User Details
export async function getUser({ username }) {
   try {
      const { data } = await axios.get(`/api/user/${username}`);
      return { data };
   } catch (error) {
      return { error: "Password doesn't Match" };
   }
}

// Register User
export async function registerUser(credentials) {
   try {
      const {
         data: { msg },
         status
      } = await axios.post(`/api/register`, credentials);

      let { fName, email } = credentials;

      // Send Email
      if (status === 201) {
         await axios.post('/api/registerMail', {
            fName,
            userEmail: email,
            text: msg
         });
      }
      return Promise.resolve(msg);
   } catch (error) {
      return Promise.reject({ error });
   }
}

// Login User
export async function verifyPassword({ email, password }) {
   try {
      if (email) {
         const { data } = await axios.post('/api/login', {
            email,
            password
         });
         return Promise.resolve({ data });
      }
   } catch (error) {
      return Promise.reject({ error: "Password doesn't Match" });
   }
}

// Update User
export async function updateUser(response) {
   try {
      const token = await localStorage.getItem('token');
      const data = await axios.put('/api/updateUser', response, {
         headers: { Authorization: `Bearer ${token}` }
      });
      return Promise.resolve({ data });
   } catch (error) {
      return Promise.reject({ error: "Couldn't update user" });
   }
}

// Generate OTP
export async function generateOTP(username) {
   try {
      const {
         data: { code },
         status
      } = await axios.get('/api/generateOTP', { params: { username } });

      // Send Email (OTP)
      if (status === 201) {
         let {
            data: { email }
         } = await getUser({ username });
         let text = `Your OTP is ${code}`;
         await axios.post('/api/registerMail', {
            username,
            userEmail: email,
            text,
            subject: 'Password Reset OTP'
         });
      }
      return Promise.resolve(code);
   } catch (error) {
      return Promise.reject({ error });
   }
}

// Verify OTP
export async function verifyOTP({ username, code }) {
   try {
      const { data, status } = await axios.get('/api/verifyOTP', {
         params: { username, code }
      });
      return { data, status };
   } catch (error) {
      return Promise.reject({ error });
   }
}

// Reset Password
export async function resetPassword({ username, password }) {
   try {
      const { data, status } = await axios.put('/api/resetPassword', {
         username,
         password
      });
      return Promise.resolve({ data, status });
   } catch (error) {
      return Promise.reject({ error });
   }
}
