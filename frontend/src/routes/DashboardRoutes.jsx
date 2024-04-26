import { Home, AdminDashboard, TeacherDashboard } from '../pages';
import { AuthorizedUser } from '../hooks/auth';

const DashboardRoutes = () => {
   const { isAuthenticated, role } = AuthorizedUser();

   if (isAuthenticated) {
      if (role === 'admin') {
         return <AdminDashboard />;
      } else if (role === 'teacher') {
         return <TeacherDashboard />;
      } else if (role === 'student') {
         return <Home />;
      } else {
         return <Home />;
      }
   } else {
      return <Home />;
   }
};

export default DashboardRoutes;
