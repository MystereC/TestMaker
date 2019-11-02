const mongoose = require('mongoose'), Schema = mongoose.Schema;


var ClassSchema = new mongoose.Schema({
    title: {
        type: String,
        required: 'title can\'t be empty'
    },
    university: {
        type: String,
        required: 'university can\'t be empty'
    },
    professorCreated: {
        type: Schema.Types.ObjectId,
        ref: 'User',
        required: 'professor can\'t be empty'
    },
    arrayOfStudents: [{ type: Schema.Types.ObjectId, ref: 'User' }],
    arrayOfExams: [{ type: Schema.Types.ObjectId, ref: 'Exam' }],
    arrayOfPolls: [{ type: Schema.Types.ObjectId, ref: 'Poll' }]

});
mongoose.model('Class', ClassSchema);