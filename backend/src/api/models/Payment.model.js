import mongoose from 'mongoose';

const PaymentSchema = new mongoose.Schema(
   {
      studentId: {
         type: String,
         required: [true, 'Student ID is required']
      },
      email: {
         type: String
      },
      studentName: {
         type: String
      },
      cardHolderName: {
         type: String,
         required: [true, 'Card Holder Name is required']
      },
      courseName: {
         type: String,
         required: [true, 'Course is required']
      },
      courseValue: {
         type: Number,
         required: [true, 'Value is required']
      },
      offerValue: {
         type: Number,
         default: 0
      },
      billingAmount: {
         type: Number,
         default: 0
      },
      expireDate: {
         type: Date,
         default: Date.now() + 5.5 * 60 * 60 * 1000 + 30 * 24 * 60 * 60 * 1000
      },
      status: {
         type: String,
         default: 'Approved'
      }
   },
   // Add timestamps (Time Zone is Sri Lanka (Asia/Colombo), UTC+5:30
   { timestamps: { currentTime: () => Date.now() + 5.5 * 60 * 60 * 1000 } }
);

export default mongoose.model('Payment', PaymentSchema);
