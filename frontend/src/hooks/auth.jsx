import PropTypes from 'prop-types';
import { useAuthStore } from '../store/authStore';

// Check user authentication
export const AuthorizedUser = () => {
   const { isAuthenticated, token, role } = useAuthStore();

   if (isAuthenticated && token && role) {
      return {
         isAuthenticated: isAuthenticated,
         role: role
      };
   } else {
      return {
         isAuthenticated: false,
         role: 'user'
      };
   }
};

// PropTypes
AuthorizedUser.propTypes = {
   children: PropTypes.node.isRequired
};
