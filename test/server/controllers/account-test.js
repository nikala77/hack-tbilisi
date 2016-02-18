var chai 	 = require('chai');
var request  = require('supertest');
var app 	 = require('../../../server/app');
var should 	 = chai.should();


describe('local-authentication', function(done) {
	it('should log in successfully HTTP/POST', function(done) {
		request(app)
			.post('/login')
			.send({ email: 'kakhidze2012@gmail.com', password: 'acmilan' })
			.end(function(err, res){
				res.status.should.be.equal(200);
				done();
			});
	});
});