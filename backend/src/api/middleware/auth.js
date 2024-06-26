import jwt from 'jsonwebtoken';
import configs from '../../config/index.js';

// Auth middleware
export default async function Auth(req, res, next) {
   try {
      // Access authorize header to validate request
      const token = req.headers.authorization.split(' ')[1];

      // retrieve user information from token
      const decodedToken = jwt.verify(token, configs.JWT_SECRET);
      req.user = decodedToken;

      next();
   } catch (error) {
      res.status(401).json({ error: 'Authentication Failed!' });
   }
}

export function localVariables(req, res, next) {
   req.app.locals = {
      OTP: null,
      resetSession: false
   };
   next();
}
