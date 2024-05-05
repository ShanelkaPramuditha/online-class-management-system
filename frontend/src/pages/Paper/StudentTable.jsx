import axios from 'axios';
import { useEffect, useState } from 'react';

function TeacherTable() {
   var TCellStyle2 = 'px-5 py-2 bg-neutral-300 text-neutral-950';
   var TCellStyle = 'px-5 py-2 bg-neutral-100 text-neutral-950';
   var UpdateButtonStyle =
      'bg-[#0057FF] hover:bg-[#FF8500] text-[white] font-bold my-1 py-2 px-4 rounded-md me-3';
   var THeadStyle = `p-3`;

   const [Data, setData] = useState([]);
   const [searchQuery, setSearchQuery] = useState('');
   const [searchOption, setSearchOption] = useState('des');

   const Download = link => {
      console.log(link);
      window.location.href = link;
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

   const filteredModelPaperList = Data.filter(modelpaper => {

      switch (searchOption) {
         case 'des':
            return modelpaper.Des.toLowerCase().includes(searchQuery.toLowerCase());
         case 'pid':
            return modelpaper.Pid.toLowerCase().includes(searchQuery.toLowerCase());
         case 'tid':
            return modelpaper.Tid.toString().toLowerCase().includes(searchQuery.toLowerCase());
         case 'plink':
            return modelpaper.Plink.toLowerCase().includes(searchQuery.toLowerCase());
      }
   });

   const RowGen = () => {
      return filteredModelPaperList.map((Paper, index) => (
         <tr
            className="bg-[white] border-b dark:bg-gray-800 dark:border-[gray] hover:bg-silver-mist dark:hover:bg-silver-mist"
            key={index}>
            <td className={TCellStyle2}>{Paper.Des}</td>
            <td className={TCellStyle}>{Paper.Tid}</td>
            <td className={TCellStyle2}>{Paper.Pid}</td>
            <td className={TCellStyle2}>{Paper.Time}</td>
            <td className={TCellStyle}>{Paper.Sdate}</td>
            <td className={TCellStyle2}>{Paper.Edate}</td>
            <td className={TCellStyle}>
               <button
                  type="button"
                  className={UpdateButtonStyle}
                  onClick={() => {
                     Download(Paper.Plink);
                  }}>
                  Download Paper
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
            <div>
            <select
               value={searchOption}
               onChange={e => {
                  setSearchOption(e.target.value);
               }}
               className="border border-gray-300 rounded-md px-3 py-1 focus:outline-none focus:border-blue-500 mr-2 h-12">
               <option value="des">By Description</option>
               <option value="pid">By Paper ID</option>
               <option value="tid">By Teacher ID</option>
            </select>
            <div className="mb-5 flex justify-start">
   {(() => {
      switch (searchOption) {
         case 'des':
         case 'pid':
         case 'tid':
         case 'plink':
            return (
               <input
                  type="text"
                  value={searchQuery}
                  onChange={e => {
                     setSearchQuery(e.target.value);
                  }}
                  placeholder={`Search by ${
                     searchOption === 'des'
                        ? 'Description'
                        : searchOption === 'pid'
                        ? 'Paper ID'
                        : searchOption === 'tid'
                        ? 'Teacher ID'
                        : searchOption === 'plink'
                        ? 'Paper Link'
                        : ''
                  }...`}
                  className="border border-gray-300 rounded-md px-3 py-1 focus:outline-none focus:border-blue-500"
               />
            );
         default:
            return null;
      }
   })()}
</div>
               <div className="relative overflow-x-auto shadow-md sm:rounded-lg">
                  <table className="w-full text-sm text-left rtl:text-right text-[gray] dark:text-[gray]">
                     <thead className="text-sm text-[white] uppercase bg-[gray] dark:bg-[#1a1947] dark:text-[white] text-center">
                        <tr>
                           <th className={THeadStyle}>Description</th>
                           <th className={THeadStyle}>Teacher ID</th>
                           <th className={THeadStyle}>Paper ID</th>
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
