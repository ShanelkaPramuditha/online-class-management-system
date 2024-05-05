import TeacherDashImg from '../../../assets/images/TeacherDashboard.png';
import studentsimg from '../../../assets/images/students.png';
import liveclassimg from '../../../assets/images/liveclass.png';
import papersImg from '../../../assets/images/papers.png';
import onlineexamImg from '../../../assets/images/Onlineexams.png';
import paymentImg from '../../../assets/images/payment.png';
import Dashcard from '../../../components/Card/DashBoardCard';
import ScrollToTopButton from '../../../components/ScrollToTop';

const Dashboard = () => {
   return (
      <div className="min-h-[calc(100vh-170px)]">
         <div>
            <img
               src={TeacherDashImg}
               alt="teacher-dashboard"
               className="h-full w-full"
            />
         </div>
         <div className="flex flex-col items-center">
            <Dashcard
               imageSrc={studentsimg}
               title="Students"
               description="Manage student profiles, including registration information and personal details. Update, suspend, or delete student accounts as necessary."
               buttonText="Manage"
               to="/students"
            />
            <Dashcard
               imageSrc={papersImg}
               title="Papers"
               description="Manage past exam papers, including uploading, organizing, and editing paper details. Access and review historical exam data effortlessly."
               buttonText="Manage"
            />

            <Dashcard
               imageSrc={onlineexamImg}
               title="Online Exams"
               description="Create and manage online exam papers easily. Customize exam settings, add questions, and monitor student progress in real-time."
               buttonText="Manage"
               to="/exam"
            />
            <Dashcard
               imageSrc={liveclassimg}
               title="Live Classes"
               description="Host live classes virtually, engage with students in real-time, and deliver interactive learning experiences."
               buttonText="Manage"
               to="/liveclass"
            />
            <Dashcard
               imageSrc={paymentImg}
               title="Payments"
               description="Handle payment transactions seamlessly. Manage invoices, process payments, and track financial data efficiently."
               buttonText="Manage"
               to="/payments"
            />
         </div>
         <ScrollToTopButton />
      </div>
   );
};

export default Dashboard;
