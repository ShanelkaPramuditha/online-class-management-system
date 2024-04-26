import { useAuthStore } from '../store/authStore';

// Auth middleware
const token = useAuthStore.getState().token;

const requestAuth = {
   headers: {
      Authorization: `Bearer ${token}`,
      'Content-type': 'application/json'
   }
};

export default requestAuth;
