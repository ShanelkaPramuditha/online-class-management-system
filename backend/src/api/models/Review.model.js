import mongoose from 'mongoose';

export const ReviewSchema = new mongoose.Schema(
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

      Description: {
         type: String,
         required: true
      }
   },

   {
      timestamps: { currentTime: () => Date.now() + 5.5 * 60 * 60 * 1000 }
   }
);

export default mongoose.model.Review || mongoose.model('Review', ReviewSchema);
