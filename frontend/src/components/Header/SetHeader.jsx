import { FiUser } from 'react-icons/fi'; // Avatar for unauthenticated users
import AvatarMale from '../../assets/male-avatar.svg'; // Avatar for authenticated users
import AvatarFemale from '../../assets/female-avatar.svg'; // Avatar for authenticated users
import { AuthorizedUser } from '../../hooks/auth';
import { UserData } from '../../hooks/userData';

// Set avatar image
export const AvatarImg = () => {
   const { isAuthenticated } = AuthorizedUser();
   const { gender } = UserData();

   if (isAuthenticated) {
      return (
         <img
            src={gender === 'male' ? AvatarMale : AvatarFemale}
            alt="avatar"
            style={{
               width: '24px',
               height: '24px',
               borderRadius: '50%'
            }}
         />
      );
   } else if (!isAuthenticated) {
      return <FiUser size={24} />;
   }
};

// Set Navbar items
export const SetNavbarItems = () => {
   const { isAuthenticated, role } = AuthorizedUser();

   if (isAuthenticated) {
      if (role === 'admin') {
         return [
            { name: 'DASHBOARD', path: '/' },
            { name: 'MANAGEMENT', path: '/management' },
            { name: 'FAQHANDLING', path: '/faq-handling' }
         ];
      } else if (role === 'teacher') {
         return [
            { name: 'DASHBOARD', path: '/' },
            { name: 'COURSES', path: '/courses' },
            { name: 'STUDENTS', path: '/students' },
            { name: 'FAQHANDLING', path: '/faq-handling' }
         ];
      } else if (role === 'student') {
         return [
            { name: 'HOME', path: '/' },
            { name: 'COURSES', path: '/courses' },
            { name: 'ABOUT', path: '/about' },
            { name: 'CONTACT', path: '/contact' },
            { name: 'FAQ', path: '/faq' }
         ];
      }
   } else {
      return [
         { name: 'HOME', path: '/' },
         { name: 'COURSES', path: '/courses' },
         { name: 'ABOUT', path: '/about' },
         { name: 'CONTACT', path: '/contact' },
         { name: 'FAQ', path: '/faq' }
         // { name: 'FAQHANDLING', path: '/faq-handling' }
      ];
   }
};
