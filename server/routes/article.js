module.exports = function(app) {
	// article controller
	var article = require('../controllers/article');
	var user = require('../controllers/user');

	// Setting up the article router
	app.route('/api/article')
						 .post(user.ensureAuthenticated, article.post);
						
	app.route('/api/article/mainArticle')
						.get(article.getMainArticle);

	app.route('/api/article/mainArticle/:id')
						.put(user.ensureAuthenticated, article.setMainArticle);

	app.route('/api/article/:id')
						 .get(article.one);

	app.route('/api/article/:id')
						 .put(user.ensureAuthenticated, article.put)
						 .delete(user.ensureAuthenticated, article.delete);

	app.route('/api/articles')
						.get(article.get);

	app.route('/api/search')
						.get(article.searchArticles);					

	app.route('/api/articles/statistics')
						.get(user.ensureAuthenticated, article.getStatistics);
	
	app.route('/api/category/statistics')
						.get(article.getCategoryCount);

	app.route('/api/articles/newsArticles')
						.get(article.getNewsArticles);
						
	app.route('/api/articles/category/:category')
						.get(article.getByCategory);


};