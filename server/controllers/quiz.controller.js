const mongoose = require('mongoose');

const Quiz = mongoose.model('Quiz');
const Question = mongoose.model('Question');
/**
 * post a quiz in database.
 * @param {any} req - an object containing information about the HTTP request.
 * @param {any} res - an object containing information about theHTTP response.
 * @param {function} next - a function to execute after this
 */
module.exports.CreateQuiz = (req, res, next) => {
    var myQuiz = new Quiz();
    myQuiz.title = req.body.title;
    myQuiz.dateCreation = new Date();
    myQuiz.professorCreated = req._id;
    myQuiz.description = req.body.description;
    var list = new Array();
    list = req.body.listQuestion;
    list.forEach(el => {
        var myQuestion = new Question();
        myQuestion.formuler = el.formuler;
        myQuestion.professorCreated = req._id;
        myQuestion.listProposition = el.listProposition;
        myQuiz.listQuestion.push(myQuestion._id);
        myQuestion.save(err => { });
    });
    myQuiz.save((err, doc) => {
        if (!err)
            res.status(200).send({
                message: "quiz created successful "
            });
        else {
            return next(err);
        }
    });
}
/**
 *  get all quizes by  professor.
 * @param {any} req - an object containing information about the HTTP request.
 * @param {any} res - an object containing information about theHTTP response.
 */
module.exports.findByUserId = (req, res) => {
    Quiz.find({ professorCreated: req._id })
        .exec(function (err, quizes) {
            if (err) {
                if (err.kind === 'ObjectId') {
                    return res.status(404).send({
                        message: "Quiz not found with given professor Id " + req._id
                    });
                }
                return res.status(500).send({
                    message: "Error retrieving Quiz with given professor Id " + req._id
                });
            }
            else if (quizes.length != 0) {
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
                    for (var i = 0; i < quizes.length; i++) {
                        for (var j = 0; j < quizes[i].listQuestion.length; j++) {
                            var result = await (promiseToGetQuestion(quizes[i].listQuestion[j]._id));
                            quizes[i].listQuestion[j] = result
                        }
                    }
                    return quizes;
                };
                //call the function callMyPromiseToGetQuestion()
                callMyPromiseToGetQuestion().then(function (result) {
                    res.send(quizes);
                });
            }
        });
};
/**
 *  edit a quiz.
 * @param {any} req - an object containing information about the HTTP request.
 * @param {any} res - an object containing information about theHTTP response.
 */
module.exports.UpdateQuiz = (req, res) => {
    var myQuiz = new Quiz();
    myQuiz_id = req.body_id;
    myQuiz.title = req.body.title;
    myQuiz.description = req.body.description;
    var list = new Array();
    list = req.body.listQuestion;
    /**
     * a function to update  question in database in synchronous mode 
     * @param {Question} newQuestion - the _id of question.
     * @returns {Promise} - Promise object represents the object Question or the error 
    */
    var promiseToUpdateQuestion = (newQuestion) => {
        return new Promise((resolve, reject) => {
            Question.findOne({ _id: newQuestion._id },
                (err, oldQuestion) => {
                    var query = { formuler: newQuestion.formuler, listProposition: newQuestion.listProposition };
                    oldQuestion.updateOne(query, (err, question) => {
                        err ? reject(err) : resolve(question);
                    });
                }
            );
        });
    };
    /**
     * a function to call promiseToUpdateQuestion() and update in synchronous mode 
     * @returns {Question} - the question 
     */
    var callMyPromiseToUpdateQuestion = async () => {
        for (var i = 0; i < list.length; i++) {
            var result = await (promiseToUpdateQuestion(list[i]));
        }
        return list;
    };

    //call the function callMyPromiseToUpdateQuestion()
    callMyPromiseToUpdateQuestion().then(function (result) {
        Quiz.findOne({ _id: req.body._id })
            .exec(function (err, quiz) {
                if (err) {
                    if (err.kind === 'ObjectId') {
                        return res.status(404).send({
                            message: "Quiz not found with given quiz Id " + req._id
                        });
                    }
                    return res.status(500).send({
                        message: "Error retrieving Quiz with given quiz Id " + req._id
                    });
                }
                else {
                    var query2 = { title: myQuiz.title, description: myQuiz.description };
                    quiz.update(query2, { new: true }, (err, doc) => {
                        if (!err)
                            res.send(doc);
                        else {
                            res.send(err);
                        }
                    });
                }
            });
    });
}
