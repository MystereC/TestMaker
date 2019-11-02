const mongoose = require('mongoose'), Schema = mongoose.Schema;

var ExamSchema = new mongoose.Schema({

    title: { type: String, required: true },
    dateCreation: Date,
    comment: String,


    professorCreated: {
        type: Schema.Types.ObjectId,
        ref: 'User',
        required: 'professor can\'t be empty'
    },
    class: {
        type: Schema.Types.ObjectId,
        ref: 'Class',
        required: 'class can\'t be empty'
    },
    listQuiz: [{ type: Schema.Types.ObjectId, ref: 'Quiz', required: true }]

});
mongoose.model('Exam', ExamSchema);