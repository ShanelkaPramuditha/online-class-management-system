import EnrollmentCard from '../../components/Card/EnrollmentCard';
import CardImg_1 from '../../assets/images/card-image-01.png';

const Theory = () => {
   return (
      <div className="body-content">
         <div>
            <div className="font-semibold text-3xl my-10 text-center">
               Theory Classes
            </div>
         </div>
         <div className="grid grid-cols-4 gap-7  justify-items-center items-center">
            <div>
               {/* Grade 13 Class */}
               <EnrollmentCard
                  image={CardImg_1}
                  header="Grade 12"
                  description="You can aaccess grade 12 theory contents here"
                  cName="grade-12-theory"
                  price={1000}
                  offer={100}
                  pathname="/liveclassview"
                  grade={12}
               />
            </div>
            {/* Grade 13 Class */}
            <div>
               <EnrollmentCard
                  image={CardImg_1}
                  header="Grade 13"
                  description="You can aaccess grade 12 theory contents here"
                  cName="grade-13-theory"
                  price={2000}
                  offer={100}
                  pathname="/liveclassview13"
                  grade={13}
               />
            </div>
         </div>
      </div>
   );
};

export default Theory;
