import axios from 'axios';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const AddUser = () => {
   // var TCellStyle = 'px-5 py-2 bg-neutral-300 text-neutral-950';
   //  var THeadStyle = 'px-5 py-2 bg-[#0057FF] ';
   const navigate = useNavigate();
   const [formData, setFormData] = useState({
      firstName: '',
      lastName: '',
      email: '',
      userRole: '',
      gender: '',
      mobileNumber: '',
      password: ''
   });

   const {
      firstName,
      lastName,
      email,
      userRole,
      gender,
      mobileNumber,
      password
   } = formData;

   const onChange = e => {
      setFormData(prevformData => ({
         ...prevformData,
         [e.target.name]: e.target.value
      }));
   };

   const handleAddUser = () => {
      const url = 'http://localhost:5000/api/usermain/create';

      const UserPayload = {
         fName: firstName,
         lName: lastName,
         email,
         userRole,
         gender,
         mobile: mobileNumber,
         password
      };

      console.log(UserPayload);
      axios.post(url, UserPayload).then(response => {
         console.log(response);
      });

      navigate('/students/');
   };

   return (
      <>
         <div>
            <div className="bg-neutral-400 align-middle text-center font-bold">
               User Management
            </div>
            <div className=" bg-slate-600 min-h-52 min-w-32 border-spacing-4    ">
               <div className="flex">
                  <div className=" mt-12 m-5">
                     <label className=" text-black text-3xl">First Name</label>
                     <br />
                     <br />
                     <br />
                     <label className="text-black text-3xl">Last Name</label>
                     <br />
                     <br />
                     <br />
                     <label className="text-black text-3xl">email</label>
                     <br />
                     <br />
                     <br />
                     <label className="text-black text-3xl">User Role</label>
                     <br />
                     <br />
                     <br />
                     <label className="text-black text-3xl">Gender</label>
                     <br />
                     <br />
                     <br />
                     <label className="text-black text-3xl">
                        Mobile Number
                     </label>
                     <br />
                     <br />
                     <br />
                     <label className="text-black text-3xl">Password</label>
                     <br />
                     <br />
                     <br />
                  </div>
                  <div className="bg-opacity-0 mt-8 m-5 block border-black border-3">
                     <br />
                     <input
                        onChange={onChange}
                        value={firstName}
                        name="firstName"
                        placeholder="Enter your ID Here"
                        className="border-slate-600 placeholder-zinc-950 bg-black bg-opacity-0 pb-3 border-b-4 text-3xl"
                        type="text"
                     />
                     <br />
                     <br />
                     <input
                        onChange={onChange}
                        value={lastName}
                        name="lastName"
                        placeholder="Enter your ID Here"
                        className="border-slate-600 placeholder-zinc-950 bg-black bg-opacity-0 pb-3 border-b-4 text-3xl"
                        type="text"
                     />
                     <br />
                     <br />
                     <input
                        onChange={onChange}
                        value={email}
                        name="email"
                        placeholder="Enter your ID Here"
                        className="border-slate-600 placeholder-zinc-950 bg-black bg-opacity-0 pb-3 border-b-4 text-3xl"
                        type="text"
                     />
                     <br />
                     <br />
                     <input
                        onChange={onChange}
                        value={userRole}
                        name="userRole"
                        placeholder="Enter your ID Here"
                        className="border-slate-600 placeholder-zinc-950 bg-black bg-opacity-0 pb-3 border-b-4 text-3xl"
                        type="text"
                     />
                     <br />
                     <br />
                     <input
                        onChange={onChange}
                        value={gender}
                        name="gender"
                        placeholder="Enter your ID Here"
                        className="border-slate-600 placeholder-zinc-950 bg-black bg-opacity-0 pb-3 border-b-4 text-3xl"
                        type="text"
                     />
                     <br />
                     <br />
                     <input
                        onChange={onChange}
                        value={mobileNumber}
                        name="mobileNumber"
                        placeholder="Enter your ID Here"
                        className="border-slate-600 placeholder-zinc-950 bg-black bg-opacity-0 pb-3 border-b-4 text-3xl"
                        type="text"
                     />
                     <br />
                     <br />
                     <input
                        onChange={onChange}
                        value={password}
                        name="password"
                        placeholder="Enter your ID Here"
                        className="border-slate-600 placeholder-zinc-950 bg-black bg-opacity-0 pb-3 border-b-4 text-3xl"
                        type="text"
                     />
                     <br />
                     <br />
                  </div>
               </div>
               <div className="flex text-center justify-center content-center">
                  <div className="flex w-4 bg-opacity-0"></div>
                  <div className="mb-5 flex w-44 h-14 max-w-sm  bg-gradient-to-tr from-blue-300 to-blue-600 p-0.5 shadow-lg">
                     <button
                        className="flex-1 w-44 h-14 font-bold text-xl bg-white 
                bg-opacity-45 px-6 py-3 "
                        onClick={handleAddUser}>
                        Add User
                     </button>
                  </div>
               </div>
            </div>
         </div>
      </>
   );
};

export default AddUser;
