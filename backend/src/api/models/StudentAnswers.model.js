import mongoose from 'mongoose';

// Define the STUDENT_ANSWERS schema
const studentAnswersSchema = new mongoose.Schema(
   {
      studentEmail: {
         type: String,
         required: true
      },
      paperId: {
         type: String,
         required: true
      },
      answers: {
         type: Array,
         required: true
      }
      //   score: {
      //      type: Number,
      //      required: true
      //   }
   },
   { timestamps: { currentTime: () => Date.now() + 5.5 * 60 * 60 * 1000 } }
);
//create the OTP model
const STUDENT_ANSWERS = mongoose.model('STUDENT_ANSWERS', studentAnswersSchema);

export default STUDENT_ANSWERS;
