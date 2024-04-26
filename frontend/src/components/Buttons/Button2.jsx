import PropTypes from 'prop-types';

const ButtonX = ({ Details, onClickfun }) => {

   return (
      <button className="bg-[#0057FF] hover:bg-[#000D85] text-[#FFFFFF] font-bold 
      rounded-lg px-3 py-1" onClick={onClickfun}>
         {Details}
      </button>
   );
};

ButtonX.propTypes = {
   Details: PropTypes.string.isRequired,
   onClickfun: PropTypes.func
};



export default ButtonX;
