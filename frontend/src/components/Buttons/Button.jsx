import PropTypes from 'prop-types';
// get button text in a prop
const Button = ({ text, type, onClick }) => {
   return (
      <button
         type={type}
         onClick={onClick}
         className="bg-[#0057FF] hover:bg-[#000D85] text-[#FFFFFF] font-bold py-2 px-16 rounded-full">
         {text}
      </button>
   );
};

Button.propTypes = {
   text: PropTypes.string.isRequired,
   onClick: PropTypes.func,
   type: PropTypes.string
};

export default Button;
