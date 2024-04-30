import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

/* import all pages */
import { Header, Footer, Recovery, Reset } from '../components';
import {
   Courses,
   Contact,
   About,
   FaqHandling,
   Theory,
   TheoryGrade12,
   Revision,
   Papers,
   CreateExam,
   ModelPapers,
   UserMain,
   AddUser,
   UpdateUser,
   Moreinfo,
   Payment,
   ViewPayment,
   PaymentDetails,
   CreateQuestions,
   UpdateExam,
   ViewExams,
   OnlinePaper,
   LiveClassForm,
   LiveClassUI,
   LiveClassEdit,
   LiveClassView,
   AllExams,
   UpdateEnrollment
} from '../pages';
import Dash from '../components/chat/dash.jsx';

/* Auth Middleware */
import { ProtectedRoute } from './ProtectedRoutes.jsx';
import DashboardRoutes from './DashboardRoutes.jsx';

const routes = [
   {
      path: '/',
      element: <DashboardRoutes />,
      auth: [true, false],
      roles: ['admin', 'teacher', 'student', 'user']
   },
   {
      path: '/courses',
      element: <Courses />,
      auth: [true, false],
      roles: ['teacher', 'student', 'user']
   },
   {
      path: '/contact',
      element: <Contact />,
      auth: [true, false],
      roles: ['student', 'user']
   },
   {
      path: '/about',
      element: <About />,
      auth: [true, false],
      roles: ['student', 'user']
   },
   {
      path: '/faq',
      element: <FaqHandling />,
      auth: [true, false],
      roles: ['student', 'user']
   },
   {
      path: '/theory',
      element: <Theory />,
      auth: [true, false],
      roles: ['student', 'user']
   },
   {
      path: '/theory/grade-12',
      element: <TheoryGrade12 />,
      auth: [true, false],
      roles: ['student']
   },
   {
      path: '/revision',
      element: <Revision />,
      auth: [true, false],
      roles: ['student', 'user']
   },
   // { path: '/onlineexam', element: <OnlineExam /> },
   {
      path: '/exam',
      element: <Papers />,
      auth: [true, false],
      roles: ['teacher']
   },
   {
      path: '/exam/create',
      element: <CreateExam />,
      auth: [true],
      roles: ['teacher']
   },

   {
      path: '/exam/view',
      element: <ViewExams />,
      auth: [true],
      roles: ['student', 'teacher']
   },

   {
      path: '/exam/paper/:paperId',
      element: <OnlinePaper />,
      auth: [true],
      roles: ['student', 'teacher']
   },

   {
      path: '/exam/update/:paperId',
      element: <UpdateExam />,
      auth: [true],
      roles: ['teacher']
   },
   {
      path: '/questions/create/:paperId',
      element: <CreateQuestions />,
      auth: [true],
      roles: ['teacher']
   },

   {
      path: '/modelpapers',
      element: <ModelPapers />,
      auth: [true, false],
      roles: ['student', 'user']
   },

   {
      path: '/payment',
      element: <Payment />,
      auth: [true],
      roles: ['student']
   },
   {
      path: '/payments',
      element: <ViewPayment />,
      auth: [true],
      roles: ['admin', 'teacher']
   },
   {
      path: '/payment/:id',
      element: <PaymentDetails />,
      auth: [true],
      roles: ['admin', 'teacher']
   },

   //UserMain
   {
      path: '/students',
      element: <UserMain />,
      auth: [true],
      roles: ['admin', 'teacher', 'student']
   },
   {
      path: '/students/AddUser',
      element: <AddUser />,
      auth: [true],
      roles: ['admin']
   },
   {
      path: '/students/UpdateUser/:id',
      element: <UpdateUser />,
      auth: [true],
      roles: ['admin', 'teacher', 'student']
   },
   {
      path: '/students/MoreInfo/:id',
      element: <Moreinfo />,
      auth: [true],
      roles: ['admin', 'teacher', 'student']
   },

   // Chat Option
   {
      path: '/chat',
      element: <Dash />,
      auth: [true],
      roles: ['admin', 'teacher', 'student']
   },
   {
      path: '/recovery',
      element: <Recovery />,
      auth: [true],
      roles: ['admin', 'teacher', 'student']
   },
   {
      path: '/reset',
      element: <Reset />,
      auth: [true],
      roles: ['admin', 'teacher', 'student']
   },
   // Live Class Route
   //Live Class path
   {
      path: '/liveclassform',
      element: <LiveClassForm />,
      auth: [true],
      roles: ['teacher']
   },
   {
      path: '/liveclass',
      element: <LiveClassUI />,
      auth: [true],
      roles: ['teacher']
   },
   {
      path: '/liveclassedit/:id',
      element: <LiveClassEdit />,
      auth: [true],
      roles: ['teacher']
   },
   {
      path: '/liveclassview',
      element: <LiveClassView />,
      auth: [true],
      roles: ['admin', 'teacher', 'student']
   },
   {
      path: '/allexams',
      element: <AllExams />,
      auth: [true, false],
      roles: ['student', 'user']
   },
   {
      path: '/payment/update/:id',
      element: <UpdateEnrollment />,
      auth: [true],
      roles: ['admin', 'teacher', 'student']
   }
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
                     element={
                        <ProtectedRoute
                           element={route.element}
                           auth={route.auth}
                           roles={route.roles}
                        />
                     }
                  />
               ))}
            </Routes>
            <Footer />
         </Router>
      </div>
   );
}

export default AppRoutes;
