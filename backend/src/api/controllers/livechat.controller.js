import MSG from '../models/messages.js';
import Users from '../models/User.model.js';

export const postmessages = async (req, res) => {
   try {
      const { senderId, message } = req.body;
      const newMessage = new MSG({ senderId, message });
      console.log(`senderId`, senderId);
      await newMessage.save();
      res.status(200).send('Message sending is successful');
   } catch (error) {
      console.error('error:', error);
   }
};

export const getdetails = async (req, res) => {
   try {
      //   const senderid = req.params.senderId;
      const mesg = await MSG.find();
      // console.log(`mesg`, mesg);
      const messages = await Promise.all(
         mesg.map(async m => {
            const userdetails = await Users.findById(m.senderId);
            // console.log(`userdetails`, userdetails);
            // console.log(`firstname`, userdetails?.firstName);
            // console.log(m._id);
            // console.log(`====================`);
            return {
               Username: userdetails?.firstName,
               Messages: m.message,
               idofmessage: m._id
            };
         })
      );
      res.status(200).json(await messages);
   } catch (error) {
      console.log(`Error`, error);
   }
};

export const deletemessages = async (req, res) => {
   try {
      const id = req.params.msgId;
      console.log(`idid`, id);
      const deletes = await MSG.deleteOne({ _id: id });
      // const deletedetails = await MSG.findById()
      res.status(200).send('Message deleted successfully');
   } catch (error) {
      console.error('error:', error);
   }
};

export const editemessages = async (req, res) => {
   try {
      const id = req.params.msgId;
      const editdata = await MSG.findById(id);
      console.log(editdata.message);
      res.status(200).json({
         existmsg: await editdata.message,
         status: 'get edit details'
      });
   } catch (error) {
      console.error('error:', error);
   }
};

export const editmsgs = async (req, res) => {
   try {
      const id = req.params.msgId;
      console.log(`idididid`, id);
      const { message } = req.body;

      const data = await MSG.updateOne({ _id: id }, { message: message });
      console.log(`msg`, message);
      res.status(200).json('Succesfull editing');
   } catch (error) {
      console.error('error:', error);
   }
};

export const report = async (req, res) => {
   try {
      const reportdata = await MSG.aggregate([
         {
            $group: {
               _id: '$senderId',
               // studentName: '$senderName',
               nummesg: { $sum: 1 }
            }
         }
      ]);
      const messages = await Promise.all(
         reportdata.map(async senderId => {
            console.log(senderId);
            const user = await Users.findById(senderId);
            console.log(user.userName);
            return {
               username: user.firstName
               // Nummesg: senderId.nummesg
            };
         })
      );
      console.log(messages);
   } catch (error) {
      console.error('error:', error);
   }
};
