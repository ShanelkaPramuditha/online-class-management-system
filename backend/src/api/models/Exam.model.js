import mongoose from 'mongoose';

// Define the PAPER schema
const paperSchema = new mongoose.Schema(
   {
      title: {
         type: String,
         required: true
      },
      description: {
         type: String,
         required: true
      },
      paperNumber: {
         type: Number,
         required: true
      },
      quizCount: {
         type: Number,
         default: 0
      }
   },
   { timestamps: { currentTime: () => Date.now() + 5.5 * 60 * 60 * 1000 } }
);

// Create the OTP model
const PAPER = mongoose.model('PAPER', paperSchema);

export default PAPER;
