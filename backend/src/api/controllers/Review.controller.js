import REVIEW from '../models/Review.js';

// Controller to create a new review
export async function createReview(req, res) {
   const { StudentID, Name, ClassName, Discription } = req.body;

   try {
      const review = new REVIEW({ StudentID, Name, ClassName, Discription });
      await review.save();

      res.status(200).json({ message: 'Review Created Successfully', review });
   } catch (error) {
      res.status(500).json({ error: 'Failed To Create A Review.' });
   }
}

// Controller to retrieve all reviews
export async function getAllReviews(req, res) {
   try {
      const reviews = await REVIEW.find({});
      res.status(200).json(reviews);
   } catch (error) {
      res.status(500).json({ error: 'Failed to retrieve reviews.' });
   }
}

// Controller to retrieve a single review

export async function getReview(req, res) {
   const id = req.params.id;

   try {
      const review = await REVIEW.findById(id);
      if (!review) {
         return res.status(404).json({ error: 'Review not found.' });
      }
      res.status(200).json(review);
   } catch (error) {
      res.status(500).json({ error: 'Failed to retrieve review.' });
   }
}

// Controller to edit a review

export async function editReview(req, res) {
   const { reviewId } = req.params;
   const { StudentID, Name, ClassName, Discription } = req.body;

   try {
      const updateFields = {};
      if (StudentID !== undefined) {
         updateFields.StudentID = StudentID;
      }
      if (Name !== undefined) {
         updateFields.Name = Name;
      }
      if (ClassName !== undefined) {
         updateFields.ClassName = ClassName;
      }
      if (Discription !== undefined) {
         updateFields.Discription = Discription;
      }

      const review = await REVIEW.findByIdAndUpdate(reviewId, updateFields, {
         new: true
      });

      if (!review) {
         return res.status(400).json({ error: 'Review not found.' });
      }
      res.json({ message: 'Review updated successfully.' });
   } catch (error) {
      console.log(error);
      res.status(500).json({ error: 'Failed to update review.' });
   }
}

// Controller to delete a review
export async function deleteReview(req, res) {
   const id = req.body.id;

   try {
      const review = await REVIEW.findByIdAndDelete(id);
      if (!review) {
         return res.status(404).json({ error: 'Review not found.' });
      }
      res.json({ message: 'Review deleted successfully.' });
   } catch (error) {
      res.status(500).json({ error: 'Failed to delete review.' });
   }
}
