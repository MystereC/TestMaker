const mongoose = require('mongoose');
const Exam = mongoose.model('Exam');
const User = mongoose.model('User');
const Quiz = mongoose.model('Quiz');
const Question = mongoose.model('Question');
const Submission = mongoose.model('Submission');

/**
 * post an submission in database.
 * @param {any} req - an object containing information about the HTTP request.
 * @param {any} res - an object containing information about theHTTP response.
 * @param {function} next - a function to execute after this
 */
module.exports.CreateSubmission = (req, res, next) => {
    var mySubmission = new Submission();
    mySubmission.Exam = req.body.Exam;
    mySubmission.dateCreation = new Date();
    mySubmission.Student = req._id;
    mySubmission.answersList = req.body.answersList;
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
     * @returns {Submission} - the submission 
     */
    var callMyPromiseToGetQuestion = async () => {
        mySubmission.totalScore = 0;
        mySubmission.totalPoints = 0;
        for (let i = 0; i < mySubmission.answersList.length; i++) {
            var result = await (promiseToGetQuestion(mySubmission.answersList[i].idQuestion));
            mySubmission.answersList[i].score = calculScore(result, mySubmission.answersList[i])
            mySubmission.totalScore += mySubmission.answersList[i].score;
            mySubmission.totalPoints += calculNumbersPoint(result);
        }
        return mySubmission;
    };
    //call the function callMyPromiseToGetQuestion()
    callMyPromiseToGetQuestion().then(function (result) {
        result.save((err, doc) => {
            if (!err) {
                res.status(200).send({ _id: doc._id, message: " submission created successful " });
                User.findOne({ _id: mySubmission.Student })
                    .exec(function (err, myUser) {
                        if (myUser.arrayOfSubmissions == null) {
                            myUser.arrayOfSubmissions = [];
                        }
                        myUser.arrayOfSubmissions.push(doc._id);
                        var query = { arrayOfSubmissions: myUser.arrayOfSubmissions };
                        myUser.updateOne(query, (err, doc) => {
                        });
                    });
            }
            else {
                return next(err);
            }
        });
    });
}


/**
* a function to verify if all answers are correct
* @param {Question} question - array of question.
*  @param {Answer} answers - array of answer.
* @returns {boolean} -  true if all answers are correct else false
 */
var verifyAllAnswerAreCorrect = (question, answers) => {
    let test = true;
    let i = 0;
    while (i < question.listProposition.length && test == true) {
        if (question.listProposition[i].isTrue != answers.listProposition[i].hisChoice)
            test = false;
        i++;
    }
    return test;
}
/**
* a function to verify if all answers are not correct
* @param {Question} question - array of question.
*  @param {Answer} answers - array of answer.
* @returns {boolean} -  true if all answers are  not correct else false
 */
var verifyAllAnswerAreNotCorrect = (question, answers) => {
    let test = true;
    let i = 0;
    while (i < question.listProposition.length && test == true) {
        if (answers.listProposition[i].hisChoice == true) {
            if (question.listProposition[i].isTrue == true)
                test = false;
        }
        i++;
    }
    return test;
}
/**
* a function to calcul scroe for  a question
* @param {Question} question - array of question.
*  @param {Answer} answers - array of answer.
* @returns {number} -  sum of point for correct answers
 */
var calculScore = (question, answers) => {
    let score = 0;
    if (verifyAllAnswerAreCorrect(question, answers) == true) {
        for (let i = 0; i < question.listProposition.length; i++) {
            if (question.listProposition[i].isTrue == true) {
                score += question.listProposition[i].point;
            }
        }
        answers.correction = "correct";
    }
    else if (verifyAllAnswerAreNotCorrect(question, answers) == false) {
        for (let i = 0; i < question.listProposition.length; i++) {
            if (question.listProposition[i].isTrue == true) {
                if (answers.listProposition[i].hisChoice == true) {
                    score += question.listProposition[i].point;
                }
            }
        }
        answers.correction = "incomplete";
    } else {
        answers.correction = "incorrect";
    }
    return score;
}
/**
* a function to calcul all point of a question
* @param {Question} question - array of question.
* @returns {number} -  sum of point for correct answers
 */
var calculNumbersPoint = (question) => {
    let totalPoints = 0;
    for (let i = 0; i < question.listProposition.length; i++) {
        totalPoints += question.listProposition[i].point;
    }
    return totalPoints;
}
/**
 *  get a submission by  id.
 * @param {any} req - an object containing information about the HTTP request.
 * @param {any} res - an object containing information about theHTTP response.
 */
module.exports.getSubmissionById = (req, res) => {
    Submission.findOne({ _id: req.body._id })
        .exec(function (err, mySubmission) {
            if (err) {
                if (err.kind === 'ObjectId') {
                    return res.status(404).send({
                        message: "submission not found with given submission Id " + req.body._id
                    });
                }
                return res.status(500).send({
                    message: "Error retrieving submission with given submission Id " + req.body._id
                });
            }
            else {

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
                    res.send(mySubmission);
                });
            }
        });
};

/**
 * get a submission by given exam id
 * @param {any} req - an object containing information about the HTTP request.
 * @param {any} res - an object containing information about theHTTP response.
 */
module.exports.getSubmissionByExam = (req, res) => {
    Submission.find({ Exam: req.body._id })
        .exec(function (err, mySubmission) {
            if (err) {
                if (err.kind === 'ObjectId') {
                    return res.status(404).send({
                        message: "Submission not found with given exam Id " + req.body._id
                    });
                }
                return res.status(500).send({
                    message: "Error retrieving Submission with given exam Id " + req.body._id
                });
            }
            else {

                /**
                * a function to Update User in database in synchronous mode 
                * @param {string} studentId - the _id of student.
                * *@param {string} studentId - the _id of submission.
                * @returns {Promise} - Promise object represents the object user or the error 
                */
                var promiseToGetStudent = (studentId) => {
                    return new Promise((resolve, reject) => {
                        User.findOne({ _id: studentId },
                            (err, user) => {
                                var student = new User();
                                student._id = studentId;
                                student.firstName = user.firstName;
                                student.lastName = user.lastName;
                                student.email = user.email;
                                err ? reject(err) : resolve(student);
                            }
                        );
                    });
                };
                /**
                 * a function to get exam ans student from database in synchronous mode 
                 * @returns {Submission[]} - the array of submission  
                 */
                var callMyPromiseToGetExamAndStudent = async () => {
                    for (var k = 0; k < mySubmission.length; k++) {
                        var result = await (promiseToGetExam(mySubmission[k].Exam));
                        mySubmission[k].Exam = result
                        var result2 = await (promiseToGetStudent(mySubmission[k].Student));
                        mySubmission[k].Student = result2
                    }
                    return mySubmission;
                };
                //call the function callMyPromiseToGetExam()
                callMyPromiseToGetExamAndStudent().then(function (result) {
                    res.send(mySubmission);
                });
            }
        });
};


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