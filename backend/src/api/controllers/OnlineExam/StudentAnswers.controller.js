import STUDENT_ANSWERS from '../../models/StudentAnswers.model.js';

// Controller to create a new student answer
export async function createStudentAnswer(req, res) {
   const { studentEmail, answers } = req.body;
   const { paperId } = req.body;

   try {
      const studentAnswer = new STUDENT_ANSWERS({
         studentEmail,
         paperId,
         answers
      });
      await studentAnswer.save();

      res.status(200).json({
         message: 'Student Answer Created Successfully',
         studentAnswer
      });
   } catch (err) {
      res.status(500).json({ error: 'Failed To Create Student Answer.' + err });
   }
}
