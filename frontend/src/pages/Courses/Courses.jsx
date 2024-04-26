import CourseImg from '../../assets/images/course-page.png';
import CardImg1 from '../../assets/images/card-image-01.png';
import { Card } from '../../components';

const Courses = () => {
   return (
      <div className="relative">
         {/* Background image */}
         <img
            src={CourseImg}
            alt="course"
            className="absolute inset-0 w-full h-full object-cover opacity-50"
         />

         {/* Overlay container */}
         <div className="relative z-10 flex flex-col justify-center items-center px-12 py-10">
            <div className="grid grid-cols-4 gap-7">
               <Card
                  image={CardImg1}
                  header="Theory"
                  description="Description for Theory"
                  navTo="/theory"
               />
               <Card
                  image={CardImg1}
                  header="Revision"
                  description=""
                  navTo="/revision"
               />
               <Card
                  image={CardImg1}
                  header="Online Exam"
                  description=""
                  navTo="/allexams"
               />
               <Card
                  image={CardImg1}
                  header="Model Papers"
                  description=""
                  navTo="/modelpapers"
               />
            </div>
         </div>
      </div>
   );
};

export default Courses;
