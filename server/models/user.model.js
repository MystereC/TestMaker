const mongoose = require('mongoose'),Schema = mongoose.Schema;
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

var userSchema = new mongoose.Schema({
    firstName: {
        type: String,
        required: 'firstname can\'t be empty'
    },
    lastName: {
        type: String,
        required: 'lastname can\'t be empty'
    },
    email: {
        type: String,
        required: 'email can\'t be empty',
        unique: true
    },
    role: {
        type: String,
        required: 'role can\'t be empty',
    },
    password: {
        type: String,
        required: 'Password can\'t be empty',
        minlength : [4,'Password must be atleast 4 character long']
    },
    saltSecret: String,
    arrayOfClasses: [{ type: Schema.Types.ObjectId, ref: 'Class' }],
    arrayOfSubmissions : [{type: Schema.Types.ObjectId,ref: 'Submission'}]
});
 
// Custom validation for email
userSchema.path('email').validate((val) => {
    emailRegex = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,13}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return emailRegex.test(val);
}, 'Invalid e-mail.');

// Events
userSchema.pre('save', function (next) {
    bcrypt.genSalt(10, (err, salt) => {
        bcrypt.hash(this.password, salt, (err, hash) => {
            this.password = hash;
            this.saltSecret = salt;
            next();
        });
    });
});



// Methods

/**
* a function to verifyPassword
* @param {string} password - the password of user.
* @returns {boolean} -  true if password is correct else false
 */
userSchema.methods.verifyPassword = function (password) {
    return bcrypt.compareSync(password, this.password);
};

/**
* a function to generateJwt
* @returns {string} -  the token generated
 */
userSchema.methods.generateJwt = function () {
    return jwt.sign({ _id: this._id},
        process.env.JWT_SECRET,
    {
                expiresIn: process.env.JWT_EXP
    });
}
mongoose.model('User', userSchema);