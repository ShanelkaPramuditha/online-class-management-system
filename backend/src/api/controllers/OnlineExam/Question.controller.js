import QUIZ from '../../models/Question.model.js';
import PAPER from '../../models/Exam.model.js';

// Controller to create a new question
export async function createQuiz(req, res) {
   const { question, correctAnswer } = req.body;
   const { paperId } = req.params;

   try {
      const paper = await PAPER.findById(paperId);

      console.log(paperId);

      if (!paper) {
         return res.status(500).json({ message: 'Paper Not Found' });
      }

      const updatedPaper = await PAPER.findByIdAndUpdate(paperId, {
         quizCount: paper.quizCount + 1
      });

      const quiz = new QUIZ({
         question,
         correctAnswer,
         paperId
      });

      await quiz.save();

      res.status(200).json({ message: 'Quiz Created Successfully', quiz });
   } catch (error) {
      console.log(error);
      res.status(500).json({ error: 'Failed To Create A Quiz.' });
   }
}

// get quiz by paperId
export async function getQuizByPaperId(req, res) {
   const paperId = req.params.paperId;

   try {
      const quizes = await QUIZ.find({ paperId });

      if (quizes && quizes.length > 0) {
         res.status(200).json(quizes);
      } else {
         res.status(404).json({ message: 'No quizzes found for this paper' });
      }
   } catch (error) {
      console.log(error);
      res.status(500).json({ message: 'Failed To Get Quizzes' });
   }
}

// Controller to delete a quiz
export async function deleteQuiz(req, res) {
   const quizId = req.params.id;

   try {
      const quizToDelete = await QUIZ.findById(quizId);

      if (!quizToDelete) {
         return res.status(400).json({ message: 'Quiz not found.' });
      }

      const paperId = quizToDelete.paperId;
      const deletedQuizNumber = quizToDelete.quizNumber;

      await QUIZ.findByIdAndDelete(quizId);

      await QUIZ.updateMany(
         { paperId, quizNumber: { $gt: deletedQuizNumber } },
         { $inc: { quizNumber: -1 } }
      );

      const paper = await PAPER.findByIdAndUpdate(paperId, {
         $inc: { quizCount: -1 }
      });

      res.json({ message: 'Quiz deleted successfully.' });
   } catch (error) {
      console.log(error);
      res.status(500).json({ error: 'Failed to delete quiz.' });
   }
}

// Controller to edit a quiz
export async function editQuiz(req, res) {
   const quizId = req.params.id;
   const { question, correctAnswer } = req.body;

   try {
      const quiz = await QUIZ.findByIdAndUpdate(
         quizId,
         { question, correctAnswer },
         { new: true }
      );

      if (!quiz) {
         return res.status(404).json({ message: 'Quiz not found.' });
      }

      res.json({ message: 'Quiz updated successfully.', quiz });
   } catch (error) {
      console.log(error);
      res.status(500).json({ error: 'Failed to update quiz.' });
   }
}
