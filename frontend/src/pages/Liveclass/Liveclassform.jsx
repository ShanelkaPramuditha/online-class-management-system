import { useState } from 'react';
import { createLive } from '../../api/liveclassAPI.js';
import backgroundImage from '../../assets/images/LiveclassformBG.png';

function LiveClassForm() {
   const [sessionName, setSessionName] = useState('');
   const [sessiontime, setSessionTime] = useState('');
   const [description, setDescription] = useState('');
   const [link, setLink] = useState('');
   const [file, setFile] = useState(null); // New state for file

   const [error, setError] = useState('');

   const handleSessionName = e => {
      setSessionName(e.target.value);
      setError('');
   };

   const handleSessionTime = e => {
      setSessionTime(e.target.value);
      setError('');
   };

   const handleDescription = e => {
      setDescription(e.target.value);
      setError('');
   };

   const handleLink = e => {
      setLink(e.target.value);
      setError('');
   };

   const handleFileChange = e => {
      setFile(e.target.files[0]);
      setError('');
   };

   const handleSubmit = async e => {
      e.preventDefault();
      if (!sessionName.trim() && !sessiontime.trim() && !link.trim()) {
         setError('Topic, Time Duration, and Class Link are required.');
         return;
      }
      try {
         const formData = new FormData();
         formData.append('sessionName', sessionName);
         formData.append('sessiontime', sessiontime);
         formData.append('description', description);
         formData.append('link', link);
         if (file) {
            formData.append('file', file);
         }

         // Create a new session
         const response = await createLive(formData);
         console.log(response);
         window.location.href = '/liveclass';
      } catch (error) {
         console.error('Failed to create a Session:', error);
         setError('Failed to create a Session. Please try again.');
      }
   };

   return (
      <div
         className="flex items-center justify-center h-screen bg-white mt-1 mb-1"
         style={{
            backgroundImage: `url(${backgroundImage})`,
            backgroundSize: 'cover',
            backgroundPosition: 'center',
            opacity: '1'
         }}>
         {/* Left Section: Text "Create New Live Class Session" */}
         <div className="text-[#ABB0B8] p-6 mr-4 flex-grow max-w-xs">
            <h2 className="text-7xl font-bold">
               Create New <br />
               Live Class Session
            </h2>
         </div>

         {/* Right Section: Card with Input Fields */}
         <div className="flex-shrink-0 w-full max-w-md bg-[#ABB0B8] shadow-lg rounded-lg opacity-90 overflow-hidden">
            <div className="p-6">
               <form onSubmit={handleSubmit}>
                  <div className="mb-4">
                     <label
                        className="block text-[#36454F] text-sm font-bold mb-2"
                        htmlFor="sessionName">
                        Topic
                     </label>
                     <input
                        className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                        id="sessionName"
                        type="text"
                        placeholder="Topic"
                        value={sessionName}
                        onChange={handleSessionName}
                     />
                  </div>
                  <div className="mb-4">
                     <label
                        className="block text-[#36454F] text-sm font-bold mb-2"
                        htmlFor="sessiontime">
                        Time Duration
                     </label>
                     <input
                        className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                        id="sessiontime"
                        type="text"
                        placeholder="Time"
                        value={sessiontime}
                        onChange={handleSessionTime}
                     />
                  </div>
                  <div className="mb-6">
                     <label
                        className="block text-[#36454F] text-sm font-bold mb-2"
                        htmlFor="description">
                        Description
                     </label>
                     <input
                        className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                        id="description"
                        type="text"
                        placeholder="Description"
                        value={description}
                        onChange={handleDescription}
                     />
                  </div>
                  <div className="mb-4">
                     <label
                        className="block text-[#36454F] text-sm font-bold mb-2"
                        htmlFor="link">
                        Link
                     </label>
                     <input
                        className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                        id="link"
                        type="text"
                        placeholder="Link"
                        value={link}
                        onChange={handleLink}
                     />
                  </div>
                  {/* File input field */}
                  <div className="mb-4">
                     <label
                        className="block text-[#36454F] text-sm font-bold mb-2"
                        htmlFor="file">
                        File
                     </label>
                     <input
                        className="shadow appearance-none border rounded w-full py-2 px-3 text-[#36454F] leading-tight focus:outline-none focus:shadow-outline"
                        id="file"
                        type="file"
                        onChange={handleFileChange}
                     />
                  </div>
                  {error && <p className="text-[red] text-sm mb-4">{error}</p>}

                  <div className="flex justify-end">
                     <button
                        type="submit"
                        className="btn bg-[blue] hover:bg-[#00008B] text-[white] font-bold py-2 px-4 rounded">
                        Next
                     </button>
                  </div>
               </form>
            </div>
         </div>
      </div>
   );
}

export default LiveClassForm;
