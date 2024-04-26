import PaymentSchema from '../models/Payment.model.js';
import { PaymentZodSchema } from '../validations/payment.validation.js';
import { ZodError } from 'zod';

/* Do Payment(POST) Data Controller */
export const insertPayment = async (req, res) => {
   try {
      // Use Zod to validate req.body
      const validatedData = PaymentZodSchema.safeParse(req.body);
      if (!validatedData) {
         return res.status(400).send({ error: 'Invalid Data' });
      }

      // Extract user information from req.user
      const { userId, email, firstName, lastName } = req.user;
      const { cardHolderName, courseName, courseValue, offerValue } = req.body;

      // Create Payment Object with user information
      // console.log(req.user);
      const payment = new PaymentSchema({
         studentId: userId,
         email: email,
         studentName: firstName + ' ' + lastName,
         cardHolderName,
         courseName,
         courseValue,
         offerValue,
         billingAmount: courseValue - offerValue
      });

      // Save Payment to Database

      await payment.save();

      // Send Success Message
      res.status(201).send({ msg: 'Payment Successfully' });
   } catch (error) {
      // Zod Error
      if (error instanceof ZodError) {
         return res.status(400).send({ error: error.errors });
      }
      // Internal Server Error
      res.status(500).send({ error: 'Internal Server Error' });
   }
};

// Check Payment status (GET) Data Controller */
export const checkPayment = async (req, res) => {
   try {
      // Extract user information from req.user
      const { cName } = req.params;
      const { userId } = req.user;
      const payment = await PaymentSchema.findOne({
         studentId: userId,
         courseName: cName
      });

      if (!payment) {
         return res.status(400).send({ error: 'Payment Not Found!' });
      }

      if (payment) {
         if (Date.now() + 5.5 * 60 * 60 * 1000 - payment.expireDate >= 0) {
            return res.status(400).send({ error: 'Payment Not Valid!' });
         }
         console.log(payment.expireDate > Date.now());
         if (payment.courseName === cName && payment.status === 'Approved') {
            return res
               .status(200)
               .send({ data: payment, msg: 'Payment Found!' });
         } else {
            return res.status(400).send({ error: 'Payment Not Found!' });
         }
      }
   } catch (error) {
      res.status(500).send({ error: 'Internal Server Error' });
   }
};

// View Payments (GET) Data Controller */
export const viewPayments = async (req, res) => {
   try {
      // Extract user information from req.user
      //const { username } = req.user;

      // Get Payments from Database
      const payments = await PaymentSchema.find();

      // Send Payments
      res.status(200).send({ payments });
   } catch (error) {
      res.status(500).send({ error: 'Internal Server Error' });
   }
};

// Get Full Paiment Details (GET) Data Controller */
export const getPayment = async (req, res) => {
   try {
      const { id } = req.params;
      const payment = await PaymentSchema.findById(id);
      res.status(200).send({ payment });
   } catch (error) {
      res.status(500).send({ error: 'Internal Server Error' });
   }
};

// Update Enrollment (PUT) Data Controller */
export const updateEnrollment = async (req, res) => {
   try {
      // Extract user information from req.user
      // const { email, firstName, lastName } = req.user;
      const { cardHolderName, courseName, courseValue, offerValue, status } =
         req.body;

      const { id } = req.params;

      // const studentName = firstName + ' ' + lastName;

      const payment = await PaymentSchema.findById(id);

      if (!payment) {
         return res.status(404).send({ error: 'Payment Not Found!' });
      }

      // payment.email = email;
      // payment.studentName = studentName;
      payment.cardHolderName = cardHolderName;
      payment.courseName = courseName;
      payment.courseValue = courseValue;
      payment.offerValue = offerValue;
      payment.billingAmount = courseValue - offerValue;
      payment.status = status;

      await payment.save();

      res.status(200).send({ msg: 'Payment Updated Successfully' });
   } catch (error) {
      res.status(500).send({ error: 'Internal Server Error' });
   }
};

// Delete Enrollment (DELETE) Data Controller */
export const deletePayment = async (req, res) => {
   try {
      const { id } = req.params;

      const deletedPayment = await PaymentSchema.findByIdAndDelete(id);

      if (!deletedPayment) {
         return res.status(404).send({ error: 'Payment Not Found!' });
      }

      res.status(200).send({ msg: 'Payment Deleted Successfully' });
   } catch (error) {
      res.status(500).send({ error: 'Internal Server Error' });
   }
};
