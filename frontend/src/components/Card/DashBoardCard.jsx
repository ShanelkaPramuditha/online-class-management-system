import React from 'react';
import { Link } from 'react-router-dom';

function DashCard({ imageSrc, title, description, buttonText, to }) {
   return (
      <div className="flex flex-row bg-[white] rounded shadow p-4 m-6 w-[calc(100vw-500px)] bg-[white]t-silver relative rounded-lg shadow-[8px_8px_20px_0px_rgba(0,0,0,0.5)] hover:shadow-[8px_8px_20px_0px_rgba(0,0,0,0.75)] hover:to-light-silver">
         <img
            className="w-1/3 object-cover rounded-l-md"
            src={imageSrc}
            alt={title}
         />
         <div className="flex-grow px-4 align-center">
            <h3 className="text-lg mb-2 font-bold">{title}</h3>
            <p className="text-gray-700">{description}</p>
            <Link to={to}>
               <button className="bg-[#3f86ff] hover:bg-[#364099] shadow-lg text-[white] font-bold py-2 px-4 rounded transition duration-300 ease-in-out transform hover:scale-105 m-6">
                  {buttonText}
               </button>
            </Link>
         </div>
      </div>
   );
}

export default DashCard;
