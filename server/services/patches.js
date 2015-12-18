var Patch = require('mongoose').model('patch');

// TODO: test it
exports.getPatches = function(params) {
    return Patch
        .find(params)
        .sort('created')
        .select('_id collectionName patch')
        .execAsync();
};

// TODO: test it
exports.deletePatch = function(params) {
    return Patch.removeAsync(params);
};

// TODO: test it
exports.createPatch = function(patchData) {
    return Patch.createAsync(patchData);
};
