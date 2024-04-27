import TeacherDashImg from '../../../assets/images/TeacherDashboard.png';
import studentsimg from '../../../assets/images/students.png';
import paymentImg from '../../../assets/images/payment.png';
import Dashcard from '../../../components/Card/DashBoardCard';
const Dashboard = () => {
   return (
      <div>
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
               imageSrc={paymentImg}
               title="Payments"
               description="Handle payment transactions seamlessly. Manage invoices, process payments, and track financial data efficiently."
               buttonText="Manage"
               to="/payments"
            />
         </div>
      </div>
   );
};

export default Dashboard;
