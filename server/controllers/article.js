var mongoose 	= require('mongoose');
var	article     = mongoose.model('Article');
var defaultLimit = 10;
var newsArticlesLimit = 17;

exports.get = function(req, res) {
	var limit = req.query.max || defaultLimit;
	var skip = req.query.skip || 0;

	article.find({})
	.sort({ 'created': -1 })
	.skip(skip)
	.limit(limit)
	.exec(function(err, data) {
		if(err) {
			console.log(err);
			return res.status(500).send(err);
		}
		return res.json(data);
	});
};

exports.getMainArticle = function(req, res) {
	article.findOne({ 'mainPost' : true }).exec(function(err, data) {
		if(err) {
			console.log(err);
			return res.status(500).send(err);
		}
		return res.json(data);
	});
};

exports.setMainArticle = function(req, res) {
	var _id = req.params.id;

	article.update({ 'mainPost' : true }, { $set: { 'mainPost': false } })
	.then(function() {
		return article.update({ '_id' : _id }, { $set: { 'mainPost': true } });
	})
	.then(function(data) {
		return res.json(data);
	})
	.catch(function(err) {
		console.log('err', err);
		return res.json(err);
	});
};

exports.getNewsArticles = function(req, res) {
	article.find({ 'mainPost': { '$ne': true } }).sort({ 'created': -1 }).limit(newsArticlesLimit)
	.exec(function(err, data) {
		if(err) {
			console.log(err);
			return res.status(500).send(err);
		}
		return res.json(data);
	});
};

exports.getByCategory = function(req, res) {
	article.find({ category: req.params.category })
	.sort({ 'created': -1 })
	.skip(req.query.skip)
	.limit(defaultLimit)
	.exec(function(err, data) {
		if(err) {
			console.log(err);
			return res.status(500).send(err);
		}
		return res.json(data);
	});
};

exports.one = function(req, res) {
	article.update({ _id : req.params.id }, { $inc : { views : 1 } })
	.exec()
	.then(function() {
		return article.findOne({ _id : req.params.id }).exec();
	})
	.then(function(data) {
		return res.json(data);
	});
};

exports.post = function(req, res) {
	new article(req.body).save(function(err, data) {
		if(err) {
			console.log(err);
			return res.status(500).send(err);
		}
		return res.json(data);
	});
};

exports.put = function(req, res) {
	var id = req.body._id;
	delete req.body._id;

	article.update({ _id: id }, req.body, function(err, data) {
		if(err) {
			console.log(err);
			return res.status(500).send(err);
		}
		return res.json(data);
	});
};

exports.delete = function(req, res) {

	article.remove({ _id : req.params.id }).exec(function(err, data) {
		if(err) {
			console.log(err);
			return res.status(500).send(err);
		}
		return res.json(data);
	});
	
};

exports.searchArticles = function(req, res) {
	var urlParams;
	var skip;
	var searchWord;
	var n;

	try {
		urlParams = decodeURI(req.url).split('?')[1].split('&');
		skip = Number(urlParams[0].split('skip=')[1]);
		searchWord = urlParams[1].split('word=')[1];
	} catch(err) {
		searchWord = '';
	}

	var searchParams = {
		$or: [
			{ title: { $regex: searchWord } },
			{ body: { $regex: searchWord } },
			{ author: { $regex: searchWord } }
		]
	};

	if(!searchWord) {
		return res.json({ n: 0, articles: [] });
	}
	article.count(searchParams)
	.then(function(count) {
		n = count;
		return article.find(searchParams)
				.sort({ 'created': -1 })
				.skip(skip)
				.limit(defaultLimit);
	})
	.then(function(data) {
		return res.json({ n: n, articles: data });
	})
	.catch(function(err) {
		if(err) {
			console.log(err);
			return res.status(500).send(err);
		}
	});
};

exports.getStatistics = function(req, res) {
	var categoryStats;

	article.aggregate({ $match: {} }, {
		$group: { _id: '$category', count: { $sum: 1 } }
	}).exec()
	.then(function(stats) {
		categoryStats = stats;
		return article.count({});
	})
	.then(function(count) {
		var data = {};
		data.n = count;
		data.stats = categoryStats;
		res.json(data);
	});

};

exports.getCategoryCount = function(req, res) {
	article.count({ category: req.query.category })
	.exec(function(err, data) {
		if(err) {
			console.log(err);
			return res.status(500).send(err);
		}
		return res.json({ n: data });
	});
};