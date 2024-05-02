import mongoose from 'mongoose';

export const NoticeSchema = new mongoose.Schema({
   topic: {
      type: String,
      required: true
   },
   description: {
      type: String,
      required: true
   },
   course: {
      type: String,
      required: true
   },
   grade: {
      type: String,
      required: true
   }
});

export default mongoose.model.Notices || mongoose.model('Notice', NoticeSchema);
