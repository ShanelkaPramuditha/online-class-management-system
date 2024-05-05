import Home from './Home';

// Dashboards
import AdminDashboard from './Dashboards/AdminDashboard';
import TeacherDashboard from './Dashboards/TeacherDashboard';
import Courses from './Courses';
import Contact from './Contact';
import About from './About';

import Theory from './Theory';

import FaqHandling from './FaqHandling';
import Faq from './Faq';

// Theory Content
import TheoryGrade12 from './Theory/Grade12';
import Revision from './Revision';
import Papers from './OnlineExams/OnlineExam';
import CreateExam from './OnlineExams/CreateExam';
import CreateQuestions from './OnlineExams/CreateQuestions';
import ModelPapers from './ModelPapers';
import UpdateExam from './OnlineExams/UpdateExam';
import ViewExams from './OnlineExams/ViewExams';
import OnlinePaper from './OnlineExams/OnlinePaper';
import AllExams from './OnlineExams/AllExams';

// Payment Management
import Payment from './PaymentManagement/Payment';
import ViewPayment from './PaymentManagement/ViewPayments';
import PaymentDetails from './PaymentManagement/PaymentDetails';
import UpdateEnrollment from './PaymentManagement/UpdateEnrollment';

import PageNotFound from './PageNotFound';

//User Management
import UserMain from './UserMain';
import AddUser from './UserMain/AddUser';
import UpdateUser from './UserMain/UpdateUser';
import Moreinfo from './UserMain/MoreInfo';
import Profile from './UserMain/Profile';

// Live class Management
import LiveClassForm from './Liveclass/Liveclassform'; // Teacher
import LiveClassUI from './Liveclass/LiveclassUI/liveclassui'; // Teacher
import LiveClassEdit from './Liveclass/Liveclassedit/Liveclassedit'; // Teacher
import LiveClassView from './Theory/LiveView/liveview'; //Student View
// Review Management
import AddReview from './Review/AddReview';
import Reviewlist from './Review/Reviewlist';
import UpdateReview from './Review/UpdateReview';

//Notice Management
import NoticeList from './Notice/Noticelist';
import AddNotice from './Notice/AddNotice';
import UpdateNotice from './Notice/UpdateNotice';

// Paper Management
import StudentTable from './Paper/StudentTable';
import TeacherTable from './Paper/TeacherTable';
import AddPaper from './Paper/AddPaper';
import UpdatePaper from './Paper/UpdatePaper';

import Chat from './Chatpage/DashChat';
import Chatstd from './Chatpage/Dashstd';

export {
   Home,
   AdminDashboard,
   TeacherDashboard,
   Courses,
   Contact,
   About,
   Faq,
   FaqHandling,
   Theory,
   TheoryGrade12,
   Revision,
   Papers,
   CreateExam,
   CreateQuestions,
   ModelPapers,
   Profile,
   Payment,
   ViewPayment,
   PaymentDetails,
   UpdateEnrollment,
   UserMain,
   AddUser,
   UpdateUser,
   Moreinfo,
   PageNotFound,
   UpdateExam,
   ViewExams,
   OnlinePaper,
   LiveClassForm,
   LiveClassUI,
   LiveClassEdit,
   LiveClassView,
   AllExams,
   AddReview,
   Reviewlist,
   UpdateReview,
   NoticeList,
   AddNotice,
   UpdateNotice,
   StudentTable,
   TeacherTable,
   UpdatePaper,
   AddPaper,
   Chat,
   Chatstd
};
