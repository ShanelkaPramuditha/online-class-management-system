import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { useEffect, useState } from 'react';
import jsPDF from 'jspdf';
import 'jspdf-autotable';
import QRCode from 'qrcode.react';

var TCellStyle = 'px-5 py-2 bg-neutral-300 text-neutral-950';
var TCellStyle2 = 'px-5 py-2 bg-neutral-100 text-neutral-950';
var RedButtonStyle =
   'bg-[#FF0000] hover:bg-[#850000] text-[white] font-bold py-2 px-4 rounded-md';
var THeadStyle = `p-3`;

export default function UserMain() {
   const navigate = useNavigate();
   const [Data, setData] = useState([]);
   const [searchQuery, setSearchQuery] = useState('');
   const [searchOption, setSearchOption] = useState('');
   function AddUser() {
      navigate('/students/AddUser');
   }

   const UpdateUser = _id => {
      navigate('/students/updateUser/' + _id);
   };

   function HandleViewMore() {}

   function UpdateData() {
      const url = 'http://localhost:5000/api/usermain/getall';

      axios.get(url).then(response => {
         setData(response.data);
      });
   }

   useEffect(() => {
      UpdateData();
   }, []);

   function DeleteUser(_id) {
      const url = 'http://localhost:5000/api/usermain/delete/' + _id;

      const payload = {
         _id
      };
      console.log(payload);
      axios
         .delete(url, payload)
         .then(res => {
            UpdateData();
            console.log(res);
         })
         .catch(error => {
            console.log(error);
         });
      window.location.reload;
   }

   function ChangeRole(index) {
      if (Data[index].userRole === 'teacher') {
         UpdateRole('student', index);
      } else if (Data[index].userRole === 'student') {
         console.log('Test');
         UpdateRole('teacher', index);
      }
   }

   async function UpdateRole(Role, index) {
      const _id = Data[index]._id;
      const url = 'http://localhost:5000/api/usermain/update/' + _id;

      const UserPayload = {
         _id,
         userRole: Role
      };

      await axios.put(url, UserPayload).then(response => {
         console.log(response);
      });

      console.log(UserPayload);
      window.location.reload;
   }

   const filteredUserList = Data.filter(user => {
      const fullname = user.firstName + user.lastName;
      var searchDate = new Date(searchQuery);
      var userDate = new Date(user.registerDate);
      switch (searchOption) {
         case 'name':
            return fullname.toLowerCase().includes(searchQuery.toLowerCase());
         case 'gender':
            return user.gender.toLowerCase() === searchQuery.toLowerCase();
         case 'email':
            return user.email.toLowerCase().includes(searchQuery.toLowerCase());
         case 'role':
            return user.userRole
               .toLowerCase()
               .includes(searchQuery.toLowerCase());
         case 'mobile':
            return user.mobileNumber.includes(searchQuery);
         case 'datebefore':
            return userDate < searchDate;
         case 'dateafter':
            return userDate > searchDate;
         default:
            return true;
      }
   });

   const RowGen = () => {
      return filteredUserList.map((user, index) => (
         <tr
            key={index}
            className="bg-[white] border-b dark:bg-gray-800 dark:border-[gray] hover:bg-silver-mist dark:hover:bg-silver-mist">
            <td className={TCellStyle}>{user.firstName}</td>
            <td className={TCellStyle2}>{user.lastName}</td>
            <td className={TCellStyle}>{user.email}</td>
            <td className="px-6 py-4">
               <div
                  className={`${
                     user.userRole === 'student'
                        ? 'badge bg-[#0077ff] text-[white] py-3'
                        : user.userRole === 'teacher'
                        ? 'badge bg-[#237971] text-[white] py-3'
                        : user.userRole === 'admin'
                        ? 'badge bg-[#551717] text-[white] py-3'
                        : 'badge bg-[#0077ff] text-[white] py-3'
                  }`}>
                  {user.userRole}
               </div>
            </td>
            <td className={TCellStyle}>{user.gender}</td>
            <td className={TCellStyle2}>{user.mobileNumber}</td>

            <td className={TCellStyle}>
               {new Date(user.registerDate).getFullYear()}/
               {String(new Date(user.registerDate).getMonth() + 1).padStart(
                  2,
                  '0'
               )}
               /{String(new Date(user.registerDate).getDate()).padStart(2, '0')}
            </td>

            <td className="px-6 py-4">
               <div className="">
                  {/* View Button */}
                  <button
                     onClick={() => HandleViewMore(user._id)}
                     className="bg-[#664b1a] hover:bg-[#000D85] text-[white] font-bold my-1 py-2 px-4 rounded-md me-3">
                     More Info
                  </button>
                  {/* Update Button */}
                  <button
                     onClick={() => UpdateUser(user._id)}
                     className="bg-[#0057FF] hover:bg-[#FF8500] text-[white] font-bold my-1 py-2 px-4 rounded-md me-3">
                     Update
                  </button>
                  {/* Delete Button */}
                  <button
                     onClick={() => DeleteUser(user._id)}
                     className="bg-[#FF0000] hover:bg-[#850000] text-[white] font-bold my-1 py-2 px-4 rounded-md">
                     Delete
                  </button>
                  {/* Change Role Button */}
                  {user.userRole === 'student' ? (
                     <button
                        className="bg-[#551717] hover:bg-[#311212] text-[white] my-1 ml-3 py-2 px-4 rounded-md "
                        onClick={() => ChangeRole(index)}>
                        Promote To Teacher
                     </button>
                  ) : user.userRole === 'teacher' ? (
                     <button
                        className="bg-[#237971] hover:bg-[#0b2220] text-[white] my-1 ml-3 py-2 px-4 rounded-md "
                        onClick={() => ChangeRole(index)}>
                        Demote To Student
                     </button>
                  ) : null}
               </div>
            </td>
         </tr>
      ));
   };

   // Report handler
   async function RepGen() {
      const doc = new jsPDF();

      // Calculate total Students
      const totalStudents = filteredUserList.reduce((count, user) => {
         if (user.userRole === 'student') {
            count++;
         }
         return count;
      }, 0);

      // Total non-student Users user.userRole === 'admin' ||
      const totalTeachers = filteredUserList.reduce((count, user) => {
         if (user.userRole === 'teacher') {
            count++;
         }
         return count;
      }, 0);

      const totalAdmins = filteredUserList.reduce((count, user) => {
         if (user.userRole === 'admin') {
            count++;
         }
         return count;
      }, 0);

      // Add header
      const headerTitle = 'Exported User List';
      const headerTitleX = doc.internal.pageSize.width / 2;
      doc.setFontSize(12);
      doc.text(headerTitle, headerTitleX, 10, { align: 'center' });

      // Table header
      doc.autoTable({
         head: [
            ['User Name', 'Email', 'Role', 'Gender', 'Mobile', 'Reg. Date']
         ],
         body: filteredUserList.map(user => [
            user.firstName + ' ' + user.lastName,
            user.email,
            user.userRole,
            user.gender,
            user.mobileNumber,
            new Date(user.registerDate)
         ])
      });

      let currentY = doc.autoTable.previous.finalY + 10;

      // Total Students
      doc.text(`Total Students: ${totalStudents}`, 14, currentY + 10);

      // Total Teachers
      doc.text(`Total Teachers: ${totalTeachers}`, 14, currentY + 20);

      // Total Admins
      doc.text(`Total Admins: ${totalAdmins}`, 14, currentY + 30);

      // Save the PDF
      doc.save('Admin-UserReport.pdf');
   }

   return (
      <div className="body-content min-h-[calc(100vh-270px)]">
         <h4 className="font-semibold text-3xl my-5 text-center">
            User Management
         </h4>

         {/* Add User And Report Generation Button */}
         <div className="flex justify-end mb-5">
            <button
               onClick={AddUser}
               className="bg-[#1a1947] hover:bg-[#000D85] text-[white] font-bold  mr-4 py-2 px-6 rounded-full">
               Add User Manually
            </button>
            <button
               onClick={RepGen}
               className="bg-[#2f0e33] hover:bg-[#180913] text-[white] font-bold py-2 px-6 rounded-full">
               Generate Report
            </button>
         </div>

         {/* Search Input */}
         <div className="mb-5 flex justify-start">
            <label className="p-2 text-lg">Filter</label>
            <QRCode value={Data} />
            <select
               value={searchOption}
               onChange={e => setSearchOption(e.target.value)}
               className="border border-gray-300 rounded-md px-3 py-1 focus:outline-none focus:border-blue-500 mr-2">
               <option value="name">By Name</option>
               <option value="gender">By Gender</option>
               <option value="email">By Email</option>
               <option value="role">By Role</option>
               <option value="mobile">By Mobile</option>
               <option value="datebefore">By Date Before</option>
               <option value="dateafter">By Date After</option>
            </select>

            <div className="mb-5 flex justify-start">
               {(() => {
                  switch (searchOption) {
                     case 'name':
                     case 'mobile':
                     case 'email':
                        return (
                           <input
                              type="text"
                              value={searchQuery}
                              onChange={e => setSearchQuery(e.target.value)}
                              placeholder={`Search by ${
                                 searchOption === 'name'
                                    ? 'student name'
                                    : searchOption
                              }...`}
                              className="border border-gray-300 rounded-md px-3 py-1 focus:outline-none focus:border-blue-500"
                           />
                        );
                     case 'gender':
                        return (
                           <div>
                              <label>
                                 <input
                                    type="radio"
                                    name="gender"
                                    value="male"
                                    checked={searchQuery === 'male'}
                                    onChange={() => setSearchQuery('male')}
                                 />
                                 Male
                              </label>
                              <label>
                                 <input
                                    type="radio"
                                    name="gender"
                                    value="female"
                                    checked={searchQuery === 'female'}
                                    onChange={() => setSearchQuery('female')}
                                 />
                                 Female
                              </label>
                           </div>
                        );
                     case 'role':
                        return (
                           <div>
                              <label>
                                 <input
                                    type="radio"
                                    name="role"
                                    value="student"
                                    checked={searchQuery === 'student'}
                                    onChange={() => setSearchQuery('student')}
                                 />
                                 Student
                              </label>
                              <label>
                                 <input
                                    type="radio"
                                    name="role"
                                    value="teacher"
                                    checked={searchQuery === 'teacher'}
                                    onChange={() => setSearchQuery('teacher')}
                                 />
                                 Teacher
                              </label>
                              <label>
                                 <input
                                    type="radio"
                                    name="role"
                                    value="admin"
                                    checked={searchQuery === 'admin'}
                                    onChange={() => setSearchQuery('admin')}
                                 />
                                 Admin
                              </label>
                           </div>
                        );
                     case 'datebefore':
                     case 'dateafter':
                        return (
                           <input
                              type="date"
                              value={searchQuery}
                              onChange={e => setSearchQuery(e.target.value)}
                              className="border border-gray-300 rounded-md px-3 py-1 focus:outline-none focus:border-blue-500"
                           />
                        );
                     default:
                        return null;
                  }
               })()}
            </div>
         </div>
         <div className="relative overflow-x-auto shadow-md sm:rounded-lg">
            <table className="w-full text-sm text-left rtl:text-right text-[gray] dark:text-[gray]">
               <thead className="text-sm text-[white] uppercase bg-[gray] dark:bg-[#1a1947] dark:text-[white] text-center">
                  <tr>
                     <th className={THeadStyle}>First Name</th>
                     <th className={THeadStyle}>Last Name</th>
                     <th className={THeadStyle}>Email</th>
                     <th className={THeadStyle}>User Role</th>
                     <th className={THeadStyle}>Gender</th>
                     <th className={THeadStyle}>Mobile Number</th>
                     <th className={THeadStyle}>Register Date</th>
                     <th className={THeadStyle}>Actions</th>
                  </tr>
               </thead>
               <tbody className="text-center">
                  <RowGen />
               </tbody>
            </table>
         </div>
      </div>
   );
}
