import axios from 'axios';
import requestAuth from './requestAuth.js';

// Create paper
export async function createPaper(values) {
   try {
      const response = await axios.post(
         '/api/paper/create',
         values,
         requestAuth
      );
      return response;
   } catch (error) {
      throw error.response;
   }
}
