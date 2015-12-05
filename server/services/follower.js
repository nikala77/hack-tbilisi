var mongoose =  require('mongoose');
var follower =  mongoose.model('Follower');
var errorUtil    = require('../util/errorUtil');

exports.addFolower = function(followerData) {
    return follower.findOne(followerData)
    .then(function(data) {
        if(data) {
    		return errorUtil.rejectWithDuplicateObjectError('This Email Already exists in our Database!', 'Email isn\'t unique');
    	}
        return new follower(followerData).save();
    });
};