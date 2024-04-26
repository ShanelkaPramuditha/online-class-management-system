import PAPER from '../../models/Exam.model.js';
import QUIZ from '../../models/Question.model.js';

// Controller to create a new question
export async function createPaper(req, res) {
   //   const { title, description } = req.body;
   const title = req.body.title;
   const description = req.body.description;

   try {
      let paperCount = (await PAPER.countDocuments()) + 1;
      const paper = new PAPER({ title, description, paperNumber: paperCount });
      await paper.save();

      res.status(200).json({ massage: 'Paper Created Successfully', paper });
   } catch (error) {
      res.status(500).json({ error: 'Faild To Create A Paper.' });
   }
}

// Controller to retrieve all questions
export async function getAllPapers(req, res) {
   try {
      const papers = await PAPER.find({});
      res.status(200).json(papers);
   } catch (error) {
      res.status(500).json({ error: 'Failed to retrieve FAQ questions.' });
   }
}

// Controller to retrieve a single paper
export async function getPaper(req, res) {
   const id = req.params.id;

   try {
      const paper = await PAPER.findById(id);
      if (!paper) {
         return res.status(404).json({ error: 'Paper not found.' });
      }
      res.status(200).json(paper);
   } catch (error) {
      res.status(500).json({ error: 'Failed to retrieve paper.' });
   }
}

// Controller to edit a paper
export async function editPaper(req, res) {
   const { paperId } = req.params;
   const { title, description } = req.body;

   try {
      const updateFields = {};
      if (title !== undefined) {
         updateFields.title = title;
      }
      if (description !== undefined) {
         updateFields.description = description;
      }

      const paper = await PAPER.findByIdAndUpdate(paperId, updateFields, {
         new: true
      });

      if (!paper) {
         return res.status(400).json({ error: 'Paper not found.' });
      }
      res.json({ message: 'Paper updated successfully.' });
   } catch (error) {
      console.log(error);
      res.status(500).json({ error: 'Failed to update paper.' });
   }
}

// Controller to delete a question
export async function deletePaper(req, res) {
   const id = req.body.id;

   try {
      // Find paper to be deleted and get its paperNumber
      const paperToDelete = await PAPER.findById(id);

      if (!paperToDelete) {
         res.status(404).json({ message: 'paper deleted successfully.' });
      }
      const deletedPaperNumber = paperToDelete.paperNumber;

      // Delete paper
      await PAPER.findByIdAndDelete(id);

      // Find and update paperNumbers of subsequent papers
      await PAPER.updateMany(
         { paperNumber: { $gt: deletedPaperNumber } }, // Find papers with paperNumber greater than the deleted paper
         { $inc: { paperNumber: -1 } } // Decrement paperNumber by 1
      );

      const quizes = await QUIZ.deleteMany({ paperId: id });

      res.json({ message: 'paper deleted successfully.' });
   } catch (error) {
      console.log(error);
      res.status(500).json({ error: 'Failed to delete paper.' });
   }
}
