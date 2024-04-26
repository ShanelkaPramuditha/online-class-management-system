import { useAuthStore } from '../store/authStore';
import { AuthorizedUser } from './auth';
// import { Avatar } from 'react-avatar';

// Return public user data
export const UserData = () => {
   const isAuthenticated = AuthorizedUser();
   const {
      email,
      firstName,
      lastName,
      gender,
      mobileNumber,
      dateOfRegistration,
      dateOfUpdated
   } = useAuthStore();

   if (isAuthenticated) {
      return {
         email,
         firstName,
         lastName,
         gender,
         mobileNumber,
         dateOfRegistration,
         dateOfUpdated
      };
   }
};
