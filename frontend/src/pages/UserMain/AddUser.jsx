import axios from 'axios';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

var TextStyle = 'text-black text-md mb-12';
var TextStyleErr = 'text-black text-md mb-24';
var TextBoxStyle =
   'shadow-lg border-slate-600 placeholder-zinc-950 bg-black bg-opacity-0 pb-3 text-lg';

const AddUser = () => {
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

   const validateEmail = email => {
      const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      return re.test(email);
   };

   const validateMobile = mobileNumber => {
      const re = /^\d{10}$/;
      return re.test(mobileNumber);
   };

   const validateFormData = () => {
      if (
         !firstName ||
         !lastName ||
         !email ||
         !userRole ||
         !gender ||
         !mobileNumber ||
         !password
      ) {
         alert('Please fill in all fields');
         return false;
      } else if (!validateEmail(email)) {
         alert('Please enter a valid email address');
         return false;
      } else if (!validateMobile(mobileNumber)) {
         alert('Please enter a valid 10-digit mobile number');
         return false;
      }
      return true;
   };

   const handleAddUser = () => {
      if (validateFormData()) {
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

         axios
            .post(url, UserPayload)
            .then(response => {
               console.log(response);
               navigate('/students/');
            })
            .catch(error => {
               console.error('Error adding user: ', error);
            });
      }
   };

   return (
      <div className="bg-[#ffffff] shadow-md flex items-center justify-center min-h-screen">
         <div>
            <div className="min-h-52 min-w-32 flex items-center justify-center flex-col">
               <div className="text-2xl font-bold mt-3 text-yellow-700">
                  User Management
               </div>
               <br />
               <div className="bg-[#cddddf] shadow-lg hover:bg-[#e3e6e3] transition duration-300 ease-in-out rounded-md p-6">
                  <div className="flex ">
                     <div className="mt-16 m-4">
                        <label className={TextStyle}>First Name</label>
                        <label className={TextStyle}>Last Name</label>
                        <label className={TextStyle}>Email</label>
                        <label className={TextStyle}>User Role</label>
                        <label className={TextStyle}>Gender</label>
                        <label className={TextStyle}>Mobile Number</label>
                        <label className={TextStyle}>Password</label>
                     </div>
                     <div className="bg-opacity-0 mt-8 m-5 block border-black ">
                        <br />
                        <input
                           onChange={onChange}
                           value={firstName}
                           name="firstName"
                           placeholder="Enter your first name"
                           className={TextBoxStyle}
                           type="text"
                        />
                        <br />
                        <br />
                        <input
                           onChange={onChange}
                           value={lastName}
                           name="lastName"
                           placeholder="Enter your last name"
                           className={TextBoxStyle}
                           type="text"
                        />
                        <br />
                        <br />
                        <input
                           onChange={onChange}
                           value={email}
                           name="email"
                           placeholder="  Enter your email"
                           className={TextBoxStyle}
                           type="email"
                        />
                        <br />
                        <br />
                        <select
                           onChange={onChange}
                           value={userRole}
                           name="userRole"
                           className={TextBoxStyle + 'text-black-50'}>
                           <option value="" disabled>
                              Select User Role
                           </option>
                           <option value="admin">Admin</option>
                           <option value="student">Student</option>
                           <option value="teacher">Teacher</option>
                        </select>
                        <br />
                        <br />
                        <select
                           onChange={onChange}
                           value={gender}
                           name="gender"
                           className={TextBoxStyle + 'text-black-50'}>
                           <option value="" disabled>
                              Select Gender
                           </option>
                           <option value="male">Male</option>
                           <option value="female">Female</option>
                        </select>
                        <br />
                        <br />
                        <input
                           onChange={onChange}
                           value={mobileNumber}
                           name="mobileNumber"
                           placeholder="Enter mobile number"
                           className={TextBoxStyle}
                           type="text"
                        />
                        <br />
                        <br />
                        <input
                           onChange={onChange}
                           value={password}
                           name="password"
                           placeholder="  Enter your password"
                           className={TextBoxStyle}
                           type="password"
                        />
                        <br />
                        <br />
                     </div>
                  </div>
                  <div className="flex text-center justify-center content-center ">
                     <div className="flex w-4 bg-opacity-0"></div>
                     <div className="mb-5 flex w-44 h-14 max-w-sm  bg-gradient-to-tr from-blue-300 to-blue-600 p-0.5 ">
                        <button
                           className="btn btn-info px-6"
                           onClick={handleAddUser}>
                           Add User
                        </button>
                     </div>
                  </div>
               </div>
            </div>
         </div>
      </div>
   );
};

export default AddUser;
