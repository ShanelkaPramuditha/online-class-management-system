import multer from 'multer';
import path from 'path';
import fs from 'fs/promises'; // Import fs module for filesystem operations

const uploadDirectory = path.join(process.cwd(), 'src', 'uploads'); // Construct upload directory path

const storage = multer.diskStorage({
   destination: (req, file, cb) => {
      cb(null, uploadDirectory);
   },
   filename: (req, file, cb) => {
      const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1e9);
      cb(null, uniqueSuffix + path.extname(file.originalname));
   }
});

const upload = multer({ storage: storage });

export const uploadFile = async (req, res) => {
   try {
      upload.single('file')(req, res, err => {
         if (err) {
            return res.status(400).send({ error: err.message });
         }
         res.status(201).send({ msg: 'File Uploaded Successfully' });
      });
   } catch (error) {
      res.status(500).send({ error: 'Internal Server Error' });
   }
};

export const downloadFile = async (req, res) => {
   try {
      const file = path.join(uploadDirectory, req.params.filename);
      res.download(file);
   } catch (error) {
      res.status(500).send({ error: 'Internal Server Error' });
   }
};

export const deleteFile = async (req, res) => {
   try {
      const file = path.join(uploadDirectory, req.params.filename);
      await fs.unlink(file); // Use await as fs operations are asynchronous
      res.status(200).send({ msg: 'File Deleted Successfully' });
   } catch (error) {
      res.status(500).send({ error: 'Internal Server Error' });
   }
};
