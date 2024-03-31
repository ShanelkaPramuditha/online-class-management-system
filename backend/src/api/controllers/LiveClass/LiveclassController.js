import LIVECLASS from "../../models/liveSessions.js";

// Controller to create a new Class Session
export async function createLive(req, res) {
    const sessionName = req.body.sessionName;
    const sessionTime = req.body.sessionTime
    const description = req.body.description;
    const link = req.body.link;
 
    try {
       const liveclass = new LIVECLASS({ sessionName, sessionTime, description, link });
       await liveclass.save();
 
       res.status(200).json({ massage: 'Session Created Successfully'});
    } catch (error) {
       res.status(500).json({ error: 'Faild To Create A Session.' });
    }
 }

 // Controller to edit a Class Session
export async function editLive(req, res) {
    const { sessionId, sessionName, sessionTime, description, link } = req.body;
 
    try {
       const updateFields = {};
       if (sessionName !== undefined) {
          updateFields.sessionName = sessionName;
       }
       if (sessionTime !== undefined) {
          updateFields.sessionTime = sessionTime;
       }
       if (description !== undefined) {
        updateFields.description = description;
        }
        if (link !== undefined) {
            updateFields.link = link;
         }
 
       const liveclass = await LIVECLASS.findByIdAndUpdate(sessionId, updateFields, {
          new: true
       });
 
       if (!liveclass) {
          return res.status(404).json({ error: 'Session not found.' });
       }
       res.json({ message: 'Session updated successfully.' });
    } catch (error) {
       console.log(error);
       res.status(500).json({ error: 'Failed to update Session.' });
    }
 }

 // Controller to delete Live class Session
export async function deleteLive(req, res) {
    const id = req.body.id;
 
    try {
       // Find Session to be deleted
       const LiveToDelete = await LIVECLASS.findById(id);
 
       if (!LiveToDelete) {
          res.status(404).json({ message: 'Live Session deleted successfully.' });
       }
 
       // Delete Live Session
       await LIVECLASS.findByIdAndDelete(id);
 
       res.json({ message: 'Live Session deleted successfully.' });
    } catch (error) {
       console.log(error);
       res.status(500).json({ error: 'Failed to delete Live Session.' });
    }
 }