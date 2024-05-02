import Review from '../models/Review.model.js';

// Controller to create a new review
export async function createReview(req, res) {
   const { StudentID, Name, ClassName, Description } = req.body;

   try {
      const review = new Review({ StudentID, Name, ClassName, Description });
      await review.save();

      res.status(200).json({ message: 'Review Created Successfully', review });
   } catch (error) {
      res.status(500).json({ error: 'Failed To Create A Review.' });
   }
}

// Controller to retrieve all reviews
export async function getAllReviews(req, res) {
   try {
      const reviews = await Review.find({});
      res.status(200).json(reviews);
   } catch (error) {
      res.status(500).json({ error: 'Failed to retrieve reviews.' });
   }
}

// Controller to retrieve a single review

export async function getReview(req, res) {
   const id = req.params.id;

   try {
      const review = await Review.findById(id);
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
   const { id } = req.params;
   const { StudentID, Name, ClassName, Description } = req.body;
   console.log(id);
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
      if (Description !== undefined) {
         updateFields.Description = Description;
      }

      const review = await Review.findByIdAndUpdate(id, updateFields, {
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
   const { id } = req.params;

   try {
      const review = await Review.findByIdAndDelete(id);
      if (!review) {
         return res.status(404).json({ error: 'Review not found.' });
      }
      res.json({ message: 'Review deleted successfully.' });
   } catch (error) {
      res.status(500).json({ error: 'Failed to delete review.' });
   }
}
