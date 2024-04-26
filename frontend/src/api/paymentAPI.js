import axios from 'axios';
import requestAuth from './requestAuth.js';

// Insert Payment
export async function insertPayment(values) {
   try {
      const response = await axios.post('/api/enroll', values, requestAuth);
      return response;
   } catch (error) {
      throw error.response;
   }
}

// Check Payment status
export async function checkPayment(cName) {
   try {
      const response = await axios.get(
         `/api/checkPayment/${cName}`,
         requestAuth
      );
      return response;
   } catch (error) {
      throw error.response;
   }
}

// Get Payments
export async function getPayments() {
   try {
      const {
         data: { payment }
      } = await axios.get('/api/payment/:id', requestAuth);
      return Promise.resolve(payment);
   } catch (error) {
      return Promise.reject({ error });
   }
}

// Get a Payment
export async function getPayment(id) {
   try {
      const response = await axios.get(`/api/payment/${id}`, requestAuth);
      return response;
   } catch (error) {
      throw error.response;
   }
}

// Update a Payment
export async function updatePayment(id, values) {
   try {
      const response = await axios.put(
         `/api/updateEnrollment/${id}`,
         values,
         requestAuth
      );
      return response;
   } catch (error) {
      throw error.response;
   }
}

// Delete a Payment
export async function deletePayment(id) {
   try {
      const response = await axios.delete(`/api/unenroll/${id}`, requestAuth);
      return response;
   } catch (error) {
      throw error.response;
   }
}
