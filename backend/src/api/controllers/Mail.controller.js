// import nodemailer from 'nodemailer';
import Mailgen from 'mailgen';
import { Resend } from 'resend';

import configs from '../../config/index.js';

// let resendConfig = {
//    host: 'smtp.resend.com',
//    port: 465,
//    auth: {
//       user: 'resend',
//       pass: ENV.RESEND_EMAIL_API
//    }
// };

let MailGenerator = new Mailgen({
   theme: 'default',
   product: {
      name: 'Mailgen',
      link: 'https://mailgen.js/'
   }
});

export const registerMail = async (req, res) => {
   const { username, userEmail, text, subject } = req.body;

   var email = {
      body: {
         name: username,
         intro:
            text ||
            "Welcome to Mailgen! We're very excited to have you on board.",
         outro: "Need help, or have questions? Just reply to this email, we'd love to help."
      }
   };

   const resend = new Resend(configs.RESEND_EMAIL_API);

   var emailBody = MailGenerator.generate(email);

   let mailData = {
      from: 'noreply@zedtech.top',
      to: userEmail,
      subject: subject || 'Welcome!',
      html: emailBody
   };

   resend.emails
      .send(mailData)
      .then(() => res.status(200).send({ msg: 'Email Sent Successfully' }))
      .catch(error => res.status(500).send({ error }));
};
