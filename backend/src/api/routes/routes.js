import { Router } from 'express';
const router = Router();

/* import all controllers */
import * as controller from '../controllers/User.controllers.js';
import * as SampleController from '../controllers/Sample.controller.js';
import * as PaymentController from '../controllers/Payment.controller.js';
import Auth, { localVariables } from '../middleware/auth.js';
import { registerMail } from '../controllers/Mail.controller.js';
import * as paperController from '../controllers/OnlineExam/Exam.controller.js';
import * as quizController from '../controllers/OnlineExam/Question.controller.js';
import * as liveclassController from '../controllers/LiveClass/LiveclassController.js';
import * as faqController from '../controllers/Faq.controller.js';

/* POST Methods */
router.route('/register').post(controller.register);
router.route('/registerMail').post(registerMail);
router.route('/login').post(controller.verifyUser, controller.login);
router
   .route('/authenticate')
   .post(controller.verifyUser, (req, res) => res.end());

/* GET Methods */
router.route('/user/:username').get(controller.getUser);
router
   .route('/generateOTP')
   .get(controller.verifyUser, localVariables, controller.generateOTP);
router.route('/verifyOTP').get(controller.verifyOTP);
router.route('/createResetSession').get(controller.createResetSession);

/* PUT Methods */
router.route('/updateUser').put(Auth, controller.updateUser);
router
   .route('/resetPassword')
   .put(controller.verifyUser, controller.resetPassword);

//Methods For UserMain
router.route('/usermain/getall').get(controller.GetAllUsers);
router.route('/usermain/create').post(controller.CreateUser);
router.route('/usermain/update').put(controller.UpdateUser);
router.route('/usermain/delete').delete(controller.DeleteUser);

/* Payment and Enrollemnt Routes */
router.route('/enroll').post(Auth, PaymentController.insertPayment);
router.route('/checkPayment').get(Auth, PaymentController.checkPayment);
router.route('/payments').get(Auth, PaymentController.viewPayments);
router.route('/payment/:id').get(Auth, PaymentController.getPayment);
router
   .route('/updateEnrollment/:id')
   .put(Auth, PaymentController.updateEnrollment);
router.route('/unenroll/:id').delete(Auth, PaymentController.deletePayment);

/* Sample Methods */
router.route('/sample-insert').post(SampleController.insertSample);
router.route('/samples-view').get(SampleController.viewSamples);
router.route('/sample-update/:_id').put(SampleController.updateSample);

// quiz section routes
router.route('/paper/create').post(paperController.createPaper);
router.route('/paper').get(paperController.getAllPapers);
router.route('/paper').patch(paperController.editPaper);
router.route('/paper').delete(paperController.deletePaper);

router.route('/quiz/create').post(quizController.createQuiz);
router.route('/quiz/:paperId').get(quizController.getQuizById);
router.route('/quiz/check').post(quizController.checkAnswer);
router.route('/quiz').delete(quizController.deleteQuiz);
router.route('/quiz').patch(quizController.editQuiz);

// faq section
router.route('/faq/add').post(faqController.faqAdd);
router.route('/faq/get').get(faqController.faqGet);
router.route('/faq/delete/:_id').delete(faqController.faqDelete);
router.route('/faq/update/:_id').put(faqController.faqUpdate);

// Live class routes
router.route('/liveSessions/create').post(liveclassController.createLive);

export default router;
