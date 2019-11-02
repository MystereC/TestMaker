const express = require('express');
const router = express.Router();

const ctrlUser = require('../controllers/user.controller');
const ctrlClass = require('../controllers/class.controller');
const ctrlQuiz = require('../controllers/quiz.controller');
const ctrlQuestion = require('../controllers/question.controller');
const ctrlExam = require('../controllers/exam.controller');
const ctrlSubmission = require('../controllers/submission.controller');
const ctrlPoll = require('../controllers/poll.controller');
const jwtHelper = require('../config/jwtHelper');



// User Api

/**
 * @swagger
 * /register:
 *   post:
 *     summary: Sign Up
 *     description: Create a new User account
 *     tags:
 *       - users
 *     requestBody:
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - firstName
 *               - lastName
 *               - email
 *               - role
 *               - password
 *             properties:
 *               firstName:
 *                 type: string
 *                 description: the first name of user
 *               lastName:
 *                 type: string
 *                 description: the last name of user
 *               email:
 *                 type: string
 *                 description: the email of user
 *               role:
 *                 type : string 
 *                 description : Student or professor
 *               password:
 *                 type : string
 *                 description: Password must be atleast 4 character long
 *               
 *     responses:
 *       200:
 *         description: user registered successful 
 *         schema:
 *           type: object
 *           properties:
 *             message:
 *               type: string
 *               description: response                 

 *       401:
 *        description:  Not authenticated
 *       403:
 *        description:  Access token does not have the required scope
 *       433:
 *        description: Unprocessable Entity  
 *       default:
 *        description: Unexpected error    
 */
router.post('/register', ctrlUser.register);
/**
 * @swagger
 * /authenticate:
 *   post:
 *     summary: Sign In
 *     description: authenticate to access and get token
 *     tags:
 *       - users
 *     requestBody:
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - email
 *               - password
 *             properties:
 *               email:
 *                 type: string
 *                 description: the email of user
 *               password:
 *                 type : string
 *                 description: Password must be atleast 4 character long
 *               
 *     responses:
 *       200:
 *         description: user registered successful 
 *         schema:
 *           type: object
 *           properties:
 *             token:
 *               type: string
 *               description: the token to access
 *             userRole:
 *               type : string
 *               description : the role of user                 
 *
 * 
 *       400: 
 *        description: Email is not registered or Wrong password. 
 *       401:
 *        description:  Not authenticated
 *       403:
 *        description:  Access token does not have the required scope 
 *       default:
 *        description: Unexpected error    
 */
router.post('/authenticate', ctrlUser.authenticate);


/**
 * @swagger 
 * /userProfile:
 *   get:
 *     security:
 *       - Bearer: []
 *     summary: get user's details
 *     description: the user's details .
 *     tags:
 *       - users
 *     responses:
 *       200:
 *         description: user
 *         schema:
 *           type: object
 *           description : user 
 *           properties:
 *                   lastName:
 *                     type: string
 *                     description: user's last name                  
 *                   firstName:
 *                     type: string
 *                     description: user's first name 
 *                   email:
 *                     type: String
 *                     description: user's email 
 *       401:
 *        description:  Not authenticated
 *       403:
 *        description:  Access token does not have the required scope
 *       500:
 *         description: Error we can't find user.
 *       default:
 *        description: Unexpected error
 */
router.get('/userProfile', jwtHelper.verifyJwtToken, ctrlUser.userProfile);
/**
 * @swagger 
 * /getClassesRegisterd:
 *   get:
 *     security:
 *       - Bearer: []
 *     summary: List all the classes of a student
 *     description: List all the classes of a professor by his id .
 *     tags:
 *       - users
 *     responses:
 *       200:
 *         description: List of classes
 *         schema:
 *           type: array
 *           description : all the classes in array of Class
 *           items:
 *                 type: object
 *                 description: a class
 *                 properties:
 *                   _id:
 *                     type: ObjectId
 *                     description: the id of the class                   
 *                   title:
 *                     type: String
 *                     description: the title of the class
 *                   university:
 *                     type: String
 *                     description: the university field describes the place of class 
 *                   professorCreated:
 *                     type: string
 *                     description: the user who created the class
 *                   arrayOfStudents:
 *                     type: array 
 *                     description: contains all id of registered students
 *                     items:
 *                       type: ObjectId
 *                   arrayOfExams:
 *                     type: array 
 *                     description: contains all exams assigned
 *                     items:
 *                       type: object
 *                       description : exam
 *                       properties:
 *                         _id :
 *                         type : string
 *                         description : the id of exam
 *                         title:
 *                          type: String
 *                          description: the title of the exam
 *                         dateCreation:
 *                          type: Date
 *                          description: the creation date
 *                         professorCreated:
 *                          type: ObjectId
 *                          description: the user who created the exam
 *                         class:
 *                          type: ObjectId
 *                          description: the class assigned
 *                         comment:
 *                          type: String 
 *                          description: the  comment of the exam
 *                         listQuiz:
 *                           type: array 
 *                           description: contains all quizes id assigned
 *                           items :
 *                            type : string
 *                            description : id of quiz
 *                   arrayOfPolls:
 *                     type: array 
 *                     description: contains all  of the Polls assigned
 *                     items:
 *                       type: object
 *                       description : polls
 *                       properties: 
 *                        _id :
 *                            type : string
 *                            description : the id of the poll
 *                        question :
 *                            type : string
 *                            description: the question of the poll
 *                        dateCreation :
 *                            type : string
 *                            description: the Creation  date of the poll
 *                        description :
 *                            type : string
 *                            description: the description of poll
 *                        class :
 *                            type : string
 *                            description: the id of class assigned
 *                        option:
 *                            type: array
 *                            description : all options to choose   
 *                            items:
 *                               type : object
 *                               description : an answer
 *                               properties :
 *                                 proposition : 
 *                                     type: string
 *                                     description: the  proposition to choose
 *                                 vote :
 *                                   type : number
 *                                   description : the vote
 *       401:
 *        description:  Not authenticated
 *       403:
 *        description:  Access token does not have the required scope
 *       500:
 *         description: Error we can't find classes.
 *       default:
 *        description: Unexpected error
 */
router.get('/getClassesRegisterd', jwtHelper.verifyJwtToken, ctrlUser.getClassesRegisterd);


/**
 * @swagger
 * /getSubmissions:
 *   get:
 *     security:
 *       - Bearer: []
 *     summary: get submissions of  connected user
 *     description: return array of submissions of  connected user 
 *     tags:
 *       - users          
 *               
 *     responses:
 *       200:
 *         description: submissions 
 *         schema:
 *           type: array
 *           description : all user's submission
 *           items:
 *            type: object
 *            properties:
 *               exam :
 *                type: array
 *                description: all the exams in array of exam
 *                items:
 *                 type: object
 *                 description: an exam
 *                 properties:
 *                   title:
 *                     type: String
 *                     description: the title of the exam
 *                   dateCreation:
 *                     type: Date
 *                     description: the creation date
 *                   professorCreated:
 *                     type: ObjectId
 *                     description: the user who created the exam
 *                   class:
 *                     type: ObjectId
 *                     description: the class assigned
 *                   comment:
 *                     type: String 
 *                     description: the  comment of the exam
 *                     items:
 *                       type: ObjectId
 *                   listQuiz:
 *                     type: array 
 *                     description: contains all quizes assigned
 *                     items:
 *                       type: object
 *                       properties:
 *                         title:
 *                           type: string
 *                           description: the title of the quiz
 *                         dateCreation:
 *                           type: Date
 *                           description: the creation date
 *                         professorCreated:
 *                           type: ObjectId
 *                           description: the user who created the quiz 
 *                         description:
 *                           type: string
 *                           description: the description of the quiz
 *                         listQuestion:
 *                           type: array 
 *                           description: contains all  the questions assigned
 *                           items:
 *                             type: object
 *                             description: a question
 *                             properties:
 *                               formuler:
 *                                 type: string
 *                                 description : the question to answer 
 *                               professorCreated:
 *                                 type: string
 *                                 description: the user who created the question 
 *                               listProposition:
 *                                 type: array
 *                                 description : all the options to answer    
 *                                 items:
 *                                   type : object
 *                                   description : an option
 *                                   properties :
 *                                     choice : 
 *                                       type: string
 *                                       description: the text of option
 *                                     isTrue :
 *                                       type : boolean
 *                                       description : is that option is right
 *                                     point :
 *                                       type : number
 *                                       description : point assigned to this option
 *               Student :
 *                 type : string
 *                 description: the id of the student who passed the exam
 *               dateCreation :
 *                 type : date
 *                 description: date of submission
 *               class :
 *                 type : string
 *                 description: the id of class assigned
 *               totalPoints :
 *                 type : string
 *                 description: the sum of all questions's point
 *               totalScore :
 *                 type : string
 *                 description: the sum of score obtained
 *               answersList:
 *                 type: array
 *                 description : all the options's answers    
 *                 items:
 *                   type : object
 *                   description : an answer
 *                   properties :
 *                     idQuestion : 
 *                       type: string
 *                       description: the id of question to answer
 *                     correction : 
 *                       type: string
 *                       description: return if his answer is correct or incorrect or incomplete 
 *                     score : 
 *                       type: number
 *                       description: return score obtained for this question
 *                     listProposition :
 *                       type : array
 *                       description : list of answers
 *                       items:
 *                         type : object
 *                         description : an answer
 *                         properties :    
 *                           idPropostion:
 *                             type : number
 *                             description: the id of an option (0 or 1 or 2 or 3 ..)                    
 *                           hisChoice:
 *                             type : boolean
 *                             description: if the student choose true or false     
 *       401:
 *        description:  Not authenticated
 *       403:
 *        description:  Access token does not have the required scope
 *       500:
 *         description: Error we can't find user. 
 *       default:
 *        description: Unexpected error    
 */
router.get('/getSubmissions', jwtHelper.verifyJwtToken, ctrlUser.getSubmissions);
//router.post('/getSubmissionsByStudent', jwtHelper.verifyJwtToken, ctrlUser.getSubmissionsByStudent);



// Class Api

/**
 * @swagger
 * /newClass:
 *   post:
 *     security:
 *       - Bearer: []
 *     summary: CreateClass
 *     description: Create a new class
 *     tags:
 *       - classes
 *     requestBody:
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - title
 *               - university
 *             properties:
 *               title:
 *                 type: string
 *                 description: the title of the class
 *               university:
 *                 type: string
 *                 description: the university field describes the place of class 
 *               
 *     responses:
 *       200:
 *         description: the class is successfully created
 *         schema:
 *           type: object
 *           properties:
 *             _id:
 *               type: ObjectId
 *               description: the id of the class                   
 *             title:
 *               type: String
 *               description: the title of the class
 *             university:
 *               type: String
 *               description: the university field describes the place of class 
 *             professorCreated:
 *               type: ObjectId
 *               description: the user who created the class
 *             arrayOfStudents:
 *                type: array 
 *                description: contains all id of registered students
 *                items:
 *                  type: ObjectId
 *             arrayOfExams:
 *                type: array 
 *                description: contains all id of the exam assigned
 *                items:
 *                  type: ObjectId
 *             arrayOfPolls:
 *                 type: array 
 *                 description: contains all id of the Polls assigned
 *                 items:
 *                   type: ObjectId
 *       401:
 *        description:  Not authenticated
 *       403:
 *        description:  Access token does not have the required scope
 *       433:
 *        description: Unprocessable Entity  
 *       default:
 *        description: Unexpected error    
 */
router.post('/newClass', jwtHelper.verifyJwtToken, ctrlClass.CreateClass);
/**
 * @swagger 
 * /getMyClasses:
 *   get:
 *     security:
 *       - Bearer: []
 *     summary: List all the classes of a professor
 *     description: List all the classes of a professor by his id .
 *     tags:
 *       - classes
 *     responses:
 *       200:
 *         description: List of classes
 *         schema:
 *           type: array
 *           description : all the classes in array of Class
 *           items:
 *                 type: object
 *                 description: a class
 *                 properties:
 *                   _id:
 *                     type: ObjectId
 *                     description: the id of the class                   
 *                   title:
 *                     type: String
 *                     description: the title of the class
 *                   university:
 *                     type: String
 *                     description: the university field describes the place of class 
 *                   professorCreated:
 *                     type: object
 *                     description: the user who created the class
 *                     properties:
 *                       _id:
 *                         type: ObjectId
 *                         description: the id of the professor                   
 *                       firstName:
 *                         type: String
 *                         description: the firstname of professor
 *                       lastName:
 *                         type: String
 *                         description: the lastname of professor
 *                       email:
 *                         type: ObjectId
 *                         description: the email of professor
 *                   arrayOfStudents:
 *                     type: array 
 *                     description: contains all id of registered students
 *                     items:
 *                       type: ObjectId
 *                   arrayOfExams:
 *                     type: array 
 *                     description: contains all id of the exam assigned
 *                     items:
 *                       type: ObjectId
 *                   arrayOfPolls:
 *                     type: array 
 *                     description: contains all id of the Polls assigned
 *                     items:
 *                       type: ObjectId
 *       401:
 *        description:  Not authenticated
 *       403:
 *        description:  Access token does not have the required scope
 *       500:
 *         description: Error we can't find classes.
 *       default:
 *        description: Unexpected error
 */
router.get('/getMyClasses', jwtHelper.verifyJwtToken, ctrlClass.findClassesByProfessorId);
/**
 * @swagger 
 * /getAllClasses:
 *   get:
 *     security:
 *       - Bearer: []
 *     summary: List all the classes in database
 *     description: Returns a list of all the classes.
 *     tags:
 *       - classes
 *     responses:
 *       200:
 *         description: List of classes
 *         schema:
 *           type: array
 *           description : all the classes in array of Class
 *           items:
 *                 type: object
 *                 description: a class
 *                 properties:
 *                   _id:
 *                     type: ObjectId
 *                     description: the id of the class                   
 *                   title:
 *                     type: String
 *                     description: the title of the class
 *                   university:
 *                     type: String
 *                     description: the university field describes the place of class 
 *                   professorCreated:
 *                     type: object
 *                     description: the user who created the class
 *                     properties:
 *                       _id:
 *                         type: ObjectId
 *                         description: the id of the professor                   
 *                       firstName:
 *                         type: String
 *                         description: the firstname of professor
 *                       lastName:
 *                         type: String
 *                         description: the lastname of professor
 *                       email:
 *                         type: ObjectId
 *                         description: the email of professor
 *                   arrayOfStudents:
 *                     type: array 
 *                     description: contains all id of registered students
 *                     items:
 *                       type: ObjectId
 *                   arrayOfExams:
 *                     type: array 
 *                     description: contains all id of the exam assigned
 *                     items:
 *                       type: ObjectId
 *                   arrayOfPolls:
 *                     type: array 
 *                     description: contains all id of the Polls assigned
 *                     items:
 *                       type: ObjectId
 *       401:
 *        description:  Not authenticated
 *       403:
 *        description:  Access token does not have the required scope
 *       500:
 *         description: Error we can't find classes.
 *       default:
 *        description: Unexpected error
 */
router.get('/getAllClasses', jwtHelper.verifyJwtToken, ctrlClass.getAllClasses);


/**
 * @swagger 
 * /rejoinClass:
 *   post:
 *     security:
 *       - Bearer: []
 *     summary: subscribe to an classe
 *     description: subscribe an student to an classe
 *     tags:
 *       - classes
 *     requestBody:
 *      content:
 *        application/json:
 *          schema:
 *            type: object
 *            required:
 *              - _id
 *            properties:
 *              _id:
 *                type: string
 *                description: the id of the class
 *     responses:
 *       200:
 *         description: return the class that the student has subscribed
 *         schema:
 *           type: object
 *           properties:
 *             class:
 *               type: object
 *               description: a class
 *               properties:
 *                 _id:
 *                   type: ObjectId
 *                   description: the id of the class                   
 *                 title:
 *                   type: String
 *                   description: the title of the class
 *                 university:
 *                   type: String
 *                   description: the university field describes the place of class 
 *                 professorCreated:
 *                   type: ObjectId
 *                   description: the user who created the class
 *                 arrayOfStudents:
 *                   type: array 
 *                   description: contains all id of registered students
 *                   items:
 *                     type: ObjectId
 *                 arrayOfExams:
 *                   type: array 
 *                   description: contains all id of the exam assigned
 *                   items:
 *                     type: ObjectId
 *                 arrayOfPolls:
 *                   type: array 
 *                   description: contains all id of the Polls assigned
 *                   items:
 *                     type: ObjectId
 *       401:
 *        description:  Not authenticated
 *       403:
 *        description:  Access token does not have the required scope
 *       500:
 *         description: Error we can't find classes or Student already registered in class.
 *       default:
 *        description: Unexpected error
 */
router.post('/rejoinClass', jwtHelper.verifyJwtToken, ctrlClass.subscribeInClass);

/**
 * @swagger 
 * /getAllSutudentOfClass:
 *   post:
 *     security:
 *       - Bearer: []
 *     summary: List of class's students by class id 
 *     description: Returns a list of all the students that belongs to this class given by id .
 *     tags:
 *       - classes
  *     requestBody:
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - _id
 *             properties:
 *               _id:
 *                 type: string
 *                 description: the id of the class
 *     responses:
 *       200:
 *         description: List of students
 *         schema:
 *           type: array
 *           descrption : array of students 
 *           items:
 *                 type: object
 *                 description: a student
 *                 properties:
 *                   _id:
 *                     type: ObjectId
 *                     description: the id of the student                   
 *                   firstName:
 *                     type: String
 *                     description: the firstname of student
 *                   lastName:
 *                     type: String
 *                     description: the lastname of student
 *                   email:
 *                     type: ObjectId
 *                     description: the email of student

 *       401:
 *        description:  Not authenticated
 *       403:
 *        description:  Access token does not have the required scope
 *       500:
 *         description: Error we can't find classes.
 *       default:
 *        description: Unexpected error
 */
router.post('/getAllSutudentOfClass', jwtHelper.verifyJwtToken, ctrlClass.getAllSutudentOfClass);

/**
 * @swagger 
 * /unsubscribeInClass:
 *   put:
 *     security:
 *       - Bearer: []
 *     summary: remove student
 *     description: remove student from a class (update class and user collections)
 *     tags:
 *       - classes
 *     requestBody:
 *      content:
 *        application/json:
 *          schema:
 *            type: object
 *            required:
 *              - class
 *              - student
 *            properties:
 *              class:
 *                type: string
 *                description: the id of the class
 *              student:
 *                type: string
 *                description: the id of the class
 *     responses:
 *       200:
 *         description: student is removed from this class 
 *         schema:
 *           type: object
 *           properties:
 *             message:
 *               type: string
 *       401:
 *        description:  Not authenticated
 *       403:
 *        description:  Access token does not have the required scope
 *       500:
 *         description: Error we can't find class or Student.
 *       default:
 *        description: Unexpected error
 */
router.put('/unsubscribeInClass', jwtHelper.verifyJwtToken, ctrlClass.unsubscribeInClass);


/**
 * @swagger
 * /newQuiz:
 *   post:
 *     security:
 *       - Bearer: []
 *     summary: Create Quiz
 *     description: Create a new quiz
 *     tags:
 *       - quizes
 *     requestBody:
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - title
 *               - listQuestion
 *             properties:
 *               title:
 *                 type: string
 *                 description: the title of the quiz
 *               description:
 *                 type: string
 *                 description: the description of the quiz
 *               listQuestion:
 *                     type: array 
 *                     description: contains all the questions assigned
 *                     items:
 *                       type: object
 *                       description: a question
 *                       properties:
 *                         formuler:
 *                           type: string
 *                           description : the question to answer 
 *                         listProposition:
 *                           type: array
 *                           description : all the options to answer    
 *                           items:
 *                             type : object
 *                             description : an option
 *                             properties :
 *                               choice : 
 *                                 type: string
 *                                 description: the text of option
 *                               isTrue :
 *                                 type : boolean
 *                                 description : is that option is right
 *                               point :
 *                                  type : number
 *                                  description : point assigned to this option
 *               
 *     responses:
 *       200:
 *         description: quiz created successful 
 *         schema:
 *           type: object
 *           properties:
 *             message:
 *               type: string
 *       401:
 *        description:  Not authenticated
 *       403:
 *        description:  Access token does not have the required scope
 *       433:
 *        description: Unprocessable Entity  
 *       default:
 *        description: Unexpected error    
 */

//Quiz Api
router.post('/newQuiz', jwtHelper.verifyJwtToken, ctrlQuiz.CreateQuiz);
/**
 * @swagger
 * /getQuizes:
 *   get:
 *     security:
 *       - Bearer: []
 *     summary: getQuizes by user id
 *     description: Returns a list of all the quizes.
 *     tags:
 *       - quizes
 *     responses:
 *       200:
 *         description: List of quizes
 *         schema:
 *           type: array
 *           description : all quizes 
 *           items:
 *                 type: object
 *                 description: a quiz
 *                 properties:
 *                   title:
 *                     type: String
 *                     description: the title of the quiz
 *                   dateCreation:
 *                     type: Date
 *                     description: the creation date
 *                   professorCreated:
 *                     type: ObjectId
 *                     description: the user who created the Quiz
 *                   description:
 *                     type: String 
 *                     description: the  description of the quiz
 *                     items:
 *                       type: ObjectId
 *                   listQuestion:
 *                     type: array 
 *                     description: contains all  the questions assigned
 *                     items:
 *                       type: object
 *                       description: a question
 *                       properties:
 *                         formuler:
 *                           type: string
 *                           description : the question to answer 
 *                         professorCreated:
 *                           type: ObjectId
 *                           description: the user who created the Question
 *                         listProposition:
 *                           type: array
 *                           description : all the options to answer    
 *                           items:
 *                             type : object
 *                             description : an option
 *                             properties :
 *                               choice : 
 *                                 type: string
 *                                 description: the text of option
 *                               isTrue :
 *                                 type : boolean
 *                                 description : is that option is right
 *                               point :
 *                                  type : Number
 *                                  description : point assigned to this option
 * 
 *       401:
 *        description:  Not authenticated
 *       403:
 *        description:  Access token does not have the required scope
 *       500:
 *         description: Error we can't find quizes.
 *       default:
 *        description: Unexpected error
 */
router.get('/getQuizes', jwtHelper.verifyJwtToken, ctrlQuiz.findByUserId);

/**
 * @swagger
 * /UpdateQuiz:
 *   put:
 *     security:
 *       - Bearer: []
 *     summary: update Quiz
 *     description: edit a quiz
 *     tags:
 *       - quizes
 *     requestBody:
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - title
 *               - listQuestion
 *             properties:
 *               title:
 *                 type: string
 *                 description: the title of the quiz
 *               description:
 *                 type: string
 *                 description: the description of the quiz
 *               listQuestion:
 *                     type: array 
 *                     description: contains all  the questions assigned
 *                     items:
 *                       type: object
 *                       description: a question
 *                       properties:
 *                         formuler:
 *                           type: string
 *                           description : the question to answer 
 *                         listProposition:
 *                           type: array
 *                           description : all the options to answer    
 *                           items:
 *                             type : object
 *                             description : an option
 *                             properties :
 *                               choice : 
 *                                 type: string
 *                                 description: the text of option
 *                               isTrue :
 *                                 type : boolean
 *                                 description : is that option is right
 *                               point :
 *                                  type : number
 *                                  description : point assigned to this option
 *               
 *     responses:
 *       200:
 *         description: quiz uptadted successful 
 *         schema:
 *           type: object
 *           properties:
 *             message:
 *               type: string
 *       401:
 *        description:  Not authenticated
 *       403:
 *        description:  Access token does not have the required scope
 *       500:
 *         description: Error we can't find the quiz. 
 *       default:
 *        description: Unexpected error    
 */
router.put('/UpdateQuiz', jwtHelper.verifyJwtToken, ctrlQuiz.UpdateQuiz);


// Question Api
router.post('/newQuestion', jwtHelper.verifyJwtToken, ctrlQuestion.CreateQuestion);

// Exam Api


/**
 * @swagger
 * /newExam:
 *   post:
 *     security:
 *       - Bearer: []
 *     summary: Create Exam
 *     description: Create a new exam
 *     tags:
 *       - exams
 *     requestBody:
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - title
 *               - listQuiz
 *               - class
 *             properties:
 *               title:
 *                 type: string
 *                 description: the title of exam
 *               comment:
 *                 type: string
 *                 description: the comment of the exam
 *               class :
 *                 type : string
 *                 description: the id of class assigned
 *               listQuiz:
 *                     type: array 
 *                     description: contains all id of the quizes assigned
 *                     items:
 *                       type: string
 *                       description: all id of quiz                   
 *               
 *     responses:
 *       200:
 *         description: exam created successful 
 *         schema:
 *           type: object
 *           properties:
 *             message:
 *               type: string
 *       401:
 *        description:  Not authenticated
 *       403:
 *        description:  Access token does not have the required scope
 *       433:
 *        description: Unprocessable Entity  
 *       default:
 *        description: Unexpected error    
 */
router.post('/newExam', jwtHelper.verifyJwtToken, ctrlExam.CreateExam);
/**
 * @swagger
 * /getExamById:
 *   get:
 *     security:
 *       - Bearer: []
 *     summary: get an Exam by exam id 
 *     description: Returns a exam by the id for this user.
 *     tags:
 *       - exams
 *     responses:
 *       200:
 *         description: an exam
 *         schema:
 *                 type: object
 *                 description: an exam
 *                 properties:
 *                   title:
 *                     type: String
 *                     description: the title of the exam
 *                   dateCreation:
 *                     type: Date
 *                     description: the creation date
 *                   professorCreated:
 *                     type: ObjectId
 *                     description: the user who created the exam
 *                   class:
 *                     type: ObjectId
 *                     description: the class assigned
 *                   comment:
 *                     type: String 
 *                     description: the  comment of the exam
 *                     items:
 *                       type: ObjectId
 *                   listQuiz:
 *                     type: array 
 *                     description: contains all quizes assigned
 *                     items:
 *                       type: object
 *                       properties:
 *                         title:
 *                           type: string
 *                           description: the title of the quiz
 *                         dateCreation:
 *                           type: Date
 *                           description: the creation date
 *                         professorCreated:
 *                           type: ObjectId
 *                           description: the user who created the quiz 
 *                         description:
 *                           type: string
 *                           description: the description of the quiz
 *                         listQuestion:
 *                           type: array 
 *                           description: contains all  the questions assigned
 *                           items:
 *                             type: object
 *                             description: a question
 *                             properties:
 *                               formuler:
 *                                 type: string
 *                                 description : the question to answer 
 *                               professorCreated:
 *                                 type: string
 *                                 description: the user who created the question 
 *                               listProposition:
 *                                 type: array
 *                                 description : all the options to answer    
 *                                 items:
 *                                   type : object
 *                                   description : an option
 *                                   properties :
 *                                     choice : 
 *                                       type: string
 *                                       description: the text of option
 *                                     isTrue :
 *                                       type : boolean
 *                                       description : is that option is right
 *                                     point :
 *                                       type : number
 *                                       description : point assigned to this option
 *       401:
 *        description:  Not authenticated
 *       403:
 *        description:  Access token does not have the required scope
 *       500:
 *         description: Error we can't find exams.
 *       default:
 *        description: Unexpected error
 */
router.post('/getExamById', jwtHelper.verifyJwtToken, ctrlExam.findByExamId);
/**
 * @swagger
 * /getAllExam:
 *   get:
 *     security:
 *       - Bearer: []
 *     summary: getAllExam of user
 *     description: Returns a list of all the exams created by this user.
 *     tags:
 *       - exams
 *     responses:
 *       200:
 *         description: List of exams
 *         schema:
 *           type: array
 *           description: all the exams in array of exam
 *           items:
 *                 type: object
 *                 description: an exam
 *                 properties:
 *                   title:
 *                     type: String
 *                     description: the title of the exam
 *                   dateCreation:
 *                     type: Date
 *                     description: the creation date
 *                   professorCreated:
 *                     type: ObjectId
 *                     description: the user who created the exam
 *                   class:
 *                     type: ObjectId
 *                     description: the class assigned
 *                   comment:
 *                     type: String 
 *                     description: the  comment of the exam
 *                     items:
 *                       type: ObjectId
 *                   listQuiz:
 *                     type: array 
 *                     description: contains all quizes assigned
 *                     items:
 *                       type: object
 *                       properties:
 *                         title:
 *                           type: string
 *                           description: the title of the quiz
 *                         dateCreation:
 *                           type: Date
 *                           description: the creation date
 *                         professorCreated:
 *                           type: ObjectId
 *                           description: the user who created the quiz 
 *                         description:
 *                           type: string
 *                           description: the description of the quiz
 *                         listQuestion:
 *                           type: array 
 *                           description: contains all  the questions assigned
 *                           items:
 *                             type: object
 *                             description: a question
 *                             properties:
 *                               formuler:
 *                                 type: string
 *                                 description : the question to answer 
 *                               professorCreated:
 *                                 type: string
 *                                 description: the user who created the question 
 *                               listProposition:
 *                                 type: array
 *                                 description : all the options to answer    
 *                                 items:
 *                                   type : object
 *                                   description : an option
 *                                   properties :
 *                                     choice : 
 *                                       type: string
 *                                       description: the text of option
 *                                     isTrue :
 *                                       type : boolean
 *                                       description : is that option is right
 *                                     point :
 *                                       type : number
 *                                       description : point assigned to this option
 *       401:
 *        description:  Not authenticated
 *       403:
 *        description:  Access token does not have the required scope
 *       500:
 *         description: Error we can't find exams.
 *       default:
 *        description: Unexpected error
 */
router.get('/getAllExam', jwtHelper.verifyJwtToken, ctrlExam.getAllExam);
/**
 * @swagger
 * /getExamsOfClass:
 *   post:
 *     security:
 *       - Bearer: []
 *     summary: get class's exams 
 *     description: Returns a list of all the exams of a class and created by this user.
 *     tags:
 *       - exams
 *     requestBody:
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - _id
 *             properties:
 *               _id:
 *                 type: string
 *                 description: the id of the class
 *     responses:
 *       200:
 *         description: List of exams
 *         schema:
 *           type: array
 *           description:  all the exams in array of exam
 *           items: 
 *             type: object
 *             description : an exam
 *             properties:
 *                   title:
 *                     type: String
 *                     description: the title of the exam
 *                   dateCreation:
 *                     type: Date
 *                     description: the creation date
 *                   professorCreated:
 *                     type: ObjectId
 *                     description: the user who created the exam
 *                   class:
 *                     type: ObjectId
 *                     description: the class assigned
 *                   comment:
 *                     type: String 
 *                     description: the  comment of the exam
 *                     items:
 *                       type: ObjectId
 *                   listQuiz:
 *                     type: array 
 *                     description: contains all quizes assigned
 *                     items:
 *                       type: object
 *                       properties:
 *                         title:
 *                           type: string
 *                           description: the title of the quiz
 *                         description:
 *                           type: string
 *                           description: the description of the quiz
 *                         dateCreation:
 *                           type: Date
 *                           description: the creation date
 *                         professorCreated:
 *                           type: ObjectId
 *                           description: the user who created the quiz 
 *                         listQuestion:
 *                           type: array 
 *                           description: contains all  the questions assigned
 *                           items:
 *                             type: object
 *                             description: a question
 *                             properties:
 *                               formuler:
 *                                 type: string
 *                                 description : the question to answer 
 *                               professorCreated:
 *                                 type: string
 *                                 description: the user who created the question 
 *                               listProposition:
 *                                 type: array
 *                                 description : all the options to answer    
 *                                 items:
 *                                   type : object
 *                                   description : an option
 *                                   properties :
 *                                     choice : 
 *                                       type: string
 *                                       description: the text of option
 *                                     isTrue :
 *                                       type : boolean
 *                                       description : is that option is right
 *                                     point :
 *                                       type : number
 *                                       description : point assigned to this option
 *       401:
 *        description:  Not authenticated
 *       403:
 *        description:  Access token does not have the required scope
 *       500:
 *         description: Error we can't find exams.
 *       default:
 *        description: Unexpected error
 */
router.post('/getExamsOfClass', jwtHelper.verifyJwtToken, ctrlExam.getExamsOfClass);


/**
 * @swagger
 * /deleteExam:
 *   delete:
 *     security:
 *       - Bearer: []
 *     summary: delete Exam
 *     description: delete a exam
 *     tags:
 *       - exams
 *     requestBody:
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - _id
 *               - class
 *             properties:
 *               _id:
 *                 type: string
 *                 description: the title of exam
 *               class :
 *                 type : string
 *                 description: the id of class assigned

 *     responses:
 *       200:
 *         description: Exam successfully deleted 
 *         schema:
 *           type: object
 *           properties:
 *             message:
 *               type: string
 *             _id:
 *               type : string
 *       401:
 *        description:  Not authenticated
 *       403:
 *        description:  Access token does not have the required scope
 *       500:
 *        description: Exam successfully deleted
 *       default:
 *        description: Unexpected error    
 */
router.delete('/deleteExam', jwtHelper.verifyJwtToken, ctrlExam.deleteExam);





//Submission Api

/**
 * @swagger
 * /newSubmission:
 *   post:
 *     security:
 *       - Bearer: []
 *     summary: Create Submission
 *     description: Create a new submission
 *     tags:
 *       - submissions
 *     requestBody:
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - exam
 *               - answersList
 *               - class
 *             properties:
 *               exam :
 *                 type : string
 *                 description: the id of exam assigned
 *               class :
 *                 type : string
 *                 description: the id of class assigned
 *               answersList:
 *                 type: array
 *                 description : all the options's answers    
 *                 items:
 *                   type : object
 *                   description : an answer
 *                   properties :
 *                     idQuestion : 
 *                       type: string
 *                       description: the id of question to answer
 *                     listProposition :
 *                       type : array
 *                       description : list of answers
 *                       items:
 *                         type : object
 *                         description : an answer
 *                         properties :    
 *                           idPropostion:
 *                             type : number
 *                             description: the id of an option (0 or 1 or 2 or 3 ..)                    
 *                           hisChoice:
 *                             type : boolean
 *                             description: if the student choose true or false                    
 *               
 *     responses:
 *       200:
 *         description: submission created successful
 *         schema:
 *           type: object
 *           properties:
 *             message:
 *               type: string
 *       401:
 *        description:  Not authenticated
 *       403:
 *        description:  Access token does not have the required scope
 *       433:
 *        description: Unprocessable Entity  
 *       default:
 *        description: Unexpected error    
 */
router.post('/newSubmission', jwtHelper.verifyJwtToken, ctrlSubmission.CreateSubmission);

/**
 * @swagger
 * /getSubmissionById:
 *   post:
 *     security:
 *       - Bearer: []
 *     summary: get submission by given id
 *     description: return a submission by given id 
 *     tags:
 *       - submissions
 *     requestBody:
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - _id
 *             properties:
 *               _id :
 *                 type : string
 *                 description: the id of submission             
 *               
 *     responses:
 *       200:
 *         description: submission 
 *         schema:
 *           type: object
 *           properties:
 *               exam :
 *                 type : string
 *                 description: the id of exam assigned
 *               Student :
 *                 type : string
 *                 description: the id of the student who passed the exam
 *               dateCreation :
 *                 type : date
 *                 description: date of submission
 *               class :
 *                 type : string
 *                 description: the id of class assigned
 *               totalPoints :
 *                 type : string
 *                 description: the sum of all questions's point
 *               totalScore :
 *                 type : string
 *                 description: the sum of score obtained
 *               answersList:
 *                 type: array
 *                 description : all the options's answers    
 *                 items:
 *                   type : object
 *                   description : an answer
 *                   properties :
 *                     idQuestion : 
 *                       type: string
 *                       description: the id of question to answer
 *                     correction : 
 *                       type: string
 *                       description: return if his answer is correct or incorrect or incomplete 
 *                     score : 
 *                       type: number
 *                       description: return score obtained for this question
 *                     listProposition :
 *                       type : array
 *                       description : list of answers
 *                       items:
 *                         type : object
 *                         description : an answer
 *                         properties :    
 *                           idPropostion:
 *                             type : number
 *                             description: the id of an option (0 or 1 or 2 or 3 ..)                    
 *                           hisChoice:
 *                             type : boolean
 *                             description: if the student choose true or false     
 *       401:
 *        description:  Not authenticated
 *       403:
 *        description:  Access token does not have the required scope
 *       500:
 *         description: Error we can't find exams.
 *       default:
 *        description: Unexpected error    
 */
router.post('/getSubmissionById', jwtHelper.verifyJwtToken, ctrlSubmission.getSubmissionById);


/**
 * @swagger
 * /getSubmissionByExam:
 *   post:
 *     security:
 *       - Bearer: []
 *     summary: get submissions by exam
 *     description: return a submission by given exam id 
 *     tags:
 *       - submissions
 *     requestBody:
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - _id
 *             properties:
 *               _id :
 *                 type : string
 *                 description: the id of exam             
 *               
 *     responses:
 *       200:
 *         description: submissions 
 *         schema:
 *           type: array
 *           description : all Exam's submission
 *           items:
 *            type: object
 *            properties:
 *               exam :
 *                 type : string
 *                 description: the id of exam assigned
 *               Student :
 *                 type : string
 *                 description: the id of the student who passed the exam
 *               dateCreation :
 *                 type : date
 *                 description: date of submission
 *               class :
 *                 type : string
 *                 description: the id of class assigned
 *               totalPoints :
 *                 type : string
 *                 description: the sum of all questions's point
 *               totalScore :
 *                 type : string
 *                 description: the sum of score obtained
 *               answersList:
 *                 type: array
 *                 description : all the options's answers    
 *                 items:
 *                   type : object
 *                   description : an answer
 *                   properties :
 *                     idQuestion : 
 *                       type: string
 *                       description: the id of question to answer
 *                     correction : 
 *                       type: string
 *                       description: return if his answer is correct or incorrect or incomplete 
 *                     score : 
 *                       type: number
 *                       description: return score obtained for this question
 *                     listProposition :
 *                       type : array
 *                       description : list of answers
 *                       items:
 *                         type : object
 *                         description : an answer
 *                         properties :    
 *                           idPropostion:
 *                             type : number
 *                             description: the id of an option (0 or 1 or 2 or 3 ..)                    
 *                           hisChoice:
 *                             type : boolean
 *                             description: if the student choose true or false     
 *       401:
 *        description:  Not authenticated
 *       403:
 *        description:  Access token does not have the required scope
 *       500:
 *         description: Error we can't find exam. 
 *       default:
 *        description: Unexpected error    
 */
router.post('/getSubmissionByExam', jwtHelper.verifyJwtToken, ctrlSubmission.getSubmissionByExam);

// Poll Api

/**
 * @swagger
 * /newPoll:
 *   post:
 *     security:
 *       - Bearer: []
 *     summary: Create Poll
 *     description: Create a new poll
 *     tags:
 *       - polls
 *     requestBody:
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - question
 *               - option
 *               - class
 *             properties:
 *               question :
 *                 type : string
 *                 description: the question of poll
 *               description :
 *                 type : string
 *                 description: the description of poll
 *               class :
 *                 type : string
 *                 description: the id of class assigned
 *               option:
 *                 type: array
 *                 description : all options to choose   
 *                 items:
 *                   type : object
 *                   description : an answer
 *                   properties :
 *                     proposition : 
 *                       type: string
 *                       description: the  proposition to choose
 *                     vote :
 *                       type : number
 *                       description : the intial vote default = 0
        
 *               
 *     responses:
 *       200:
 *         description: poll created successful
 *         schema:
 *           type: object
 *           properties:
 *             message:
 *               type: string
 *       401:
 *        description:  Not authenticated
 *       403:
 *        description:  Access token does not have the required scope
 *       433:
 *        description: Unprocessable Entity  
 *       default:
 *        description: Unexpected error    
 */
router.post('/newPoll', jwtHelper.verifyJwtToken, ctrlPoll.CreatePoll);

/**
 * @swagger
 * /getPollById:
 *   get:
 *     security:
 *       - Bearer: []
 *     summary: get  Polls
 *     description: get the  polls by user id 
 *     tags:
 *       - polls               
 *     responses:
 *       200:
 *         description: polls
 *         schema:
 *           type: array
 *           description : array of all polls
 *           items:
 *              type: object
 *              description : poll
 *              properties:
 *               _id :
 *                 type : string
 *                 description : the id of the poll
 *               question :
 *                 type : string
 *                 description: the question of the poll
 *               dateCreation :
 *                 type : string
 *                 description: the Creation  date of the poll
 *               description :
 *                 type : string
 *                 description: the description of poll
 *               class :
 *                 type : string
 *                 description: the id of class assigned
 *               option:
 *                 type: array
 *                 description : all options to choose   
 *                 items:
 *                   type : object
 *                   description : an answer
 *                   properties :
 *                     proposition : 
 *                       type: string
 *                       description: the  proposition to choose
 *                     vote :
 *                       type : number
 *                       description : the vote
 *       401:
 *        description:  Not authenticated
 *       403:
 *        description:  Access token does not have the required scope
 *       500:
 *         description: Error we can't find user. 
 *       default:
 *        description: Unexpected error    
 */
router.get('/getPollById', jwtHelper.verifyJwtToken, ctrlPoll.findByUserId);



/**
 * @swagger
 * /vote:
 *   put:
 *     security:
 *       - Bearer: []
 *     summary: Vote
 *     description: vote by student
 *     tags:
 *       - polls
 *     requestBody:
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - poll
 *               - choice
 *             properties:
 *               poll :
 *                 type : string
 *                 description: the id of poll
 *               choice :
 *                 type : string
 *                 description: the id of chosen option     
 *               
 *     responses:
 *       200:
 *         description: vote done successful
 *         schema:
 *           type: object
 *           properties:
 *             message:
 *               type: string
 *       401:
 *        description:  Not authenticated
 *       403:
 *        description:  Access token does not have the required scope
 *       500:
 *         description: Error we can't find user or poll.  
 *       default:
 *        description: Unexpected error    
 */
router.put('/vote', jwtHelper.verifyJwtToken, ctrlPoll.pollVote);



module.exports = router;
