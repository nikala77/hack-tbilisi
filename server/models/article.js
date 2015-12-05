var mongoose = require('mongoose'),
	Schema   = mongoose.Schema;

var articleSchema = new Schema({
	title    : { type : String  , trim : true , required : true },
	image	 : { type : String	, default : '/images/head.png'},
	category : { type : String  , trim : true , required : true },
	body	 : { type : String  , trim : true , required : true },
	created  : { type : Date    , default : Date.now },
	author   : { type : String  , trim : true },
	mainPost : { type : Boolean , default: false },
	views	 : { type : Number  , default: 0 }
});

mongoose.model('Article' , articleSchema);