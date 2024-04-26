import axios from 'axios';
import requestAuth from './requestAuth.js';

// Create Live Classes
export async function createLive(values) {
   try {
      const response = await axios.post(
         '/api/liveSessions/create',
         values,
         requestAuth
      );
      return response;
   } catch (error) {
      throw error.response;
   }
}

export async function getSession(values) {
   try {
      const response = await axios.post(
         '/api/liveSessions',
         values,
         requestAuth
      );
      return response;
   } catch (error) {
      throw error.response;
   }
}

export async function getASessions(id) {
   try {
      const response = await axios.get(`/api/liveSessions/${id}`, requestAuth);
      return response;
   } catch (error) {
      throw error.response;
   }
}

export async function editLive(id, values) {
   try {
      const response = await axios.put(
         `/api/liveSessions/edit/${id}`,
         values,
         requestAuth
      );
      return response;
   } catch (error) {
      throw error.response;
   }
}

export async function deleteLive(values) {
   try {
      const response = await axios.delete(
         '/api/liveSessions/delete/:id',
         values,
         requestAuth
      );
      return response;
   } catch (error) {
      throw error.response;
   }
}

// Check grade
export async function checkGrade(grade) {
   try {
      const response = await axios.get(`/api/checkGrade/${grade}`, requestAuth);
      return response;
   } catch (error) {
      throw error.response;
   }
}
