import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import otpGenerator from 'otp-generator';
import UserModel from '../models/User.model.js';
import ENV from '../../config/index.js';

export async function verifyUser(req, res, next) {
   try {
      const { username } = req.method == 'GET' ? req.query : req.body;

      let exist = await UserModel.findOne({ username });
      if (!exist) return res.status(404).send({ error: 'User Not Found' });
      next();
   } catch (error) {
      return res.status(404).send({ error: 'Authorization Failed' });
   }
}

export async function register(req, res) {
   try {
      const { username, password, profile, email } = req.body;

      // Check exiting user and email using Promise.all
      const [existUsername, existEmail] = await Promise.all([
         UserModel.findOne({ username }),
         UserModel.findOne({ email })
      ]);

      if (existUsername) {
         return res.status(400).send({ error: 'Please use unique username' });
      }

      if (existEmail) {
         return res.status(400).send({ error: 'Please use unique email' });
      }

      if (password) {
         const hashedPassword = await bcrypt.hash(password, 10);

         const user = new UserModel({
            username,
            password: hashedPassword,
            profile: profile || '',
            email
         });

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
   const { username, password } = req.body;

   try {
      UserModel.findOne({ username })
         .then((user) => {
            bcrypt
               .compare(password, user.password)
               .then((passwordCheck) => {
                  if (!passwordCheck) return res.status(400).send({ error: 'Password does not Match' });

                  const token = jwt.sign(
                     {
                        userId: user._id,
                        username: user.username
                     },
                     ENV.JWT_SECRET,
                     { expiresIn: '24h' }
                  );

                  return res.status(200).send({
                     msg: 'Login Successful',
                     username: user.username,
                     token
                  });
               })
               .catch((error) => {
                  return res.status(400).send({ error: "Don't have password" });
               });
         })
         .catch((error) => {
            return res.status(404).send({ error: 'Username Not Found' });
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
      if (!user) return res.status(404).send({ error: "Couldn't find the user" });
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
      if (!req.app.locals.resetSession) return res.status(440).send({ error: 'Session Expired! Please try again' });

      const { username, password } = req.body;

      if (!username || !password) {
         return res.status(400).send({ error: 'Invalid Request. Username and Password are required!' });
      }

      try {
         const user = await UserModel.findOne({ username });

         if (!user) {
            return res.status(404).send({ error: 'Username Not Found' });
         }

         const hashedPassword = await bcrypt.hash(password, 10);

         await UserModel.updateOne({ username: user.username }, { password: hashedPassword });

         req.app.locals.resetSession = false;
         return res.status(201).send({ msg: 'Record Updated!' });
      } catch (error) {
         return res.status(500).send({ error: 'Internal Server Error' });
      }
   } catch (error) {
      return res.status(401).send({ error });
   }
}