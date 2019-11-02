const mongoose = require('mongoose'), Schema = mongoose.Schema;

var optionSchema = new mongoose.Schema(

    {proposition:String , vote:Number});

var PollSchema = new mongoose.Schema({

    dateCreation: Date,
    description: String,
    question: {
        type: String,
        required: 'question can\'t be empty'
    },

    class: {
        type: Schema.Types.ObjectId,
        ref: 'Class',
        required: 'class can\'t be empty'
    },
    professorCreated: {
        type: Schema.Types.ObjectId,
        ref: 'User',
        required: 'professor can\'t be empty'
    },

  option : [optionSchema]

});

mongoose.model('Poll', PollSchema);