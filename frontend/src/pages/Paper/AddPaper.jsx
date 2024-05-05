import { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

function TeacherForm() {
   var TextStyle = 'text-black text-xl mb-12';
   var TextStyleErr = 'text-black text-xl mb-24';
   var TextBoxStyle =
      'border-slate-600 placeholder-zinc-950 bg-black bg-opacity-0 pb-3 border-b-4 text-xl';

   const navigate = useNavigate();
   const [formData, setFormData] = useState({
      Des: '',
      Tid: '',
      Pid: '',
      Plink: '',
      Time: '',
      Sdate: '',
      Edate: ''
   });

   const [errors, setErrors] = useState({});

   const { Des, Tid, Pid, Plink, Time, Sdate, Edate } = formData;

   const addItem = () => {
      if (!validateForm()) {
         return;
      }

      const url = 'http://localhost:5000/api/createmodelpaper';
      const payload = {
         Des,
         Tid,
         Pid,
         Plink,
         Time,
         Sdate,
         Edate
      };
      console.log(payload);
      axios
         .post(url, payload)
         .then(res => {
            console.log(res);
         })
         .catch(error => {
            console.error(error);
         });
      navigate('/paper');
   };

   const onChange = e => {
      setFormData(prevformData => ({
         ...prevformData,
         [e.target.name]: e.target.value
      }));
   };

   const isValidUrl = url => {
      // Basic URL validation
      const pattern = new RegExp(
         '^(https?:\\/\\/)?' + // protocol
            '((([a-z\\d]([a-z\\d-]*[a-z\\d])*)\\.)+[a-z]{2,}|' + // domain name
            '((\\d{1,3}\\.){3}\\d{1,3}))' + // OR ip (v4) address
            '(\\:\\d+)?(\\/[-a-z\\d%_.~+]*)*' + // port and path
            '(\\?[;&a-z\\d%_.~+=-]*)?' + // query string
            '(\\#[-a-z\\d_]*)?$',
         'i'
      ); // fragment locator
      return !!pattern.test(url);
   };

   const validateForm = () => {
      let valid = true;
      const newErrors = {};

      if (!formData.Des) {
         newErrors.Des = 'Description is required';
         valid = false;
      }

      if (!formData.Tid) {
         newErrors.Tid = 'Teacher ID is required';
         valid = false;
      }

      if (!formData.Pid) {
         newErrors.Pid = 'Paper ID is required';
         valid = false;
      }

      if (!formData.Plink || !isValidUrl(formData.Plink)) {
         newErrors.Plink = 'Paper Link is required';
         valid = false;
      }

      if (!formData.Time) {
         newErrors.Time = 'Time is required';
         valid = false;
      }

      if (!formData.Sdate) {
         newErrors.Sdate = 'Starting Date is required';
         valid = false;
      }

      if (!formData.Edate) {
         newErrors.Edate = 'Ending Date is required';
         valid = false;
      }

      setErrors(newErrors);
      return valid;
   };

   return (
      <>
         <div className="flex items-center justify-center min-h-screen ">
            <div>
               <div className=" bg-gradient-to-br from-green-400 to-purple-400 min-h-52 min-w-32 border-spacing-4 flex items-center justify-center flex-col">
                  <div className="text-4xl font-bold mt-3 underline text-yellow-700">
                     ADD PAPER TO SYSTEM{' '}
                  </div>
                  <div className="flex flex-col items-center justify-center border m-4 w-[800px] rounded-xl border-seperate">
                     <div className="flex">
                        <div className="mt-14 m-5">
                           <label
                              className={errors.Des ? TextStyleErr : TextStyle}>
                              Description
                           </label>
                           <label
                              className={errors.Tid ? TextStyleErr : TextStyle}>
                              Teacher ID
                           </label>
                           <label
                              className={errors.Pid ? TextStyleErr : TextStyle}>
                              Paper ID
                           </label>
                           <label
                              className={
                                 errors.Plink ? TextStyleErr : TextStyle
                              }>
                              Paper Link
                           </label>
                           <label
                              className={
                                 errors.Time ? TextStyleErr : TextStyle
                              }>
                              Time
                           </label>
                           <label
                              className={
                                 errors.Sdate ? TextStyleErr : TextStyle
                              }>
                              Starting Date
                           </label>
                           <label
                              className={
                                 errors.Edate ? TextStyleErr : TextStyle
                              }>
                              Ending Date
                           </label>
                        </div>
                        <div className="mt-12 m-5">
                           <input
                              onChange={onChange}
                              value={Des}
                              name="Des"
                              placeholder="Enter Description Here"
                              className={TextBoxStyle}
                              type="text"
                           />
                           {errors.Des && (
                              <p className="text-red-500">{errors.Des}</p>
                           )}
                           <br />
                           <br />

                           <input
                              onChange={onChange}
                              value={Tid}
                              name="Tid"
                              placeholder="Enter your ID Here"
                              className={TextBoxStyle}
                              type="number"
                           />
                           {errors.Tid && (
                              <p className="text-red-500">{errors.Tid}</p>
                           )}
                           <br />
                           <br />

                           <input
                              onChange={onChange}
                              value={Pid}
                              name="Pid"
                              placeholder="Enter Paper ID Here"
                              className={TextBoxStyle}
                              type="text"
                           />
                           {errors.Pid && (
                              <p className="text-red-500">{errors.Pid}</p>
                           )}
                           <br />
                           <br />

                           <input
                              onChange={onChange}
                              value={Plink}
                              name="Plink"
                              placeholder="Enter Paper link Here"
                              className={TextBoxStyle}
                              type="url"
                           />
                           {errors.Plink && (
                              <p className="text-red-500">{errors.Plink}</p>
                           )}
                           <br />
                           <br />

                           <input
                              onChange={onChange}
                              value={Time}
                              name="Time"
                              placeholder="Enter time Here"
                              className={TextBoxStyle}
                              type="text"
                           />
                           {errors.Time && (
                              <p className="text-red-500">{errors.Time}</p>
                           )}
                           <br />
                           <br />

                           <input
                              onChange={onChange}
                              value={Sdate}
                              name="Sdate"
                              placeholder="Enter start date Here"
                              className={TextBoxStyle}
                              type="text"
                           />
                           {errors.Sdate && (
                              <p className="text-red-500">{errors.Sdate}</p>
                           )}
                           <br />
                           <br />

                           <input
                              onChange={onChange}
                              value={Edate}
                              name="Edate"
                              placeholder="Enter end date Here"
                              className={TextBoxStyle}
                              type="text"
                           />
                           {errors.Edate && (
                              <p className="text-red-500">{errors.Edate}</p>
                           )}
                           <br />
                           <br />
                        </div>
                     </div>
                     <div className="flex text-center justify-center content-center">
                        <div className="flex w-4 bg-opacity-0"></div>
                        <div className="mb-5 flex w-44 h-14 max-w-sm  bg-gradient-to-tr from-blue-300 to-blue-600 rounded-xl p-0.5 shadow-lg">
                           <button
                              className="btn btn-primary rounded-xl"
                              onClick={addItem}>
                              Add To List
                           </button>
                        </div>
                     </div>
                  </div>
               </div>
            </div>
         </div>
      </>
   );
}

export default TeacherForm;
