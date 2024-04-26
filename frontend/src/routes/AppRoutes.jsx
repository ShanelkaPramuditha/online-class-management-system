import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

/* import all pages */
import { Header, Footer, Recovery, Reset } from '../components';
import {
   Home,
   Courses,
   Contact,
   About,
   Theory,
   Revision,
   Papers,
   CreateExam,
   ModelPapers,
   Profile,
   PageNotFound,
   UserMain,
   AddUser,
   UpdateUser,
   Payment,
   ViewPayment,
   PaymentDetails
} from '../pages';

/** Auth Middleware */
import { AuthorizedUser, ProtectRoute } from '../middleware/auth.jsx';

/* Define your routes as an array of Route components "/UserMain/AddUser"*/
const routes = [
   { path: '/', element: <Home /> },
   { path: '/courses', element: <Courses /> },
   { path: '/contact', element: <Contact /> },
   { path: '/about', element: <About /> },
   { path: '/theory', element: <Theory /> },
   { path: '/revision', element: <Revision /> },
   // { path: '/onlineexam', element: <OnlineExam /> },
   { path: '/exam', element: <Papers /> },
   { path: '/exam/create', element: <CreateExam /> },
   { path: '/modelpapers', element: <ModelPapers /> },

   { path: '/payment', element: <Payment /> },
   { path: '/payments', element: <ViewPayment /> },
   { path: '/payment/:id', element: <PaymentDetails /> },

   //UserMain
   { path: '/UserMain', element: <UserMain /> },
   { path: '/UserMain/AddUser', element: <AddUser /> },
   { path: '/UserMain/UpdateUser/:id', element: <UpdateUser /> },
   // {
   //    path: '/password',
   //    element: (
   //       <ProtectRoute>
   //          <Password />
   //       </ProtectRoute>
   //    )
   // },
   {
      path: '/profile',
      element: (
         <AuthorizedUser>
            <Profile />
         </AuthorizedUser>
      )
   },
   { path: '/recovery', element: <Recovery /> },
   { path: '/reset', element: <Reset /> },
   { path: '/pagenotfound', element: <PageNotFound /> }
];

/* AppRoutes component */
function AppRoutes() {
   return (
      <div>
         <Router>
            <Header />
            <Routes>
               {routes.map((route, index) => (
                  <Route
                     key={index}
                     path={route.path}
                     element={route.element}
                  />
               ))}
            </Routes>
            <Footer />
         </Router>
      </div>
   );
}

export default AppRoutes;
