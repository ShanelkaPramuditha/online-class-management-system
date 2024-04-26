import mongoose from 'mongoose';

export const UserSchema = new mongoose.Schema(
   {
      firstName: {
         type: String,
         required: [true, 'First Name is required'],
         unique: false
      },
      lastName: {
         type: String,
         required: [true, 'Last Name is required'],
         unique: false
      },
      email: {
         type: String,
         required: [true, 'Email is required'],
         unique: true
      },
      userRole: {
         type: String,
         default: 'student',
         enum: ['student', 'teacher', 'admin'],
         required: [true, 'User Role is required'],
         unique: false
      },
      gender: {
         type: String,
         required: [true, 'Gender is required']
      },
      mobileNumber: {
         type: String,
         required: [true, 'Mobile Number is required'],
         unique: false
      },
      password: {
         type: String,
         required: [true, 'Password is required'],
         unique: false
      },
      registerDate: {
         type: Date,
         default: Date.now
      }
   },
   {
      timestamps: { currentTime: () => Date.now() + 5.5 * 60 * 60 * 1000 }
   }
);

export default mongoose.model.Users || mongoose.model('User', UserSchema);
