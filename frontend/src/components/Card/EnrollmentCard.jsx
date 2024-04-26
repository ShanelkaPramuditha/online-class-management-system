import PropTypes from 'prop-types';
import PaymentButton from '../Buttons/PymentButton';

const Card = ({
   image,
   header,
   description,
   cName,
   price,
   offer,
   pathname,
   grade
}) => {
   return (
      <div
         className={`bg-light-silver h-[calc(100vh-250px)] w-[270px] relative rounded-lg shadow-[8px_8px_20px_0px_rgba(0,0,0,0.5)] hover:shadow-[8px_8px_20px_0px_rgba(0,0,0,0.75)] hover:to-light-silver`}>
         <div className="mx-auto w-[calc((100vw/4)-100px)]">
            <img
               src={image}
               alt="Card Image"
               className="w-[calc((100vw/4)-100px)]"
            />
         </div>
         <p className="text-2xl text-center font-bold">{header}</p>
         <p className="text-center">{description}</p>
         <div className="mx-auto absolute bottom-4 left-0 right-0 flex justify-center px-10">
            <PaymentButton
               cName={cName}
               price={price}
               offer={offer}
               pathname={pathname}
               grade={grade}
            />
         </div>
      </div>
   );
};

Card.propTypes = {
   image: PropTypes.string.isRequired, // Validate 'image' prop as a required string
   header: PropTypes.string.isRequired, // Validate 'header' prop as a required string
   description: PropTypes.string.isRequired, // Validate 'description' prop as a required string
   cName: PropTypes.string.isRequired,
   price: PropTypes.number.isRequired,
   offer: PropTypes.number.isRequired,
   pathname: PropTypes.string.isRequired,
   grade: PropTypes.number.isRequired
};

export default Card;
