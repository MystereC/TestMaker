const mongoose = require('mongoose');
const Question = mongoose.model('Question');
/**
 * post a question in database.
 * @param {any} req - an object containing information about the HTTP request.
 * @param {any} res - an object containing information about theHTTP response.
 * @param {function} next - a function to execute after this
 */
module.exports.CreateQuestion = (req, res, next) => {
    var myQuestion = new Question();
    myQuestion.formuler = req.body.formuler;
    myQuestion.professorCreated = req._id;
    myQuestion.listProposition = req.body.listProposition;
    myQuestion.save((err, doc) => {
        if (!err)
            res.send(doc);
        else {
            return next(err);
        }
    });
}