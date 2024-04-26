// Card.jsx
import React from 'react';
import { FaEdit } from 'react-icons/fa';
import { MdDeleteForever } from 'react-icons/md';

function Card({ title, content, link, id, onEdit, onDelete }) {
   const handleEdit = () => {
      onEdit(id);
   };

   const handleDelete = () => {
      onDelete(id);
   };

   return (
      <div className="border border-gray-300 bg-[#d2d2d2] rounded-lg p-6 mb-4 mr-4 w-100 opacity-90 relative">
         <h2 className="text-[black] text-lg font-semibold mb-5">{title}</h2>
         <p className="text-[#646464] mb-10">{content}</p>
         <p className="text-[black] mb-10">
            Class Link :
            <a
               href={link}
               target="_blank"
               rel="noopener noreferrer"
               className="text-[blue] hover:underline mb-4 block">
               {link}
            </a>
         </p>
         <div className="absolute bottom-2 right-2">
            <button
               className="btn px-6 py-2 bg-[blue] text-[white] rounded-full hover:bg-[#00008B] mr-2"
               onClick={handleEdit}>
               <div>
                  <FaEdit />
               </div>
            </button>
            <button
               className="btn px-6 py-2 bg-[red] text-[white] rounded-full hover:bg-[#8B0000]"
               onClick={handleDelete}>
               <div>
                  <MdDeleteForever />
               </div>
            </button>
         </div>
      </div>
   );
}

export default Card;
