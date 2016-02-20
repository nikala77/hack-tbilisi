var chai 	 = require('chai');
var request  = require('supertest');
var mongoose = require('mongoose');
var app 	 = require('../../../server/app');
var should 	 = chai.should();

var User = mongoose.model('User');

describe('forgot-password', function(done) {
	User.collection.drop();

	before(function(done) {
		var user = new User({
			'local.email': 'kakhidze2012@gmail.com',
			'local.password': 'acmilan'
		});

		user.save(function(err) {
			if(err) {
				throw err;
			}
			done();
		});
	});

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

	after(function(done) {
		User.collection.drop();
		done();
	});
});