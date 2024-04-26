import axios from 'axios';
import { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import { useParams } from 'react-router-dom';

function UpdateUser() {
   var TCellStyle = 'px-5 py-2 bg-neutral-300 text-neutral-950';
   var THeadStyle = 'px-5 py-2 bg-[#0057FF] ';
   var TextStyle = 'text-black text-xl';
   var TextBoxStyle =
      'border-slate-600 placeholder-zinc-950 bg-black bg-opacity-0 pb-3 border-b-4 text-3xl';

   const { id } = useParams();
   const [uUser, setUUser] = useState({});

   useEffect(() => {
      axios
         .get('http://localhost:5000/api/usermain/get/' + id)
         .then(response => setUUser(response.data))
         .catch(err => console.error(err));
   }, [id]);

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

   const funcUpdateUser = () => {
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
      console.log(UserPayload);
      axios.put(url, UserPayload).then(response => {
         console.log(response);
      });
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
                     <label className={TextStyle}>First Name</label>
                     <br />
                     <br />
                     <br />
                     <label className={TextStyle}>Last Name</label>
                     <br />
                     <br />
                     <br />
                     <label className={TextStyle}>email</label>
                     <br />
                     <br />
                     <br />
                     <label className={TextStyle}>User Role</label>
                     <br />
                     <br />
                     <br />
                     <label className={TextStyle}>Gender</label>
                     <br />
                     <br />
                     <br />
                     <label className={TextStyle}>Mobile Number</label>
                     <br />
                     <br />
                     <br />
                     <label className={TextStyle}>Password</label>
                     <br />
                     <br />
                     <br />
                     <label className={TextStyle}>Register Date</label>
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
                        className={TextBoxStyle}
                        type="text"
                     />
                     <br />
                     <br />
                     <input
                        onChange={onChange}
                        value={lastName}
                        name="lastName"
                        placeholder="Enter your ID Here"
                        className={TextBoxStyle}
                        type="text"
                     />
                     <br />
                     <br />
                     <input
                        onChange={onChange}
                        value={email}
                        name="email"
                        placeholder="Enter your ID Here"
                        className={TextBoxStyle}
                        type="text"
                     />
                     <br />
                     <br />
                     <input
                        onChange={onChange}
                        value={userRole}
                        name="userRole"
                        placeholder="Enter your ID Here"
                        className={TextBoxStyle}
                        type="text"
                     />
                     <br />
                     <br />
                     <input
                        onChange={onChange}
                        value={gender}
                        name="gender"
                        placeholder="Enter your ID Here"
                        className={TextBoxStyle}
                        type="text"
                     />
                     <br />
                     <br />
                     <input
                        onChange={onChange}
                        value={mobileNumber}
                        name="mobileNumber"
                        placeholder="Enter your ID Here"
                        className={TextBoxStyle}
                        type="text"
                     />
                     <br />
                     <br />
                     <input
                        onChange={onChange}
                        value={password}
                        name="password"
                        placeholder="Enter your ID Here"
                        className={TextBoxStyle}
                        type="text"
                     />
                     <br />
                     <br />
                     <input
                        onChange={onChange}
                        value={registerDate}
                        name="registerDate"
                        placeholder="Enter your ID Here"
                        className={TextBoxStyle}
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
                        className="flex-1 w-44 h-14 font-bold text-xl bg-white bg-opacity-45 px-6 py-3 "
                        onClick={funcUpdateUser}>
                        Update User
                     </button>
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
