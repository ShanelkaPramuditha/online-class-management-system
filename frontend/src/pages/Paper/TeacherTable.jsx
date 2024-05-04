import axios from 'axios';
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

function TeacherTable() {
   var TCellStyle2 = 'px-5 py-2 bg-neutral-300 text-neutral-950';
   var TCellStyle = 'px-5 py-2 bg-neutral-100 text-neutral-950';
   var DeleteButtonStyle =
      'bg-[#FF0000] hover:bg-[#850000] text-[white] font-bold my-1 py-2 px-4 rounded-md';
   var UpdateButtonStyle =
      'bg-[#0057FF] hover:bg-[#FF8500] text-[white] font-bold my-1 py-2 px-4 rounded-md me-3';
   var THeadStyle = `p-3`;

   const navigate = useNavigate();
   const [Data, setData] = useState([]);

   const UpdatePaper = _id => {
      const updatelink = `update/${_id}`;
      navigate(updatelink);
   };

   function UpdateData() {
      const url = 'http://localhost:5000/api/modelpapers';
      const config = {
         headers: {
            'x-apikey': 'API_KEY'
         },
         dataType: 'json'
      };

      axios.get(url, config).then(response => {
         setData(response.data.response);
      });
   }

   useEffect(() => {
      UpdateData();
   }, []);

   function Delete(_id) {
      const url = 'http://localhost:5000/api/deletemodelpaper/' + _id;
      axios
         .delete(url)
         .then(res => {
            console.log(res);
         })
         .catch(error => {
            console.error(error);
         });
      UpdateData();
      window.location.reload();
   }

   const RowGen = () => {
      return Data.map((Paper, index) => (
         <tr
            className="bg-[white] border-b dark:bg-gray-800 dark:border-[gray] hover:bg-silver-mist dark:hover:bg-silver-mist"
            key={index}>
            <td className={TCellStyle2}>{Paper.Des}</td>
            <td className={TCellStyle}>{Paper.Tid}</td>
            <td className={TCellStyle2}>{Paper.Pid}</td>
            <td className={TCellStyle}>{Paper.Plink}</td>
            <td className={TCellStyle2}>{Paper.Time}</td>
            <td className={TCellStyle}>{Paper.Sdate}</td>
            <td className={TCellStyle2}>{Paper.Edate}</td>
            <td className={TCellStyle}>
               <button
                  type="button"
                  className={UpdateButtonStyle}
                  onClick={() => {
                     UpdatePaper(Paper._id);
                  }}>
                  Edit Paper {Paper.Pid}
               </button>
               <button
                  type="button"
                  className={DeleteButtonStyle}
                  onClick={() => Delete(Paper._id)}>
                  Delete
               </button>
            </td>
         </tr>
      ));
   };

   return (
      <>
         <div className="body-content min-h-[calc(100vh-270px)]">
            <h4 className="font-semibold text-3xl my-5 text-center">
               Model Paper Management
            </h4>
            <button
               className="btn btn-info m-4"
               onClick={() => navigate('add')}>
               {' '}
               Add Paper
            </button>
            <div>
               <div className="relative overflow-x-auto shadow-md sm:rounded-lg">
                  <table className="w-full text-sm text-left rtl:text-right text-[gray] dark:text-[gray]">
                     <thead className="text-sm text-[white] uppercase bg-[gray] dark:bg-[#1a1947] dark:text-[white] text-center">
                        <tr>
                           <th className={THeadStyle}>Description</th>
                           <th className={THeadStyle}>Teacher ID</th>
                           <th className={THeadStyle}>Paper ID</th>
                           <th className={THeadStyle}>Link</th>
                           <th className={THeadStyle}>Time</th>
                           <th className={THeadStyle}>Start Date</th>
                           <th className={THeadStyle}>Ending Date</th>
                           <th className={THeadStyle}>Actions</th>
                        </tr>
                     </thead>
                     <tbody>
                        <RowGen />
                     </tbody>
                  </table>
               </div>
            </div>
         </div>
      </>
   );
}

export default TeacherTable;
