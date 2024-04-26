import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import otpGenerator from 'otp-generator';
import UserModel from '../models/User.model.js';
import configs from '../../config/index.js';
import { Error } from 'mongoose';

//Description - Create New User
//Route - usermain/create
//Access - Private
export async function CreateUser(req, res) {
   //Getting Form Data From Request Sent By FrontEnd UserMain
   const {
      fName,
      lName,
      email,
      userRole,
      gender,
      mobile,
      password,
      registerDate
   } = req.body;

   //Check If Any Variable ( Form Field ) is Null( Empty/Not Filled )
   if (
      !fName ||
      !lName ||
      !email ||
      !userRole ||
      !gender ||
      !mobile ||
      !password ||
      !registerDate
   ) {
      res.status(400).json('Please add all fields');
      //throw new Error('Please add all fields')
   } else {
      //Check If The User Already Exists
      const userExists = await UserModel.findOne({ email });

      if (userExists) {
         res.status(400).json('User alredy exists!');
         //throw new Error('User alredy exists!')
      } else {
         //Hash Password
         const salt = await bcrypt.genSalt(10);
         const hashedPassword = await bcrypt.hash(password, salt);

         //Creating User
         const user = await UserModel.create({
            firstName: fName,
            lastName: lName,
            email,
            userRole,
            gender,
            mobileNumber: mobile,
            password: hashedPassword,
            registerDate
         });

         //Check For The Created User
         if (user) {
            res.status(201).json({
               _id: user.id,
               fname: user.fname,
               lName: user.lName,
               email: user.email,
               userRole: user.userRole,
               gender: user.gender,
               mobile: user.mobile,
               registerDate: user.registerDate
            });
         } else {
            //If Users Isn't Created Correctly

            res.status(400).json('Invalid User Data');
            //throw new Error('Invalid User Data')
         }
      }
   }
}

//Description - Get All Users
//Route - usermain/getall
//Access - Private
export async function GetAllUsers(req, res) {
   //Getting All Users As In UserModel From MongoDB by Mongoose
   const users = await UserModel.find();

   //Check If The User Array is Null
   if (!users) {
      res.status(400);
      throw new Error('Please add at least one user!');
   }

   //Export Users To Front-End UserMain
   res.status(200).json(users);
}

//Description - Update User
//Route - usermain/update
//Access - Private
export async function UpdateUser(req, res) {
   try {
      // Extract email and Other Data from the request body

      // Construct update data, skipping role if it's null
      const updateData = {
         firstName: req.body.fName,
         lastName: req.body.lName,
         userRole: req.body.userRole,
         gender: req.body.gender,
         mobileNumber: req.body.mobile,
         password: req.body.password,
         registerDate: req.body.registerDate
      };

      // Update user in the database
      const result = await UserModel.updateOne(
         { email: req.body.email },
         { $set: updateData }
      );
      console.log(updateData);
      // Check if the update was successful
      if (result.nModified === 0) {
         return res
            .status(404)
            .json({ error: 'User not found or no changes were made.' });
      }

      // Send success response
      res.status(200).json({ message: 'User updated successfully.' });
   } catch (error) {
      console.error('Error updating user:', error);
      res.status(500).json({ error: 'Internal server error.' });
   }
}

//Description - Delete User
//Route - usermain/delete
//Access - Private
export async function DeleteUser(req, res) {
   try {
      // Extract email from the request body
      const { email } = req.body;

      // Validate input data
      if (!email) {
         return res.status(400).json({ error: 'Email is required.' });
      }

      // Delete user from the database
      const result = await UserModel.deleteOne({ email: email });

      // Check if the delete operation was successful
      if (result.deletedCount === 0) {
         return res.status(404).json({ error: 'User not found.' });
      }

      // Send success response
      res.status(200).json({ message: 'User deleted successfully.' });
   } catch (error) {
      console.error('Error deleting user:', error);
      res.status(500).json({ error: 'Internal server error.' });
   }
}
