var ResourceWeekAvTimes = require('mongoose').model('resourceWeekAvTimes');

// TODO: test it
exports.getResourceWeekAvTimes = function(params, keys) {
    return ResourceWeekAvTimes
        .findOne(params)
        .select(keys)
        .execAsync();
};

// TODO: test it
exports.createResourceWeekAvTimes = function(data) {
    return ResourceWeekAvTimes.createAsync(data);
};

// TODO: test it
exports.saveResourceWeekAvTimes = function(resourceWeekAvTimes) {
    return resourceWeekAvTimes
        .saveAsync()
        .spread(function(resourceWeekAvTimes) {
            return resourceWeekAvTimes;
        });
};

// TODO: test it
exports.deleteResourceWeekAvTimesList = function(params) {
    return ResourceWeekAvTimes.removeAsync(params);
};
