import axios from 'axios';
import { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import { useParams } from 'react-router-dom';
import Swal from 'sweetalert2';

function UpdateUser() {
   var TextStyle = 'text-black text-md mb-14';
   var TextStyleErr = 'text-black text-md mb-24';
   var TextBoxStyle =
      'shadow-lg border-slate-600 mb-4 placeholder-zinc-950 bg-black bg-opacity-0 pb-3 text-lg';

   const { id } = useParams();
   const [uUser, setUUser] = useState({});

   useEffect(() => {
      axios
         .get('http://localhost:5000/api/usermain/get/' + id)
         .then(response => setUUser(response.data))
         .catch(err => console.error(err));
   }, [id]);

   const validateEmail = email => {
      const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      return re.test(email);
   };

   const validateMobile = mobileNumber => {
      const re = /^\d{10}$/;
      return re.test(mobileNumber);
   };

   const formStructure = {
      firstName: '',
      lastName: '',
      email: '',
      userRole: '',
      gender: '',
      mobileNumber: '',
      password: '',
      registerDate: ''
   };

   const [formData, setFormData] = useState(formStructure);

   const [
      firstName,
      lastName,
      email,
      userRole,
      gender,
      mobileNumber,
      password,
      registerDate
   ] = Object.values(formData);

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

   //Set User's Previous Data as default
   useEffect(() => {
      setFormData({
         firstName: uUser.firstName,
         lastName: uUser.lastName,
         email: uUser.email,
         userRole: uUser.userRole,
         gender: uUser.gender,
         mobileNumber: uUser.mobileNumber,
         password: uUser.password,
         registerDate: uUser.registerDate
      });
   }, [uUser]);

   const onChange = e => {
      setFormData(prevformData => ({
         ...prevformData,
         [e.target.name]: e.target.value
      }));
   };

   const funcUpdateUser = async () => {
      if (validateFormData()) {
         const url = 'http://localhost:5000/api/usermain/update/' + id;
         const UserPayload = {
            fName: firstName,
            lName: lastName,
            email,
            userRole,
            gender,
            mobile: mobileNumber,
            password,
            registerDate
         };

         const user = await axios.get(
            'http://localhost:5000/api/usermain/get/' + id
         );

         console.log(UserPayload);
         Swal.fire({
            title: 'Update Confirmation',
            text: `Do You Want To Update ${
               user.data.firstName + ' ' + user.data.lastName
            }`,
            icon: 'warning',
            showCancelButton: true,
            confirmButtonText: 'Yes, Update it!',
            cancelButtonText: 'No, Cancel!'
         }).then(async result => {
            if (result.isConfirmed) {
               axios
                  .put(url, UserPayload)
                  .then(response => {
                     console.log(response);
                  })
                  .catch(err => {
                     console.error('Error deleting payment:', err);
                     Swal.fire(
                        'Error!',
                        `Failed to Update ${
                           user.data.fName + ' ' + user.data.lName
                        } beacuse Error: ${err}`,
                        'error'
                     );
                  });
            }
         });
      }
   };

   return (
      <>
         <div className="bg-[#ffffff] shadow-md flex items-center justify-center min-h-screen">
            <div>
               <div className="min-h-52 min-w-32 flex items-center justify-center flex-col">
                  <div className="text-2xl font-bold mt-3 text-yellow-700">
                     Update User
                  </div>
                  <br />
                  <div className="bg-[#cddddf] shadow-lg hover:bg-[#e3e6e3] transition duration-300 ease-in-out rounded-md p-6">
                     <div className="flex">
                        <div className="mt-20 m-4 ">
                           <label className={TextStyle}>First Name</label>
                           <br />
                           <br />
                           <label className={TextStyle}>Last Name</label>
                           <br />
                           <br />
                           <label className={TextStyle}>Email</label>
                           <br />
                           <br />
                           <label className={TextStyle}>User Role</label>
                           <br />
                           <br />
                           <label className={TextStyle}>Gender</label>
                           <br />
                           <br />
                           <label className={TextStyle}>Mobile Number</label>
                           <br />
                           <br />
                           <label className={TextStyle}>Password</label>
                           <br />
                           <br />
                           <label className={TextStyle}>Register Date</label>
                        </div>
                        <div className="bg-opacity-0 mt-8 m-5 block border-black border-3 p-4">
                           <br />
                           <input
                              onChange={onChange}
                              value={firstName}
                              name="firstName"
                              placeholder="First Name"
                              className={TextBoxStyle}
                              type="text"
                           />
                           <br />
                           <br />
                           <input
                              onChange={onChange}
                              value={lastName}
                              name="lastName"
                              placeholder="Last Name"
                              className={TextBoxStyle}
                              type="text"
                           />
                           <br />
                           <br />
                           <input
                              onChange={onChange}
                              value={email}
                              name="email"
                              placeholder="Email"
                              className={TextBoxStyle}
                              type="text"
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
                              placeholder="Mobile Number"
                              className={TextBoxStyle}
                              type="text"
                           />
                           <br />
                           <br />
                           <input
                              onChange={onChange}
                              value={password}
                              name="password"
                              placeholder="Password"
                              className={TextBoxStyle}
                              type="password"
                           />
                           <br />
                           <br />
                           <input
                              onChange={onChange}
                              value={registerDate}
                              name="registerDate"
                              placeholder="Register Date"
                              className={TextBoxStyle}
                              type="text"
                           />
                           <br />
                           <br />
                           <div className="flex text-center justify-center content-center">
                              <div className="mb-5 -ms-28 mt-5 flex w-44 h-14 max-w-sm bg-gradient-to-tr from-blue-300 to-blue-600 p-0.5">
                                 <button
                                    className="btn btn-bg-danger mt-8 bg-[#FFA500] hover:bg-[#FF8500] text-[black] font-bold py-1 px-4 rounded-full me-3"
                                    onClick={funcUpdateUser}>
                                    Update User
                                 </button>
                              </div>
                           </div>
                        </div>
                     </div>
                  </div>
               </div>
            </div>
         </div>
      </>
   );
}

UpdateUser.propTypes = {
   location: PropTypes.shape({
      search: PropTypes.string.isRequired
   })
};

export default UpdateUser;
