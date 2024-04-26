import mongoose from 'mongoose';

const msgschema = mongoose.Schema({
   senderId: {
      type: String
   },
   message: {
      type: String
   }
});
const MSG = mongoose.model('Messages', msgschema);

export default MSG;
