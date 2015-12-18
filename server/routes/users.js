var auth  = require('../controllers/auth');
var users = require('../controllers/users');

module.exports = function (app) {
    // TODO: check roles!!!
    app.get('/api/users/findUserForPwReset', users.findUserForPwReset);
    app.get('/api/users', auth.ensureAuthenticatedWrapper, users.getUsers);
    app.get('/api/users/:_id', auth.ensureAuthenticatedWrapper, users.getUserById);
    app.get('/api/users/:_id/resendNewOwnerEmail', users.resendNewOwnerEmail);
    app.post('/api/users/generatePwResetToken', users.generatePwResetToken);
    app.post('/api/users/register', users.registerOwner);
    app.post('/api/users/:_id/setPassword', users.setPassword);
    app.post('/api/users', auth.ensureAuthenticatedWrapper, users.createUser);
    app.put('/api/users/:_id/sendNewUserEmail', auth.requireRolesWrapper(['owner', 'manager']), users.sendNewUserEmail);
    app.put('/api/users/:_id', auth.ensureAuthenticatedWrapper, users.updateUser);
    app.delete('/api/users/:_id', auth.requireRolesWrapper(['owner', 'manager']), users.deleteUser);
};
