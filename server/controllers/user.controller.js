const mongoose = require('mongoose');
const passport = require('passport');
const _ = require('lodash');
const User = mongoose.model('User');
const Class = mongoose.model('Class');
const Exam = mongoose.model('Exam');
const Quiz = mongoose.model('Quiz');
const Question = mongoose.model('Question');
const Submission = mongoose.model('Submission');
const Poll = mongoose.model('Poll');


/**
 * register an user in database.
 * @param {any} req - an object containing information about the HTTP request.
 * @param {any} res - an object containing information about theHTTP response.
 * @param {function} next - a function to execute after this
 */
module.exports.register = (req, res, next) => {
    var user = new User();
    user.firstName = req.body.firstName;
    user.lastName = req.body.lastName;
    user.email = req.body.email;
    user.role = req.body.role;
    user.password = req.body.password;
    user.arrayOfClasses = [];
    user.arrayOfSubmissions = [];
    user.save((err, doc) => {
        if (!err)
            res.status(200).send({ message: " user registered successful " });
        else {
            if (err.code == 11000)
                res.status(422).send(['Duplicate email adrress found.']);
            else
                return next(err);
        }
    });
}
/**
 * authenticate to access and get token
 * @param {any} req - an object containing information about the HTTP request.
 * @param {any} res - an object containing information about theHTTP response.
 * @param {function} next - a function to execute after this
 * 
 */
module.exports.authenticate = (req, res, next) => {
    // call for passport authentication
    passport.authenticate('local', (err, user, info) => {
        // error from passport middleware
        if (err) return res.status(400).json(err);
        // registered user
        else if (user) {
            console.log("user" + user._id + " sign in ")
            return res.status(200).json({ "token": user.generateJwt(), "userRole": user.role });
        }
        // unknown user or wrong password
        else return res.status(404).json(info);
    })(req, res);
}

/**
 * get the user's profile .
 * @param {any} req - an object containing information about the HTTP request.
 * @param {any} res - an object containing information about theHTTP response.
 * @param {function} next - a function to execute after this
 */
module.exports.userProfile = (req, res, next) => {
    User.findOne({ _id: req._id },
        (err, user) => {
            if (!user)
                return res.status(404).json({ status: false, message: 'User record not found.' });
            else
                return res.status(200).json({ status: true, user: _.pick(user, ['lastName', 'firstName', 'email']) });
        }
    );
}
/**
 * List all the classes of a student.
 * @param {any} req - an object containing information about the HTTP request.
 * @param {any} res - an object containing information about theHTTP response.
 */
module.exports.getClassesRegisterd = (req, res) => {
    User.findOne({ _id: req._id })
        .exec(function (err, user) {
            if (err) {

                return res.status(500).send({
                    message: "Error "
                });
            }
            /**
             * a function to get the whole class from database in synchronous mode
             * @param {string} ClassId - the _id of the class.
             * @returns {Promise} - Promise object represents the object Class or the error 
             */
            var promiseToGetClass = (ClassId) => {
                return new Promise((resolve, reject) => {
                    Class.findOne({ _id: ClassId },
                        (err, myClass) => {
                           /**
                            * a function to get the whole exam from database in synchronous mode 
                            * @param {string} ExamId - the _id of exam.
                            * @returns {Promise} - Promise object represents the object Exam or the error 
                            */
                            var promiseToGetExam = (ExamId) => {
                                return new Promise((resolve, reject) => {
                                    Exam.findOne({ _id: ExamId },
                                        (err, myExam) => {
                                            err ? reject(err) : resolve(myExam);
                                        }
                                    );
                                });
                            };
                        
                            /**
                            * a function to get the whole poll from database in synchronous mode 
                            * @param {string} PollId - the _id of poll.
                            * @returns {Promise} - Promise object represents the object Poll or the error 
                            */
                            var promiseToGetPoll = (PollId) => {
                                return new Promise((resolve, reject) => {
                                    Poll.findOne({ _id: PollId },
                                        (err, myPoll) => {
                                            err ? reject(err) : resolve(myPoll);
                                        }
                                    );
                                });
                            };
                             /**
                            * a function to get all polls and exams from database in synchronous mode 
                            * @returns {Class[]} - array of Class
                            */
                            var callMyPromiseToGetExamAndPoll = async () => {
                                for (let j = 0; j < myClass.arrayOfExams.length; j++) {
                                    let result = await (promiseToGetExam(myClass.arrayOfExams[j]));
                                    myClass.arrayOfExams[j] = result
                                }
                                for (let j = 0; j < myClass.arrayOfPolls.length; j++) {
                                    let result = await (promiseToGetPoll(myClass.arrayOfPolls[j]));
                                    myClass.arrayOfPolls[j] = result
                                }
                                return myClass;
                            };
                            //call the function callMyPromiseToGetExamAndPoll()
                            callMyPromiseToGetExamAndPoll().then(function (result) {
                                err ? reject(err) : resolve(result);
                            });
                        }
                    );
                });
            };
              /**
              * a function to get all classes from database in synchronous mode 
              * @returns {User} - the user 
                 */
            var callPromiseToGetClass = async () => {
                for (var i = 0; i < user.arrayOfClasses.length; i++) {
                    var result = await (promiseToGetClass(user.arrayOfClasses[i]._id));
                    user.arrayOfClasses[i] = result
                }
                return user;
            };
            //call the function callPromiseToGetClass()
            callPromiseToGetClass().then(function (result) {
                res.send(result.arrayOfClasses);
            });
        });
};
/**
 * List all the submissions of a student.
 * @param {any} req - an object containing information about the HTTP request.
 * @param {any} res - an object containing information about theHTTP response.
 */
module.exports.getSubmissions = (req, res) => {
    User.findOne({ _id: req._id })
        .exec(function (err, user) {
            if (err) {

                return res.status(500).send({
                    message: "Error "
                });
            }
                 /**
                * a function to get all submissions from database in synchronous mode 
                * @returns {User} - the user 
                 */
            var callPromiseToGetSubmission = async () => {
                for (var i = 0; i < user.arrayOfSubmissions.length; i++) {
                    var result = await (promiseToGetSubmission(user.arrayOfSubmissions[i]._id));
                    user.arrayOfSubmissions[i] = result
                }
                return user;
            };
            //call the function callPromiseToGetSubmission()
            callPromiseToGetSubmission().then(function (result) {
                res.send(result.arrayOfSubmissions);
            });
        });
};



/**
* a function to get the whole submission from database in synchronous mode 
* @param {string} submissionsId - the _id of submission.
* @returns {Promise} - Promise object represents the object submission or the error 
*/
var promiseToGetSubmission = (submissionsId) => {
    return new Promise((resolve, reject) => {
        Submission.findOne({ _id: submissionsId },
            (err, mySubmission) => {
                if (mySubmission) {
                           /**
                            * a function to get the whole exam from database in synchronous mode 
                            * @param {string} ExamId - the _id of exam.
                            * @returns {Promise} - Promise object represents the object Exam or the error 
                            */
                    var promiseToGetExam = (ExamId) => {
                        return new Promise((resolve, reject) => {
                            Exam.findOne({ _id: ExamId },
                                (err, myExam) => {
                                    /**
                                    * a function to get the whole quiz from database in synchronous mode 
                                    * @param {string} quizId - the _id of quiz.
                                    * @returns {Promise} - Promise object represents the object Quiz or the error 
                                    */
                                    var promiseToGetQuiz = (quizId) => {
                                        return new Promise((resolve, reject) => {
                                            Quiz.findOne({ _id: quizId },
                                                (err, quiz) => {
                                                    if (!err) {
                                                            /**
                                                            * a function to get the whole question from database in synchronous mode 
                                                            * @param {string} questionId - the _id of question.
                                                            * @returns {Promise} - Promise object represents the object Question or the error 
                                                             */
                                                        var promiseToGetQuestion = (questionId) => {
                                                            return new Promise((resolve, reject) => {
                                                                Question.findOne({ _id: questionId },
                                                                    (err, question) => {
                                                                        err ? reject(err) : resolve(question);
                                                                    }
                                                                );
                                                            });
                                                        };
                                                        /**
                                                         * a function to get all question from database in synchronous mode 
                                                         * @returns {Quiz} - the quiz 
                                                         */
                                                        var callMyPromiseToGetQuestion = async () => {
                                                            for (var j = 0; j < quiz.listQuestion.length; j++) {
                                                                var result = await (promiseToGetQuestion(quiz.listQuestion[j]));
                                                                quiz.listQuestion[j] = result
                                                            }
                                                            return quiz;
                                                        };
                                                        //call the function callMyPromiseToGetQuestion()
                                                        callMyPromiseToGetQuestion().then(function (result) {
                                                            err ? reject(err) : resolve(result);
                                                        });
                                                    }
                                                    else
                                                        err ? reject(err) : resolve(result);
                                                }
                                            );
                                        });
                                    };

                                    /**
                                     * a function to get all quiz from database in synchronous mode 
                                     * @returns {Exam} - the exam  
                                     */
                                    var callPromiseToGetQuiz = async () => {
                                        for (var i = 0; i < myExam.listQuiz.length; i++) {
                                            var result = await (promiseToGetQuiz(myExam.listQuiz[i]));
                                            myExam.listQuiz[i] = result
                                        }
                                        return myExam;
                                    };
                                    //call the function callPromiseToGetQuiz()
                                    callPromiseToGetQuiz().then(function (result) {
                                        err ? reject(err) : resolve(result);
                                    });
                                }
                            );
                        });
                    };
                    /**
                     * a function to get the exam from database in synchronous mode 
                      * @returns {Submission} - the exam  
                      */
                    var callMyPromiseToGetExam = async () => {
                        var result = await (promiseToGetExam(mySubmission.Exam));

                        mySubmission.Exam = result
                        return mySubmission;
                    };
                    //call the function callMyPromiseToGetExam()
                    callMyPromiseToGetExam().then(function (result) {
                        err ? reject(err) : resolve(result);
                    });
                }
            });
    });
};