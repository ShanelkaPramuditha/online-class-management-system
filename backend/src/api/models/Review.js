import mongoose from 'mongoose';

const reviewSchema = new mongoose.Schema(
   {
      StudentID: {
         type: String,
         required: true
      },

      Name: {
         type: String
      },

      ClassName: {
         type: String,
         required: true
      },

      Discription: {
         type: String,
         required: true
      }
   },

   { timestamps: { currentTime: () => Date.now() + 5.5 * 60 * 60 * 1000 } }
);

// Create the OTP model
const REVIEW = mongoose.model('REVIEW', reviewSchema);

export default REVIEW;
