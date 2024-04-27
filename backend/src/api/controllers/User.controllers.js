import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import otpGenerator from 'otp-generator';
import UserModel from '../models/User.model.js';
import configs from '../../config/index.js';
import { Error } from 'mongoose';

export async function verifyUser(req, res, next) {
   try {
      const { email } = req.method == 'GET' ? req.query : req.body;

      let exist = await UserModel.findOne({ email });
      if (!exist) return res.status(404).send({ error: 'User Not Found' });
      next();
   } catch (error) {
      return res.status(404).send({ error: 'Authorization Failed' });
   }
}

export async function register(req, res) {
   try {
      // Extract user details from request body
      const {
         firstName,
         lastName,
         email,
         userRole,
         gender,
         mobileNumber,
         password
      } = req.body;

      // Check exiting user and email using Promise.all
      const [existEmail] = await Promise.all([
         // UserModel.findOne({ username }),
         UserModel.findOne({ email })
      ]);

      // if (existUsername) {
      //    return res.status(400).send({ error: 'Please use unique username' });
      // }

      if (existEmail) {
         return res.status(400).send({ error: 'Email Already Registered!' });
      }

      if (password) {
         const hashedPassword = await bcrypt.hash(password, 10);

         // Create new user
         const user = new UserModel({
            firstName,
            lastName,
            email,
            userRole,
            gender,
            mobileNumber,
            password: hashedPassword,
            registerDate: Date.now()
         });

         // Save user to database
         await user.save();

         res.status(201).send({ msg: 'User Registered Successfully' });
      } else {
         res.status(400).send({ error: 'Password is required' });
      }
   } catch (error) {
      console.error(error);
      res.status(500).send({ error: 'Internal Server Error' });
   }
}

export async function login(req, res) {
   const { email, password } = req.body;

   try {
      UserModel.findOne({ email })
         .then(user => {
            bcrypt
               .compare(password, user.password)
               .then(passwordCheck => {
                  if (!passwordCheck)
                     return res
                        .status(400)
                        .send({ error: 'Password does not Match' });

                  const token = jwt.sign(
                     {
                        userId: user._id,
                        email: user.email,
                        firstName: user.firstName,
                        lastName: user.lastName
                     },
                     configs.JWT_SECRET,
                     { expiresIn: '24h' }
                  );

                  return res.status(200).send({
                     msg: 'Login Successful',
                     email: user.email,
                     userRole: user.userRole,
                     token,
                     firstName: user.firstName,
                     lastName: user.lastName,
                     gender: user.gender,
                     mobileNumber: user.mobileNumber,
                     dateOfRegistration: user.createdAt,
                     dateOfUpdated: user.updatedAt
                  });
               })
               .catch(error => {
                  return res.status(400).send({ error: "Don't have password" });
               });
         })
         .catch(error => {
            return res.status(404).send({ error: 'User Not Found' });
         });
   } catch (error) {
      return res.status(500).send({ error });
   }
}

export async function getUser(req, res) {
   const { username } = req.params;

   try {
      if (!username) return res.status(400).send({ error: 'Invalid Username' });
      const user = await UserModel.findOne({ username }).exec();
      if (!user)
         return res.status(404).send({ error: "Couldn't find the user" });
      const { password, ...rest } = Object.assign({}, user.toJSON());

      return res.status(201).send(rest);
   } catch (error) {
      return res.status(500).send({ error: 'Internal Server Error' });
   }
}

export async function updateUser(req, res) {
   try {
      // const id = req.query.id;
      const { userId } = req.user;

      if (userId) {
         const body = req.body;

         const result = await UserModel.updateOne({ _id: userId }, body);

         if (result.nModified === 0) {
            return res.status(404).send({ error: 'User Not Found!' });
         }

         return res.status(200).send({ msg: 'Record Updated!' });
      } else {
         return res.status(400).send({ error: 'Invalid User ID!' });
      }
   } catch (error) {
      return res.status(500).send({ error: 'Internal Server Error' });
   }
}

export async function generateOTP(req, res) {
   req.app.locals.OTP = await otpGenerator.generate(6, {
      lowerCaseAlphabets: false,
      upperCaseAlphabets: false,
      specialChars: false
   });
   res.status(201).send({ code: req.app.locals.OTP });
}

export async function verifyOTP(req, res) {
   const { code } = req.query;
   if (parseInt(req.app.locals.OTP) === parseInt(code)) {
      req.app.locals.OTP = null;
      req.app.locals.resetSession = true;
      return res.status(201).send({ msg: "OTP Verified! You're good to go!" });
   }
   return res.status(400).send({ error: 'Invalid OTP' });
}

export async function createResetSession(req, res) {
   if (req.app.locals.resetSession) {
      return res.status(201).send({ flag: req.app.locals.resetSession });
   }
   return res.status(440).send({ error: 'Invalid Request' });
}

export async function resetPassword(req, res) {
   try {
      if (!req.app.locals.resetSession)
         return res
            .status(440)
            .send({ error: 'Session Expired! Please try again' });

      const { username, password } = req.body;

      if (!username || !password) {
         return res.status(400).send({
            error: 'Invalid Request. Username and Password are required!'
         });
      }

      try {
         const user = await UserModel.findOne({ username });

         if (!user) {
            return res.status(404).send({ error: 'Username Not Found' });
         }

         const hashedPassword = await bcrypt.hash(password, 10);

         await UserModel.updateOne(
            { username: user.username },
            { password: hashedPassword }
         );

         req.app.locals.resetSession = false;
         return res.status(201).send({ msg: 'Record Updated!' });
      } catch (error) {
         return res.status(500).send({ error: 'Internal Server Error' });
      }
   } catch (error) {
      return res.status(401).send({ error });
   }
}

//Description - Create New User
//Route - usermain/create
//Access - Private
export async function CreateUser(req, res) {
   //Getting Form Data From Request Sent By FrontEnd UserMain
   const { fName, lName, email, userRole, gender, mobile, password } = req.body;
   var userRolevar = '';
   //Check If Any Variable ( Form Field ) is Null( Empty/Not Filled )
   if (
      !fName ||
      !lName ||
      !email ||
      !userRole ||
      !gender ||
      !mobile ||
      !password
   ) {
      res.status(400).json('Please add all fields');
      //throw new Error('Please add all fields')
   } else {
      if (
         !(
            userRole === 'admin' ||
            userRole === 'teacher' ||
            userRole === 'student'
         )
      ) {
         userRolevar = 'student';
      } else {
         userRolevar = userRole;
      }

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
            userRole: userRolevar,
            gender,
            mobileNumber: mobile,
            password: hashedPassword,
            registerDate: Date.now()
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

//Description - Get User By Id
//Route - usermain/get/:_id
//Access - Private
export async function GetOne(req, res) {
   //Get ID from request parameter - :Id
   const { _id } = req.params;

   //Getting All Users As In UserModel From MongoDB by Mongoose
   const user = await UserModel.findById(_id);

   //Check If The User Array is Null
   if (!user) {
      res.status(400);
      throw new Error('User Not Found!');
   } else {
      //Export Users To Front-End UserMain
      res.status(200).send(user);
   }
}

//Description - Update User
//Route - usermain/update
//Access - Private
export async function UpdateUser(req, res) {
   try {
      // Extract id from the request body
      const { _id } = req.params;

      const oldUser = await UserModel.findById(_id);

      let hashedPassword = oldUser.password;

      if (req.body.password) {
         //Hashing password
         const salt = await bcrypt.genSalt(10);
         hashedPassword = await bcrypt.hash(req.body.password, salt);
      }

      const { fName, lName, email, userRole, gender, mobile, registerDate } =
         req.body;

      const newUser = {
         firstName: fName || oldUser.firstName,
         lastName: lName || oldUser.lastName,
         email: email || oldUser.email,
         userRole: userRole || oldUser.userRole,
         gender: gender || oldUser.gender,
         mobileNumber: mobile || oldUser.mobileNumber,
         password: hashedPassword,
         registerDate: registerDate || oldUser.registerDate
      };

      // Update user in the database
      const result = await UserModel.updateOne({ _id }, { $set: newUser });

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
      const { _id } = req.params;

      // Delete user from the database
      const result = await UserModel.deleteOne({ _id });

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
