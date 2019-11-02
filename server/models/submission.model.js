const mongoose = require('mongoose'), Schema = mongoose.Schema;

var AnswerSchema = new mongoose.Schema(
    {
        idQuestion: { type: Schema.Types.ObjectId, ref: 'Question', required: true },
        listProposition: [{
            idPropostion: { type: Number, required: true },
            hisChoice: { type: Boolean, required: true },
        }],

        correction: { type: String },
        score: { type: Number }
    });

var SubmissionSchema = new mongoose.Schema({
    dateCreation: Date,
    Student: {
        type: Schema.Types.ObjectId,
        ref: 'User',
        required: 'Student can\'t be empty'
    },

    Exam: {
        type: Schema.Types.ObjectId,
        ref: 'Exam',
        required: 'Exam can\'t be empty'
    },
    answersList: [AnswerSchema],
    totalScore: { type: Number },
    totalPoints: { type: Number }

});


mongoose.model('Answer', AnswerSchema);
mongoose.model('Submission', SubmissionSchema);