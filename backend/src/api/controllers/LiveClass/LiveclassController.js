import { ZodError } from 'zod';
import multer from 'multer';
import LIVECLASS from '../../models/liveSessions.js';
import {
   createLiveSchema,
   editLiveSchema
} from '../../validations/live-class.validations.js';

// Multer configuration
const upload = multer({ dest: './src/uploads/' }); // specify the upload folder

// Controller to create a new Class Session
export async function createLive(req, res) {
   const sessionName = req.body.sessionName;
   const grade = req.body.grade;
   const sessiontime = req.body.sessiontime;
   const description = req.body.description;
   const link = req.body.link;

   try {
      // Validate the session editLiveSchema
      const data = createLiveSchema.safeParse(req.body);
      if (data.error) {
         return res.status(400).json({ error: data.error.message });
      }

      let fileName = '';
      // Check if file exists in request
      if (req.file) {
         fileName = req.file.filename;
         console.log(fileName);
      }

      const liveclass = new LIVECLASS({
         sessionName,
         grade,
         sessiontime,
         description,
         link,
         fileName // save the filename to your MongoDB schema
      });
      await liveclass.save();

      res.status(200).json({ message: 'Session Created Successfully' });
   } catch (error) {
      if (error instanceof ZodError) {
         // Send a 400 response if the request body is invalid
         res.status(400).send(error.errors);
      } else {
         // Send a 500 response for other types of errors
         res.status(500).send({
            message: 'Failed to create a session. Please try again later.',
            error: error.message
         });
      }
   }
}

// Get all live sessions
export async function getSession(req, res) {
   try {
      const sessions = await LIVECLASS.find({});
      res.status(200).json(sessions);
   } catch (error) {
      res.status(500).json({ error: 'Failed to retrieve sessions.' });
   }
}

// Get a session
export async function getASession(req, res) {
   try {
      const { id } = req.params;
      const session = await LIVECLASS.findById(id);
      res.status(200).json(session);
   } catch (error) {
      res.status(500).json({ error: 'Failed to retrieve sessions.' });
   }
}

// Controller to edit a Class Session
export async function editLive(req, res) {
   const { sessionName, grade, sessiontime, description, link } = req.body;
   const { id } = req.params;

   try {
      // Validate the session editLiveSchema
      const data = editLiveSchema.safeParse(req.body);
      if (data.error) {
         return res.status(400).json({ error: data.error.message });
      }
      const updateFields = {};
      if (sessionName !== undefined) {
         updateFields.sessionName = sessionName;
      }
      if (grade !== undefined) {
         updateFields.grade = grade;
      }
      if (sessiontime !== undefined) {
         updateFields.sessiontime = sessiontime;
      }
      if (description !== undefined) {
         updateFields.description = description;
      }
      if (link !== undefined) {
         updateFields.link = link;
      }

      // Check id is available
      const response = await LIVECLASS.findById(id);

      if (!response) {
         return res.status(400).json({ error: 'Session not found.' });
      }

      const updateData = await LIVECLASS.findByIdAndUpdate(id);

      updateData.sessionName = sessionName;
      updateData.grade = grade;
      updateData.sessiontime = sessiontime;
      updateData.description = description;
      updateData.link = link;
      updateData.save();
      res.status(200).json({
         message: 'Session updated successfully.',
         data: updateData
      });
   } catch (error) {
      console.log(error);
      res.status(500).json({ error: 'Failed to update Session.' });
   }
}

// Controller to delete Live class Session
export async function deleteLive(req, res) {
   const { id } = req.params;

   try {
      // Find Session to be deleted
      const LiveToDelete = await LIVECLASS.findById(id);

      if (!LiveToDelete) {
         res.status(404).json({
            message: 'Live Session deleted successfully.'
         });
      }

      // Delete Live Session
      await LIVECLASS.findByIdAndDelete(id);

      res.json({ message: 'Live Session deleted successfully.' });
   } catch (error) {
      console.log(error);
      res.status(500).json({ error: 'Failed to delete Live Session.' });
   }
}

// Get a session (using grades)
export async function getAGrade(req, res) {
   try {
      const { grade } = req.params;
      const session = await LIVECLASS.find(grade);
      res.status(200).json(session);
   } catch (error) {
      res.status(500).json({ error: 'Failed to retrieve sessions.' });
   }
}
