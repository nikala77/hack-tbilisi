var chai 	 	= require('chai');
var request  	= require('supertest');
var mongoose 	= require('mongoose');
var app 	 	= require('../../../server/app');
var validator   = require('validator');
var testUtil 	= require('../../testUtil');
var should 	 	= chai.should();

var User = mongoose.model('User');

describe('forgot-password', function(done) {
	User.collection.drop();

	before(testUtil.createUser);

	it('should return status 404 user not found error', function(done) {
		request(app)
			.post('/forgot')
			.send({ email: 'incorrect-email' })
			.end(function(err, res){
				res.status.should.be.equal(404);
				res.body.should.be.json;
				res.body.should.have.property('message');
				res.body.message.should.be.equal('No account with this email exists.');
				done();
			});
	});


	it('should return status 200 user password reset instruction sent', function(done) {
		this.timeout(5000);
		request(app)
			.post('/forgot')
			.send({ email: 'kakhidze2012@gmail.com' })
			.end(function(err, res){
				res.status.should.be.equal(200);
				res.body.should.be.json;
				res.body.should.have.property('message');
				res.body.message.should.be.equal('An e-mail has been sent to kakhidze2012@gmail.com with further instructions.');
				done();
			});
	});

	after(testUtil.deleteUser);
});

describe('signup User', function(done) {
	User.collection.drop();

	before(testUtil.createUser);

	it('should return 406 email not valid error', function(done) {
		request(app)
			.post('/signup')
			.send({ email: 'incorrect-email', password: 'password' })
			.end(function(err, res) {
				res.status.should.be.equal(406);
				res.body.should.be.json;
				res.body.should.have.property('reason');
				res.body.reason.should.be.equal('Please enter valid email!');
				done();
			});
	});

	it('should return 406 password too short error', function(done) {

		request(app)
			.post('/signup')
			.send({ email: 'kakhidze2012@gmail.com', password: 'short' })
			.end(function(err, res) {
				res.status.should.be.equal(406)
				res.body.should.be.json;
				res.body.should.have.property('reason');
				res.body.reason.should.be.equal('Password must contain at least 6 symbol!');
				done();
			});

	});


	it('should return user with this email already exists', function(done) {

		request(app)
			.post('/signup')
			.send({ email: 'kakhidze2012@gmail.com', password: 'acmilan' })
			.end(function(err, res) {
				res.status.should.be.equal(409)
				res.body.should.be.json;
				res.body.should.have.property('reason');
				res.body.reason.should.be.equal('User with this email already exists!');
				done();
			});

	});

	it('should return 200 user has successfully registered status', function(done) {

		request(app)
			.post('/signup')
			.send({ email: 'kakhidze2012@mail.ru', password: 'acmilan' })
			.end(function(err, res) {
				res.status.should.be.equal(200)
				res.body.should.be.json;
				res.body.should.have.property('message');
				res.body.message.should.be.equal('Successfully registered!');
				done();
			});

	});

	after(testUtil.deleteUser);
});

describe('reset password', function(done) {
	User.collection.drop();

	beforeEach(testUtil.createUserWithToken);

	it('should return token invalid error', function(done) {

		request(app)
			.post('/reset/wrong-token')
			.end(function(err, res) {
				res.status.should.be.equal(404);
				res.body.should.be.json;
				res.body.should.have.property('message');
				res.body.message.should.be.equal('Password reset token is invalid or has expired!');
				done();
			});


	});

	it('should return password has changed successfully', function(done) {
		request(app)
			.post('/reset/test-token')
			.end(function(err, res) {
				res.status.should.be.equal(200);
				res.body.should.be.json;
				res.body.should.have.property('message');
				res.body.message.should.be.equal('Your password has just been changed!');
				done();
			});
	});

	afterEach(testUtil.deleteUser);

});