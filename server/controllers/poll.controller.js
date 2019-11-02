const mongoose = require('mongoose');
const Poll = mongoose.model('Poll');
const Class = mongoose.model('Class');

/**
 * post a poll in database.
 * @param {any} req - an object containing information about the HTTP request.
 * @param {any} res - an object containing information about theHTTP response.
 * @param {function} next - a function to execute after this
 */
module.exports.CreatePoll = (req, res, next) => {
    var poll = new Poll();
    poll.dateCreation = new Date();
    poll.description = req.body.description;
    poll.question = req.body.question;
    poll.professorCreated = req._id;
    poll.class = req.body.class;
    poll.option = req.body.option;
    poll.save((err, doc) => {
        if (!err) {
            Class.findOne({ _id: doc.class })
                .exec(function (err, myClass) {
                    if (err)
                        return next(err);
                    else {
                        myClass.arrayOfPolls.push(doc._id);
                        var query = { arrayOfPolls: myClass.arrayOfPolls };
                        myClass.updateOne(query, (err, doc) => {
                            if (err)
                                return next(err);
                            res.send(doc);
                        });
                    }
                });
        }
        else {
            return next(err);
        }
    });
}
/**
 *  get all polls by  professor.
 * @param {any} req - an object containing information about the HTTP request.
 * @param {any} res - an object containing information about theHTTP response.
 */
module.exports.findByUserId = (req, res) => {
    Poll.find({ professorCreated: req._id })
        .exec(function (err, polls) {
            if (err) {
                if (err.kind === 'ObjectId') {
                    return res.status(404).send({
                        message: "poll not found with given professor Id " + req._id
                    });
                }
                return res.status(500).send({
                    message: "poll retrieving Student with given professor Id " + req._id
                });
            }
            /**
             * a function to get the whole class from database in synchronous mode
             * @param {string} ClassId - the _id of the class.
             * @returns {Promise} - Promise object represents the object Class or the error 
             */
            var promiseToGetClass = (classId) => {
                return new Promise((resolve, reject) => {
                    Class.findOne({ _id: classId },
                        (err, myClass) => {
                            err ? reject(err) : resolve(myClass);
                        }
                    );
                });
            };
            /**
             * a function to get class for each poll from database in synchronous mode 
             * @returns {Poll[]} - the polls 
                */
            var callPromiseToGetClass = async () => {
                for (var i = 0; i < polls.length; i++) {
                    var result = await (promiseToGetClass(polls[i].class));
                    polls[i].class = result
                }
                return polls;
            };
            //call the function callPromiseToGetClass()
            callPromiseToGetClass().then(function (result) {
                return res.send(polls);
            });
        });
};
/**
 *  vote for a poll.
 * @param {any} req - an object containing information about the HTTP request.
 * @param {any} res - an object containing information about theHTTP response.
 */
module.exports.pollVote = (req, res, ) => {
    Poll.findOne({ _id: req.body.poll })
        .exec(function (err, poll) {
            if (err) {
                if (err.kind === 'ObjectId') {
                    return res.status(404).send({
                        message: "poll not found with given poll Id " + req.body.poll
                    });
                }
                return res.status(500).send({
                    message: "Error retrieving poll with given poll Id " + req.body.poll
                });
            }
            poll.option[req.body.choice].vote += 1;
            var query = { option: poll.option };
            poll.updateOne(query, (err, doc) => {
                if (err)
                    return res.status(503).send(err);
                res.status(200).send({ message: "you voted " });
            });
        });
}