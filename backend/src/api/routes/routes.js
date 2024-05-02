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
import * as reviewController from '../controllers/Review.controller.js';
import * as noticeController from '../controllers/Notice.controller.js';

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
router.route('/usermain/get/:_id').get(controller.GetOne);
router.route('/usermain/getall').get(controller.GetAllUsers);
router.route('/usermain/create').post(controller.CreateUser);
router.route('/usermain/update/:_id').put(controller.UpdateUser);
router.route('/usermain/delete/:_id').delete(controller.DeleteUser);
router.route('/usermain/getbyemail/:email').get(controller.GetUserByEmail);

/* Payment and Enrollemnt Routes */
router.route('/enroll').post(Auth, PaymentController.insertPayment);
router.route('/checkPayment/:cName').get(Auth, PaymentController.checkPayment);
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
router.route('/paper/').get(paperController.getAllPapers);
router.route('/paper/:id').get(paperController.getPaper);
router.route('/update/:paperId').patch(paperController.editPaper);
router.route('/paper').delete(paperController.deletePaper);

router.route('/question/Create/:paperId').post(quizController.createQuiz);
router.route('/question/:id').put(quizController.editQuiz);
router.route('/quiz/:paperId').get(quizController.getQuizByPaperId);
//router.route('/quiz/check').post(quizController.);
router.route('/quiz/:id').delete(quizController.deleteQuiz);
router.route('/quiz/:id').patch(quizController.editQuiz);

// faq section
router.route('/faq/add').post(faqController.faqAdd);
router.route('/faq/get').get(faqController.faqGet);
router
   .route('/faq/get/mainCategory/:Category')
   .get(faqController.faqGetMainCategory);
router.route('/faq/get/notAnswered/').get(faqController.faqGetNotAnswered);
router.route('/faq/delete/:_id').delete(faqController.faqDelete);
router.route('/faq/update/:_id').put(faqController.faqUpdate);

// Live class routes
router.route('/liveSessions/create').post(liveclassController.createLive); //Teacher only
router.route('/liveSessions').get(liveclassController.getSession); //Teacher only
router.route('/liveSessions/:id').get(liveclassController.getASession);
router.route('/liveSessions/edit/:id').put(liveclassController.editLive);
router.route('/liveSessions/delete/:id').delete(liveclassController.deleteLive);

// Review routes
router.route('/review/add').post(reviewController.createReview);
router.route('/review/get').get(reviewController.getAllReviews);
router.route('/review/get/:id').get(reviewController.getReview);
router.route('/review/edit/:id').put(reviewController.editReview);
router.route('/review/delete/:id').delete(reviewController.deleteReview);

// Notice routes
router.route('/notices').post(noticeController.create); //Teacher only
router.route('/notices').get(noticeController.getall); //Teacher only
router.route('/notice/:id').get(noticeController.getOne);
router.route('/notice/:id').put(noticeController.update);
router.route('/notice/:id').delete(noticeController.deleteOne);

export default router;
