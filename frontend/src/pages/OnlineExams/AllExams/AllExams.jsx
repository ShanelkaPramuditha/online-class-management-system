import EnrollmentCard from '../../../components/Card/EnrollmentCard';
import CardImg_1 from '../../../assets/images/card-image-01.png';

const AllExams = () => {
   return (
      <div className="body-content">
         <div className="font-semibold text-3xl my-10 text-center">
            Theory Classes
         </div>
         <div className="grid grid-cols-4 gap-7  justify-items-center items-center">
            <div>
               {/* All Exams */}
               <EnrollmentCard
                  image={CardImg_1}
                  header="All Exams"
                  description="You can aaccess online exam contents here"
                  cName="online-exams"
                  price={3000}
                  offer={300}
                  pathname="/exam/view"
                  grade={12}
               />
            </div>
         </div>
      </div>
   );
};

export default AllExams;
