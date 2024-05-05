import { useState, useEffect } from 'react';
import axios from 'axios';
import { useParams, useNavigate } from 'react-router-dom';

function UpdatePaper() {
   var TextStyle = 'text-black text-xl mb-12';
   var TextStyleErr = 'text-black text-xl mb-24';
   var TextBoxStyle =
      'border-slate-600 placeholder-zinc-950 bg-black bg-opacity-0  border-b-4 text-xl';
   const navigate = useNavigate();
   const { id } = useParams();

   useEffect(() => {
      axios
         .get('http://localhost:5000/api/modelpaper/' + id)
         .then(response => {
            setFormData(response.data.response);
         })
         .catch(err => console.error(err));
   }, [id]);

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
         newErrors.Plink = 'Valid Paper Link is required';
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

   const updateData = async () => {
      if (!validateForm()) {
         return;
      }

      const url = 'http://localhost:5000/api/updatemodelpaper/' + id;
      const payload = {
         Des: formData.Des,
         Tid: formData.Tid,
         Pid: formData.Pid,
         Plink: formData.Plink,
         Time: formData.Time,
         Sdate: formData.Sdate,
         Edate: formData.Edate
      };
      console.log(payload);
      await axios
         .put(url, payload)
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

   return (
      <>
         <div className="body-content min-h-[calc(100vh-270px)] flex justify-center items-center">
            <div className="border border-gray-300 p-8 rounded-lg">
               <div className="font-semibold text-3xl my-5 text-center">
                  Update Model Paper
               </div>
               <div>
                  <div className="mb-5 flex justify-start">
                     <div className="flex">
                        <div className="mt-12 m-5">
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
                        <div className=" mt-8 m-5 block border-black border-3">
                           <br />
                           <input
                              onChange={onChange}
                              value={formData.Des}
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
                              value={formData.Tid}
                              name="Tid"
                              placeholder="Enter Teacher ID Here"
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
                              value={formData.Pid}
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
                              value={formData.Plink}
                              name="Plink"
                              placeholder="Enter Paper Link Here"
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
                              value={formData.Time}
                              name="Time"
                              placeholder="Enter Time Here"
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
                              value={formData.Sdate}
                              name="Sdate"
                              placeholder="Enter Starting Date Here"
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
                              value={formData.Edate}
                              name="Edate"
                              placeholder="Enter Ending Date Here"
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
                  </div>
                  <div className="flex text-center justify-center content-center">
                     <button className="btn btn-info" onClick={updateData}>
                        Update
                     </button>
                  </div>
               </div>
            </div>
         </div>
      </>
   );
}

export default UpdatePaper;
