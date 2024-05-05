import { useState } from 'react';
import axios from 'axios';

const FileUploadForm = () => {
   const [file, setFile] = useState(null);

   const handleFileChange = event => {
      setFile(event.target.files[0]);
   };

   const handleUpload = async () => {
      const formData = new FormData();
      formData.append('file', file);

      try {
         await axios.post('/api/upload', formData, {
            headers: {
               'Content-Type': 'multipart/form-data'
            }
         });
         alert('File uploaded successfully');
      } catch (error) {
         console.error('Error uploading file: ', error);
      }
   };

   return (
      <div>
         <input type="file" onChange={handleFileChange} />
         <button onClick={handleUpload}>Upload</button>
      </div>
   );
};

export default FileUploadForm;
