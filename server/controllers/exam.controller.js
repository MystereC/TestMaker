const mongoose = require('mongoose');
const User = mongoose.model('User');
const Exam = mongoose.model('Exam');
const Quiz = mongoose.model('Quiz');
const Class = mongoose.model('Class');
const Question = mongoose.model('Question');
const Submission = mongoose.model('Submission');

/**
 * post an Exam in database.
 * @param {any} req - an object containing information about the HTTP request.
 * @param {any} res - an object containing information about theHTTP response.
 * @param {function} next - a function to execute after this
 */
module.exports.CreateExam = (req, res, next) => {
    var myExam = new Exam();
    myExam.title = req.body.title;
    myExam.dateCreation = new Date();
    myExam.professorCreated = req._id;
    myExam.comment = req.body.comment;
    myExam.listQuiz = req.body.listQuiz;
    myExam.class = req.body.class;

    myExam.save((err, doc) => {
        if (!err) {
            res.status(200).send({ message: " exam created successful " });
            Class.findOne({ _id: myExam.class })
                .exec(function (err, myClass) {
                    if (err) {
                        if (err.kind === 'ObjectId') {
                            return res.status(404).send({
                                message: "Class not found with given  Exam.class Id " + myExam.class
                            });
                        }
                        return res.status(500).send({
                            message: "Error retrieving Class with given Exam.class  Id " + req._id
                        });
                    }
                    myClass.arrayOfExams.push(doc._id);
                    var query = { arrayOfExams: myClass.arrayOfExams };
                    myClass.updateOne(query, (err, doc) => {
                    });
                });
        }
        else {
            return next(err);
        }

    });

}
/**
 * Returns a exam by the id for this user.
 * @param {any} req - an object containing information about the HTTP request.
 * @param {any} res - an object containing information about theHTTP response.
 * @param {function} next - a function to execute after this
 */
module.exports.findByExamId = (req, res) => {

    Exam.findOne({ _id: req.body._id })
        .exec(function (err, exam) {
            if (err) {
                if (err.kind === 'ObjectId') {
                    return res.status(404).send({
                        Exam: "Exam not found with given exam Id " + req.body._id
                    });
                }
                return res.status(500).send({
                    message: "Error retrieving Exam with given exam Id " + req.req.body._id
                });
            }

            else if (exam) {

                //declare a new function callPromiseToGetQuiz() in synchronous mode 
               /**
               * a function to get all quiz from database in synchronous mode 
              * @returns {Exam} - the exam  
               */
                var callPromiseToGetQuiz = async () => {
                    for (var i = 0; i < exam.listQuiz.length; i++) {
                        var result = await (promiseToGetQuiz(exam.listQuiz[i]));
                        exam.listQuiz[i] = result
                    }
                    return exam;
                };
                //call the function callPromiseToGetQuiz()
                callPromiseToGetQuiz().then(function (result) {
                    res.send(exam);
                });
            }
        });
}

/**
 *  list of all the exams created by  user.
 * @param {any} req - an object containing information about the HTTP request.
 * @param {any} res - an object containing information about theHTTP response.
 */
module.exports.getAllExam = (req, res) => {
    Exam.find({ professorCreated: req._id })
        .exec(function (err, exams) {
            if (err) {
                if (err.kind === 'ObjectId') {
                    return res.status(404).send({
                        message: "Exam not found with given professor Id " + req._id
                    });
                }
                return res.status(500).send({
                    message: "Error retrieving Exam with given professor Id " + req._id
                });
            }
            else if (exams.length != 0) {

                //call the function callPromiseToGetQuiz()
                callPromiseToGetQuiz(exams).then(function (result) {
                    res.send(exams);
                });
            }
        });

};
/**
 * get list of all the exams of a class and created by  user.
 * @param {any} req - an object containing information about the HTTP request.
 * @param {any} res - an object containing information about theHTTP response.
 */
module.exports.getExamsOfClass = (req, res) => {
    Exam.find({ professorCreated: req._id, class: req.body._id })
        .exec(function (err, exams) {
            if (err) {
                if (err.kind === 'ObjectId') {
                    return res.status(404).send({
                        message: "Exam not found with given class Id " + req.body._id
                    });
                }
                return res.status(500).send({
                    message: "Error retrieving Exam with given class Id " + req.body._id
                });
            }
            else if (exams.length != 0) {

                //call the function callPromiseToGetQuiz()
                callPromiseToGetQuiz(exams).then(function (result) {
                    return res.send(exams);
                });
            }
        });

};
/**
 * List all the submissions of a student.
 * @param {any} req - an object containing information about the HTTP request.
 * @param {any} res - an object containing information about theHTTP response.
 */
module.exports.deleteExam = (req, res) => {
    Class.findOne({ _id: req.body.class })
        .exec(function (err, myClass) {
            if (!err) {
                for (let i = 0; i < myClass.arrayOfExams.length; i++) {
                    if (myClass.arrayOfExams[i].toString() == req.body._id.toString()) {
                        myClass.arrayOfExams.splice(i, 1);
                    }
                }
                var query = { arrayOfExams: myClass.arrayOfExams };
                myClass.updateOne(query, (err, doc) => {
                });
            }
        });

    Submission.find({ Exam: req.body._id })
        .exec(function (err, submissions) {
            if (!err)
                
            /**
            * a function to Update User in database in synchronous mode 
            * @param {string} studentId - the _id of student.
            * *@param {string} studentId - the _id of submission.
            * @returns {Promise} - Promise object represents the object user or the error 
            */
            var promiseToUpdateArrayOfSubmissionsOfStudent = (studentId, submissionId) => {
                    return new Promise((resolve, reject) => {
                        User.findOne({ _id: studentId }).exec(function (err, user) {
                            if (!err) {
                                for (let i = 0; i < user.arrayOfSubmissions.length; i++) {
                                    if (user.arrayOfSubmissions[i].toString() == submissionId.toString()) {
                                        user.arrayOfSubmissions.splice(i, 1);
                                    }
                                }
                                var query = { arrayOfSubmissions: user.arrayOfSubmissions };
                                user.updateOne(query, (err, doc) => {
                                    err ? reject(err) : resolve(doc);
                                });
                            }
                        });
                    });
                };
            /**
            * a function to delete submission from database in synchronous mode 
            * *@param {string} studentId - the _id of submission.
            * @returns {Promise} - Promise object represents the object submission deleted or the error 
            */
            var promiseToDeleteSubmission = (submissionId) => {
                return new Promise((resolve, reject) => {
                    Submission.deleteOne({ _id: submissionId })
                        .exec(function (err, subm) {
                            err ? reject(err) : resolve(subm);
                        });
                });
            };
                     /**
                 * a function to delete submission and update user from database in synchronous mode 
                 * @returns {Submission} - the last submission deleted 
                 */
            var callPromiseToDeleteSubmission = async () => {
                for (let m = 0; m < submissions.length; m++) {
                    var result = await (promiseToUpdateArrayOfSubmissionsOfStudent(submissions[m].Student, submissions[m]._id));
                    var resul2 = await (promiseToDeleteSubmission(submissions[m]._id));
                }
                return result2;
            };
            //call the function callPromiseToDeleteSubmission()
            callPromiseToDeleteSubmission().then(function (result) {
                Exam.deleteOne({ _id: req.body._id, professorCreated: req.body.professorCreated })
                    .exec(function (err, exam) {
                        if (err) return res.status(500).send(err);
                        const response = {
                            message: "Exam successfully deleted",
                            id: exam._id
                        };
                        return res.status(200).send(response);
                    });
            });
        });
}


/**
* a function to get all quiz for each exam from database in synchronous mode 
* @returns {Exam[]} - the exam  
*/
var callPromiseToGetQuiz = async (exams) => {
    for (var i = 0; i < exams.length; i++) {
        for (var j = 0; j < exams[i].listQuiz.length; j++) {
            var result = await (promiseToGetQuiz(exams[i].listQuiz[j]._id));
            exams[i].listQuiz[j] = result
        }
    }
    return exams;
};

/**
* a function to get the whole quiz from database in synchronous mode 
* @param {string} quizId - the _id of quiz.
* @returns {Promise} - Promise object represents the object Quiz or the error 
 */
var promiseToGetQuiz = (quizId) => {
    return new Promise((resolve, reject) => {
        Quiz.findOne({ _id: quizId },
            (err, quiz) => {
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
        );
    });
};