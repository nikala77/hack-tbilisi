var mongoose = require('mongoose'),
	Schema   = mongoose.Schema;

var userSchema = new Schema({
	email    	: { type: String	, trim : true , required : true, unique: true },
	salt	 	: {	type: String	, select: false	},
	hashedPwd	: { type: String	, select: false },
	apiKey		: { type: String },
    roles		: [ String ],
	verified	: { type: Boolean	, default: false }
});

mongoose.model('User' , userSchema);