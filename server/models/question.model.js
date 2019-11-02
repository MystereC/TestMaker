const mongoose = require('mongoose'), Schema = mongoose.Schema;
var QuestionSchema = new mongoose.Schema({

    formuler: { type: String, required: true },
    professorCreated: {
        type: Schema.Types.ObjectId,
        ref: 'User',
        required: 'professor can\'t be empty'
    },
    listProposition: [{
        choice: { type: String, required: true },
        isTrue: { type: Boolean, required: true },
        point: { type: Number, required: true }
    }]


});
mongoose.model('Question', QuestionSchema);