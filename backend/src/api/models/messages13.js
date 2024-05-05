import mongoose from 'mongoose';

const msgschema = mongoose.Schema(
   {
      message: {
         type: String
      },
      firstName: {
         type: String
      },
      filetype: {
         type: String
      }
   },
   { timestamps: { currentTime: () => Date.now() + 5.5 * 60 * 60 * 1000 } }
);
const MSG = mongoose.model('Messages13', msgschema);

export default MSG;
