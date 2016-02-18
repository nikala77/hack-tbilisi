// var Promise   = require('bluebird');
// var _         = require('lodash');
// var mongoose  = require('mongoose');
// var db        = require('../../server/util/mongoose');
// var TestError = require('./test-error');
// require('../../server/util/promisify');

// before(function(done) {
//     return db.connect(function(err) {
//         if (err) { return done(new TestError(err)); }
//         _clearDb(done);
//     });
// });

// afterEach(function(done) {
//     _clearDb(done);
// });

// after(function(done) {
//     _clearDb(function(err) {
//         if (err) { return done(new TestError(err)); }
//         db.disconnect(done);
//     });
// });

// function _clearDb(done) {
//     var promises = _(mongoose.models)
//         .keys()
//         .map(function(modelName) {
//             return mongoose.model(modelName).removeAsync();
//         })
//         .value();

//     Promise.all(promises)
//         .then(function() {
//             done();
//         })
//         .catch(done);
// }
