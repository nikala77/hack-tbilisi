var mongoose = require('mongoose'),
	Schema   = mongoose.Schema;

var bannerSchema = new Schema({
	name 		: { type : String  , trim : true , required : true },
	url  		: { type : String  , trim : true },
	width		: { type : Number  , required: true },
	height		: { type : Number  , required: true },
	data		: { type : String  , trim : true },
	template	: { type : Boolean , default: false },
	createdAt	: { type : Date	   , default: Date.now },
	updatedAt	: { type : Date	   , default: Date.now },
	views		: { type : Number  , default: 0 },
	clicks		: { type : Number  , default: 0 },
	userID		: { type : Schema.Types.ObjectId, required : true }
});

mongoose.model('Banner' , bannerSchema);