var Promise = require('bluebird');
var Token   = require('mongoose').model('token');

// TODO: test it
exports.createToken = function (user, tokenType, data) {
    //tokenTypes: newOwner, newUser, passwordReset, emailChange
    //if token exists already, just refresh the create date
    //returns just the token _id
    return Token
        .findOneAsync({
            type: tokenType,
            user: user
        })
        .then(createOrRefreshToken)
        .then(saveToken)
        .then(function (token) {
            return token._id;
        });

    function createOrRefreshToken(token) {
        if (token) {
            token.created = Date.now();
            token.data = data;
        } else {
            token = new Token({
                user: user,
                type: tokenType,
                data: data
            });
        }
        return token;
    }
};

function getToken(params) {
    return Token
        .findOne(params)
        .populate('user')
        .execAsync();
}

// TODO: test it
exports.handleTokenId = function (tokenId) {
    return getToken({
            _id: tokenId
        })
        .then(testTokenValidity)
        .then(markTokenAsProcessed)
        .then(processToken);

    function testTokenValidity(token) {
        return new Promise(function (resolve, reject) {
            if (!token) {
                return reject(new Error('Invalid or expired token'));
            }
            if (token.processed) {
                return reject(new Error('Token already processed'));
            }
            resolve(token);
        });
    }

    function markTokenAsProcessed(token) {
        token.processed = Date.now();
        return saveToken(token);
    }

    function processToken(token) {
        var user = token.user;
        var data = {
            userId: user.id,
            firstName: user.firstName,
            lastName: user.lastName,
            tokenType: token.type,
            tokenId: token.id,
            data: token.data
        };

        switch (token.type) {
            case 'newOwner':
            case 'newUser':
                user.verified = Date.now();
                return user
                    .saveAsync()
                    .then(function () {
                        return data;
                    });
            case 'emailChange':
                user.email = token.data;
                return user
                    .saveAsync()
                    .then(function () {
                        return data;
                    });
            case 'passwordReset':
                return data;
        }
    }
};

// TODO: test it
exports.verifyHasRecentPwResetToken = function (user) {
    var today = new Date();
    var tenMinAgo = new Date(today);
    tenMinAgo.setMinutes(today.getMinutes() - 10);
    var params = {
        user: user._id,
        type: {
            $in: ['passwordReset', 'newUser']
        },
        processed: {
            $gt: tenMinAgo
        }
    };
    
    return Token
        .findOneAsync(params)
        .then(function (token) {
            if (!token) {
                throw new Error('Must reset password within 10 min of following link from email.');
            }
            return user;
        });
};

// TODO: test it
exports.deleteAllTokens = function () {
    return Token.removeAsync({});
};

function saveToken(token) {
    return token
        .saveAsync()
        .spread(function (token) {
            return token;
        });
}
