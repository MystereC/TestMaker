const mongoose = require('mongoose');
const Class = mongoose.model('Class');
const User = mongoose.model('User');

/**
 * post a Class in database.
 * @param {any} req - an object containing information about the HTTP request.
 * @param {any} res - an object containing information about theHTTP response.
 * @param {function} next - a function to execute after this
 */
module.exports.CreateClass = (req, res, next) => {
    var myClass = new Class();
    myClass.title = req.body.title;
    myClass.university = req.body.university;
    myClass.professorCreated = req._id;
    myClass.arrayOfExams = [];
    myClass.arrayOfStudents = [];
    myClass.arrayOfPolls = [];
    myClass.save((err, doc) => {
        if (!err)
            res.status(200).send(doc);
        else {
            return res.status(433).send(err);
        }

    });
}
/**
 * get all the classes of a professor
 * @param {any} req - an object containing information about the HTTP request.
 * @param {any} res - an object containing information about theHTTP response.
 */
module.exports.findClassesByProfessorId = (req, res) => {

    Class.find({ professorCreated: req._id })
        .exec(function (err, classes) {
            if (err) {
                if (err.kind === 'ObjectId') {
                    return res.status(404).send({
                        message: "Class not found with given  professor Id " + req._id
                    });
                }
                return res.status(500).send({
                    message: "Error retrieving Class with given professor Id " + req._id
                });
            }

            res.send(classes);
        });
};

/**
 * get all the classes in database
 * @param {any} req - an object containing information about the HTTP request.
 * @param {any} res - an object containing information about theHTTP response.
 */
module.exports.getAllClasses = (req, res) => {
    Class.find()
        .exec(function (err, classes) {
            if (err) {
                return res.status(500).send({
                    message: " Error we can't find classes "
                });
            }
            /**
             * a function to get the whole professor from database in synchronous mode
             * @param {string} profId - the _id of the professor.
             * @returns {Promise} - Promise object represents the object user or the error 
             */
            var promiseToGetProfessor = (profId) => {
                return new Promise((resolve, reject) => {
                    User.findOne({ _id: profId },
                        (err, user) => {
                            var professor = new User();
                            professor._id = profId;
                            professor.firstName = user.firstName;
                            professor.lastName = user.lastName;
                            professor.email = user.email;

                            err ? reject(err) : resolve(professor);
                        }
                    );
                });
            };
              /**
              * a function to get professor for each class from database in synchronous mode 
              * @returns {Class[]} - array of Class
              */
            var callPromiseToGetProfessor = async () => {
                for (var i = 0; i < classes.length; i++) {
                    var result = await (promiseToGetProfessor(classes[i].professorCreated));
                    classes[i].professorCreated = result
                }
                return classes;
            };
            //call the function callPromiseToGetProfessor()
            callPromiseToGetProfessor().then(function (result) {
                res.send(classes);
            });
        });


};
/**
 * subscribe an student to an classe
 * @param {any} req - an object containing information about the HTTP request.
 * @param {any} res - an object containing information about theHTTP response.
 */
module.exports.subscribeInClass = (req, res) => {
    Class.findOne({ _id: req.body._id })
        .exec(function (err, myClass) {
            if (err) {
                return res.status(500).send({
                    message: " Error we can't find class with this Class ID " + req.body._id
                });
            }
            else {
                var notRegisteredYet = true;
                var i = 0;
                while (i < myClass.arrayOfStudents.length && notRegisteredYet === true) {
                    if (myClass.arrayOfStudents[i] == req._id)
                        notRegisteredYet = false;
                    i++;
                }
                if (notRegisteredYet) {
                    myClass.arrayOfStudents.push(req._id);
                    User.findOne({ _id: req._id })
                        .exec(function (err, user) {
                            if (err) {
                                return res.status(500).send({
                                    message: "failed to find user with this Id " + req._id
                                });
                            }
                            user.arrayOfClasses.push(myClass._id);
                            var query = { arrayOfClasses: user.arrayOfClasses };
                            user.update(query, (err, doc) => {
                                if (err) {
                                    return next(err);
                                }
                            });
                        });

                    myClass.save((err, doc) => {
                        if (!err)
                            res.send(doc);
                        else {
                            return next(err);
                        }
                    });
                }
                else {
                    return res.status(500).send({
                        message: "Student already registered in class "
                    });
                }


            }
        });
}

module.exports.getAllSutudentOfClass = (req, res) => {
    Class.findOne({ _id: req.body._id })
        .exec(function (err, classes) {
            if (err) {
                if (err.kind === 'ObjectId') {
                    return res.status(404).send({
                        message: "Class not found with given class Id " + req.body._id
                    });
                }
                return res.status(500).send({
                    message: "Error retrieving Class with given class Id " + req.body._id
                });
            }

             /**
             * a function to get the whole student from database in synchronous mode
             * @param {string} studentId - the _id of the student.
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
              * a function to get all students for each class from database in synchronous mode 
              * @returns {Class[]} - array of Class
              */
            var callMyPromiseToGetStudent = async () => {
                for (var i = 0; i < classes.arrayOfStudents.length; i++) {
                    var result = await (promiseToGetStudent(classes.arrayOfStudents[i]));
                    classes.arrayOfStudents[i] = result
                }
                return classes;
            };
            //call the function callMyPromiseToGetStudent()
            callMyPromiseToGetStudent().then(function (result) {
                res.send(result.arrayOfStudents);
            });
        });
};

module.exports.getAllExamsOfClass = (req, res) => {
    Class.findOne({ _id: req.body._id })
        .exec(function (err, classes) {
            if (err) {
                if (err.kind === 'ObjectId') {
                    return res.status(404).send({
                        message: "Class not found with given class Id " + req.body._id
                    });
                }
                return res.status(500).send({
                    message: "Error retrieving Class with given class Id " + req.body._id
                });
            }
                /**
                 * a function to get the whole exam from database in synchronous mode 
                 * @param {string} ExamId - the _id of exam.
                 * @returns {Promise} - Promise object represents the object Exam or the error 
                 */
            var promiseToGetExam = (ExamId) => {
                return new Promise((resolve, reject) => {
                    Exam.findOne({ _id: ExamId },
                        (err, exam) => {
                            err ? reject(err) : resolve(exam);
                        }
                    );
                });
            };
            /**
            * a function to get all exams from database in synchronous mode 
            * @returns {Class[]} - array of Class
            */
            var callMyPromiseToGetExam = async () => {
                for (var i = 0; i < classes.arrayOfExams.length; i++) {
                    var result = await (promiseToGetExam(classes.arrayOfExams[i]));
                    classes.arrayOfExams[i] = result
                }
                return classes;
            };
            //call the function callMyPromiseToGetExam()
            callMyPromiseToGetExam().then(function (result) {
                res.send(result.arrayOfExams);
            });
        });
};


/**
 * remove student from a class
 * @param {any} req - an object containing information about the HTTP request.
 * @param {any} res - an object containing information about theHTTP response.
 */
module.exports.unsubscribeInClass = (req, res) => {
    Class.findOne({ _id: req.body.class })
        .exec(function (err, myClass) {
            if (err) {
                return res.status(500).send({
                    message: "Error retrieving Class with given Class Id "
                });
            }
            else {
                for (let i = 0; i < myClass.arrayOfStudents.length; i++) {
                    if (myClass.arrayOfStudents[i].toString() == req.body.student.toString()) {
                        myClass.arrayOfStudents.splice(i, 1);
                    }
                }
                var query = { arrayOfStudents: myClass.arrayOfStudents };
                myClass.updateOne(query, (err, doc) => { });
                User.findOne({ _id: req.body.student }).exec(function (err, user) {
                    if (err) {
                        return res.status(500).send({ message: "Error " });
                    }
                    for (let i = 0; i < user.arrayOfClasses.length; i++) {
                        if (user.arrayOfClasses[i].toString() == myClass._id.toString()) {
                            user.arrayOfClasses.splice(i, 1);
                        }
                    }
                    var query2 = { arrayOfClasses: user.arrayOfClasses };
                    user.updateOne(query2, (err, doc) => {
                        res.status(200).send({
                            message: "student is removed from this class " 
                        });
                    });

                });
            }
        });
}
