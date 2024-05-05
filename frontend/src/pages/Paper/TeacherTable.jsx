import axios from 'axios';
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import jsPDF from 'jspdf';
import 'jspdf-autotable';

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
   const [searchQuery, setSearchQuery] = useState('');
   const [searchOption, setSearchOption] = useState('des');

   const UpdatePaper = _id => {
      const updatelink = `update/${_id}`;
      navigate(updatelink);
   };

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
      return filteredModelPaperList.map((Paper, index) => (
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

// Report handler
async function RepGen() {
   const doc = new jsPDF();

   // Total non-student Users user.userRole === 'admin' ||
   const totalModelPaper = filteredModelPaperList.reduce((count) => {
         count++;
      return count;
   }, 0);

   // Add header
   const headerTitle = 'Exported Model Paper List';
   const headerTitleX = doc.internal.pageSize.width / 2;
   doc.setFontSize(12);
   doc.text(headerTitle, headerTitleX, 10, { align: 'center' });

   // Table header
   doc.autoTable({
      head: [
         ['Description', 'Paper ID', 'Teacher ID', 'Paper Link', 'Time Duration', 'Start Date', 'End Date']
      ],
      body: filteredModelPaperList.map(user => [
         user.Des,
         user.Pid,
         user.Tid,
         user.Plink,
         user.Time,
         new Date(user.Sdate),
         new Date(user.Edate)
      ])
   });

   let currentY = doc.autoTable.previous.finalY + 10;

   // Total Model Papers
   doc.text(`Total Model Papers: ${totalModelPaper}`, 14, currentY + 10);


   // Save the PDF
   doc.save('ModelPaperList.pdf');
}

   return (
      <>
         <div className="body-content min-h-[calc(100vh-270px)]">
            <h4 className="font-semibold text-3xl my-5 text-center">
               Model Paper Management
            </h4>
            <button
               className="btn btn-info m-4"
               onClick={() => navigate('add')}>
               Add Paper
            </button>
            <button
               className="btn btn-active m-4"
               onClick={() => RepGen()}>
               Generate Report
            </button>
            <select
               value={searchOption}
               onChange={e => {
                  setSearchOption(e.target.value);
               }}
               className="border border-gray-300 rounded-md px-3 py-1 focus:outline-none focus:border-blue-500 mr-2 h-12">
               <option value="des">By Description</option>
               <option value="pid">By Paper ID</option>
               <option value="tid">By Teacher ID</option>
               <option value="plink">By Paper Link</option>
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
