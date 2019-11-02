const mongoose = require('mongoose'), Schema = mongoose.Schema;

var QuizSchema = new mongoose.Schema({

    title: { type: String, required: true },
    dateCreation: Date,
    description: String,


    professorCreated: {
        type: Schema.Types.ObjectId,
        ref: 'User',
        required: 'professor can\'t be empty'
    },
    listQuestion: [{ type: Schema.Types.ObjectId, ref: 'Question', required: true }]

});
mongoose.model('Quiz', QuizSchema);