var mongoose = require('mongoose');
var Schema   = mongoose.Schema;

var followerSchema = new Schema({
	email : { type : String, trim : true, required : true, unique: true },
});

mongoose.model('Follower' , followerSchema);