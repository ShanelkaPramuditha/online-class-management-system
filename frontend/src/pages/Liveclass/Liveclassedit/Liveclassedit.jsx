import React, { useState, useEffect } from 'react';
import { editLive, getASessions } from '../../../api/liveclassAPI.js';
import { useParams } from 'react-router-dom';
import backgroundImage from '../../../assets/images/LiveclasseditBG.png';

function LiveClassEdit() {
   const { id } = useParams();
   const [session, setSession] = useState({});
   const [error, setError] = useState('');
   const [validationErrors, setValidationErrors] = useState({});

   useEffect(() => {
      const fetchSession = async () => {
         try {
            const response = await getASessions(id);
            setSession(response.data);
         } catch (error) {
            console.error('Failed to fetch session:', error);
            setError('Failed to fetch session. Please try again.');
         }
      };

      fetchSession();
   }, [id]);

   const handleChange = e => {
      const { name, value } = e.target;
      setSession(prevSession => ({
         ...prevSession,
         [name]: value
      }));
      setValidationErrors({
         ...validationErrors,
         [name]: ''
      });
      setError('');
   };

   const handleSubmit = async e => {
      e.preventDefault();
      let errors = {};

      // Validation
      if (!session.sessionName || session.sessionName.trim() === '') {
         errors.sessionName = 'Please enter a topic.';
      }
      if (!session.sessiontime || session.sessiontime.trim() === '') {
         errors.sessiontime = 'Please enter the time duration.';
      }
      if (!session.description || session.description.trim() === '') {
         errors.description = 'Please enter a description.';
      }
      if (!session.link || session.link.trim() === '') {
         errors.link = 'Please enter a link.';
      } else if (!/^https?:\/\/\S+$/.test(session.link.trim())) {
         errors.link = 'Please enter a valid URL.';
      }

      if (Object.keys(errors).length > 0) {
         setValidationErrors(errors);
         return;
      }

      try {
         const response = await editLive(id, session);
         console.log(response);
         window.location.href = '/liveclass';
      } catch (error) {
         console.error('Failed to update session:', error);
         setError('Failed to update session. Please try again.');
      }
   };

   return (
      <div
         className="flex items-center justify-center h-screen bg-white"
         style={{
            backgroundImage: `url(${backgroundImage})`,
            backgroundSize: 'cover',
            backgroundPosition: 'center',
            opacity: '1'
         }}>
         <div className="text-gray-600 p-6 mr-4 flex-grow max-w-xs opacity-90">
            <h2 className="text-7xl font-bold">
               Edit <br />
               Live Class Session
            </h2>
         </div>

         <div className="flex-shrink-0 w-full max-w-md bg-[#ABB0B8] shadow-lg rounded-lg overflow-hidden opacity-85">
            <div className="p-6">
               <form onSubmit={handleSubmit}>
                  <div className="mb-4">
                     <label
                        className="block text-[#36454F] text-sm font-bold mb-2"
                        htmlFor="sessionName">
                        Topic
                     </label>
                     <input
                        className={`shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline ${
                           validationErrors.sessionName && 'border-red-500'
                        }`}
                        id="sessionName"
                        name="sessionName"
                        type="text"
                        placeholder="Topic"
                        value={session.sessionName || ''}
                        onChange={handleChange}
                     />
                     {validationErrors.sessionName && (
                        <span className="text-red-500 text-sm">
                           {validationErrors.sessionName}
                        </span>
                     )}
                  </div>
                  <div className="mb-4">
                     <label
                        className="block text-[#36454F] text-sm font-bold mb-2"
                        htmlFor="sessiontime">
                        Time Duration
                     </label>
                     <input
                        type="datetime-local"
                        id="sessiontime"
                        name="sessiontime"
                        value={session.sessiontime || ''}
                        onChange={handleChange}
                     />
                     {/* <input
                        className={`shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline ${
                           validationErrors.sessiontime && 'border-red-500'
                        }`}
                        id="sessiontime"
                        name="sessiontime"
                        type="text"
                        placeholder="Time"
                        value={session.sessiontime || ''}
                        onChange={handleChange}
                     /> */}
                     {validationErrors.sessiontime && (
                        <span className="text-red-500 text-sm">
                           {validationErrors.sessiontime}
                        </span>
                     )}
                  </div>
                  <div className="mb-6">
                     <label
                        className="block text-[#36454F] text-sm font-bold mb-2"
                        htmlFor="description">
                        Description
                     </label>
                     <input
                        className={`shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline ${
                           validationErrors.description && 'border-red-500'
                        }`}
                        id="description"
                        name="description"
                        type="text"
                        placeholder="Description"
                        value={session.description || ''}
                        onChange={handleChange}
                     />
                     {validationErrors.description && (
                        <span className="text-red-500 text-sm">
                           {validationErrors.description}
                        </span>
                     )}
                  </div>
                  <div className="mb-4">
                     <label
                        className="block text-[#36454F] text-sm font-bold mb-2"
                        htmlFor="link">
                        Link
                     </label>
                     <input
                        className={`shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline ${
                           validationErrors.link && 'border-red-500'
                        }`}
                        id="link"
                        name="link"
                        type="text"
                        placeholder="Link"
                        value={session.link || ''}
                        onChange={handleChange}
                     />
                     {validationErrors.link && (
                        <span className="text-dark-red text-sm">
                           {validationErrors.link}
                        </span>
                     )}
                  </div>
                  {error && (
                     <p className="text-red-500 text-sm mb-4">{error}</p>
                  )}

                  <div className="flex justify-end">
                     <button
                        type="submit"
                        className="bg-[blue] hover:bg-[#00008B] text-[white] font-bold py-2 px-4 rounded-full">
                        Save Changes
                     </button>
                  </div>
               </form>
            </div>
         </div>
      </div>
   );
}

export default LiveClassEdit;
