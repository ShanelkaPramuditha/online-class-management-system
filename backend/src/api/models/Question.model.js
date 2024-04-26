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
   { timestamps: { currentTime: () => Date.now() + 5.5 * 60 * 60 * 1000 } }
);

// Create the QUIZ model
const QUIZ = mongoose.model('QUIZ', quizSchema);

export default QUIZ;
