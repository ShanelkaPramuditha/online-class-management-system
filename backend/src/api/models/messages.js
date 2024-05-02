import mongoose from 'mongoose';

const msgschema = mongoose.Schema(
   {
      senderId: {
         type: String
      },
      message: {
         type: String
      }
   },
   {
      timestamps: true
   }
);
const MSG = mongoose.model('Messages', msgschema);

export default MSG;
