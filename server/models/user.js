var mongoose = require('mongoose');
var bcrypt   = require('bcrypt-nodejs');
var Schema   = mongoose.Schema;

var userSchema = new Schema({
    local            : {
        email        : String,
        password     : String,
        avatar       : { type: String, default: '/images/avatar.png' },
        resetPasswordToken: String,
        resetPasswordExpires: Date
    },
    facebook         : {
        id           : String,
        token        : String,
        email        : String,
        name         : String,
        avatar       : String
    },
    google           : {
        id           : String,
        token        : String,
        email        : String,
        name         : String,
        avatar       : String
    }
});

// userSchema.methods.generateHash = function(password) {
//     return bcrypt.hashSync(password, bcrypt.genSaltSync(8), null);
// };

// // checking if password is valid
// userSchema.methods.validPassword = function(password) {
//     return bcrypt.compareSync(password, this.local.password);
// };

userSchema.methods.comparePassword = function(candidatePassword, callback) {
  bcrypt.compare(candidatePassword, this.password, function(err, isMatch) {
    if (err) return callback(err);
    callback(null, isMatch);
  });
};

userSchema.pre('save', function (next) {
    var user = this,
        SALT_FACTOR = 5;

    // only hash the password if it has been modified (or is new)
    if (!user.isModified('local.password')) return next();  

    bcrypt.genSalt(SALT_FACTOR, function(err, salt) {
        if (err) return next(err);

        bcrypt.hash(user.local.password, salt, null, function(err, hash) {
            if (err) return next(err);
            user.local.password = hash;
            next();
        });
    });
});


module.exports = mongoose.model('User' , userSchema); 