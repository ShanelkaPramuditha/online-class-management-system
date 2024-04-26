import mongoose from 'mongoose';

// Define the Live Session Schema
const liveSchema = new mongoose.Schema(
   {
      sessionName: {
         type: String,
         required: true
      },
      sessiontime: {
         type: String,
         required: true
      },
      description: {
         type: String,
         required: false
      },
      link: {
         type: String,
         required: true
      }
      //materials: {
      //   type: Number,
      //   default: 0
      //}
   },
   { timestamps: true }
);

// Create the OTP model
const LIVECLASS = mongoose.model('LIVECLASS', liveSchema);

export default LIVECLASS;
