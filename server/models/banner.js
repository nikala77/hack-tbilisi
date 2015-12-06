var mongoose = require('mongoose'),
	Schema   = mongoose.Schema;

var bannerSchema = new Schema({
	name 		: { type : String  , trim : true , required : true },
	url  		: { type : String  , trim : true },
	width		: { type : Number  , required: true },
	height		: { type : Number  , required: true },
	data		: { type : String  , trim : true , required : true },
	template	: { type : Boolean , default: false },
	createdAt	: { type : Date	   , default: Date.now },
	updatedAt	: { type : Date	   , default: Date.now },
	views		: { type : Number  , default: 0, required: true },
	clicks		: { type : Number  , default: 0, required: true },
	userID		: Schema.Types.ObjectId
});

mongoose.model('Banner' , bannerSchema);