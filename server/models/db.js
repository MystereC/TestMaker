const mongoose = require('mongoose');

mongoose.connect(process.env.MONGODB_URI, { useNewUrlParser: true, useCreateIndex: true, }, (err) => {
    if (!err) { console.log('MongoDB connection succeeded.'); }
    else { console.log('Error in MongoDB connection : ' + JSON.stringify(err, undefined, 2)); }
});
require('./user.model');
require('./class.model');
require('./quiz.model');
require('./question.model');
require('./exam.model');
require('./submission.model');
require('./poll.model');
