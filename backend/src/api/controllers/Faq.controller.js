import FaqSchema from '../models/Faq.model.js';

export const faqGet = async (req, res) => {
   try {
      const { faqGet } = req.params;
      const items = await FaqSchema.find();
      res.status(200).send({ items });
   } catch (error) {
      res.status(500).send({ error: 'Internal Server Error' });
   }
};

//     const faqGet = async (req, res) => {
//     const items = await FaqSchema.find()
//     res.status(200).json(items)
//   }


export const faqAdd = async (req, res) => {
   try {
      // Extract user information from req.user

      // Add FAQ from Database
      const faqAddSchema = await FaqSchema.create({
         FAQID: req.body.FAQID,
         Question: req.body.Question,
         Answer: req.body.Answer
      })

      await faqAddSchema.save();

      // Send Payments
      res.status(200).send({ FaqSchema });
   } catch (error) {
      res.status(500).send({ error: 'Internal Server Error' });
   }
};

//   const faqAdd = async (req, res) => {
//     console.log("Test")
//     const faqschema = await FaqSchema.create({
//       FAQID: req.body.FAQID,
//       Question: req.body.Question,
//       Answer: req.body.Answer
//     })

//     res.status(200).json(FaqSchema)
//   }



// Delete Enrollment (DELETE) Data Controller */
export const faqDelete = async (req, res) => {
   try {
      const faqId = req.params;
      console.log('faqId: ',faqId)

      const deletedFaq = await FaqSchema.findByIdAndDelete(faqId);

      if (!deletedFaq) {
         return res.status(404).send({ error: 'Payment Not Found!' });
      }

      res.status(200).send({ msg: 'Payment Deleted Successfully' });
   } catch (error) {
      res.status(500).send({ error: 'Internal Server Error' });
   }
};

//   function faqDelete (req, res) {
//     const FAQID = req.body.FAQID
//     FaqSchema.deleteOne({ FAQID }).then((result)=>{res.json(result)})
//   }


// Update Enrollment (PUT) Data Controller */
export const faqUpdate = async (req, res) => {
   try {
      // Extract user information from req.user
      const faqId = req.params;
      const updatedData = req.body;

      console.log('faqId: ',faqId)
      console.log('updatedData: ',updatedData)


      // let checkID = await QUIZ.find({ faqID: id });

      // if (!checkID) {
      //    return res.status(404).send({ error: 'FAQ Not Found!' });
      // }
      // res.status(200).send({ msg: 'Faq Info Availavle' });

      const updatedFaq = await FaqSchema.findByIdAndUpdate(faqId, updatedData, {
         new: true
      });
      console.log('updatedFaq: ',updatedFaq)

      if (!updatedFaq) {
         return res.status(404).send({ error: 'FAQ Not Found!' });
      }

      // updatedFaq.FAQID = req.body.FAQID,
      // updatedFaq.Question = req.body.Question,
      // updatedFaq.Answer = req.body.Answer

      // await updatedFaq.save();

      res.status(200).send({ msg: 'Faq Updated Successfully' });
   } catch (error) {
      res.status(500).send({ error: 'Internal Server Error' });
   }
};

// function faqUpdate(req, res) {
//    const { FAQID, Question, Answer } = req.body;
//    const FAQIDval = parseInt(FAQID);
//    FaqSchema.findOneAndUpdate(
//       { FAQID: FAQIDval }, // Query to find the document based on Pid
//       { Question, Answer }, // Update Tid field
//       { new: true } // To return the updated document
//    )
//       .then((response) => {
//          res.json({ response });
//       })
//       .catch((error) => {
//          res.status(500).json({ error: error.message });
//       });
// }

// const updatedItem = await Item.findOneAndUpdate(
//    //   { id: req.body.id },
//    { name: req.body.name },
//    { new: true } // This option returns the updated document
// );

// console.log(updatedItem);
// res.status(200).json(updatedItem);


// module.exports = {
//   faqUpdate,
//   faqAdd,
//   faqDelete,
//   faqGet,
// }


