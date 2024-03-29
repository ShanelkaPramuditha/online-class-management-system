import mongoose from 'mongoose';

// Define the quiz schema
const quizSchema = new mongoose.Schema(
   {
      question: {
         type: String,
         required: true
      },
      correctAnswer: {
         type: Number,
         required: true
      },
      paperId: {
         type: mongoose.Schema.Types.ObjectId,
         ref: 'PAPER',
         required: true
      },
      quizNumber: {
         type: Number,
         default: 0
      }
   },
   { timestamps: true }
);

// Create the QUIZ model
const QUIZ = mongoose.model('QUIZ', quizSchema);

export default QUIZ;
