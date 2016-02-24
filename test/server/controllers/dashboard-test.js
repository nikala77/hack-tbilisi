var chai 	 	= require('chai');
var request  	= require('supertest');
var mongoose 	= require('mongoose');
var app 	 	= require('../../../server/app');
var validator   = require('validator');
var testUtil 	= require('../../testUtil');
var should 	 	= chai.should();

var User 	  = mongoose.model('User');
var Banner 	  = mongoose.model('Banner');

describe('add new banner', function(done) {
	before(testUtil.createUser);

	it('should return user id is not valid error', function(done) {
		request(app)
			.post('/api/banner/new')
			.send({ userID: 'invalid', name: 'myBanner', width: 728, 'height': 90 })
			.end(function(err, res) {
				res.status.should.be.equal(422);
				res.body.should.be.json;
				res.body.should.have.property('reason');
				res.body.reason.should.be.equal('Provided UserID is not valid');
				done();
			});
	});

	it('should return banner is not valid error', function(done) {
		Promise.resolve(User.findOne())
		.then(function(data) {
			request(app)
				.post('/api/banner/new')
				.send({ userID: data.id, name: 'myBanner', 'height': 90 })
				.end(function(err, res) {
					res.status.should.be.equal(422);
					res.body.should.be.json;
					res.body.should.have.property('reason');
					res.body.reason.should.be.equal('Banner name, width or height is not defined');
					done();
				});
		})
	});

	it('should return user with this id not found error', function(done) {
		request(app)
			.post('/api/banner/new')
			.send({ userID: 12345, name: 'myBanner', width: 728, 'height': 90 })
			.end(function(err, res) {
				res.status.should.be.equal(404);
				res.body.should.be.json;
				res.body.should.have.property('reason');
				res.body.reason.should.be.equal('User with this ID not found');
				done();
			});
	});

	it('should return banner has successfully added message', function(done) {
		Promise.resolve(User.findOne())
		.then(function(data) {
			request(app)
				.post('/api/banner/new')
				.send({ userID: data.id, name: 'myBanner', width: 728, 'height': 90 })
				.end(function(err, res) {
					res.status.should.be.equal(301);
					res.body.should.be.string;
					done();
				});
		})
	});

	after(testUtil.deleteUser);
});


describe('delete banner', function(done) {
	before(testUtil.createUser);

	it('should delete banner successfully', function(done) {

		Promise.resolve(User.findOne({ 'local.email': 'kakhidze2012@gmail.com' }))
		.then(function(user) {
			return testUtil.createBanner(user.id);
		})
		.then(function(banner) {
			request(app)
				.delete('/api/banner/delete/'+ banner.id)
				.end(function(err, res) {
					res.status.should.be.equal(200);
					res.body.should.have.property('message');
					res.body.message.should.be.equal('Banner has successfully deleted!');
					done();
				});
		})


	});

	after(testUtil.deleteUser);
});

describe('get banner statistics', function(done) {
	before(testUtil.createUser);
	
	it('should return unauthenticated user to login page', function(done) {
		Promise.resolve(User.findOne())
		.then(function(data) {
			request(app)
				.get('/dashboard/banner/statistics')
				.end(function(err, res) {
					res.status.should.be.equal(302);
					res.redirect.should.be.equal(true)
					res.type.should.be.equal('text/plain');
					res.headers.location.should.be.equal('/login');
					done();
				});
		});
	});


	// it('should return page with statistics', function(done) {
	// 	request(app).post('/login').send({
	// 		'email': 'kakhidze2012@gmail.com',
	// 		'password': 'acmilan'
	// 	}).end(function(err, res) {
	// 		request(app)
	// 			.get('/dashboard/banner/statistics')
	// 			.end(function(err, res) {
	// 				res.status.should.be.equal(302);
	// 				res.redirect.should.be.equal(true)
	// 				res.type.should.be.equal('text/plain');
	// 				res.headers.location.should.be.equal('/login');
	// 				done();
	// 			});
	// 	});
	// });

	after(testUtil.deleteUser);
});