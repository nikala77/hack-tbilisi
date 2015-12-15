module.exports = function (passport) {
	require('./facebook')(passport);
	require('./local')(passport);
};