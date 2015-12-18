module.exports = function(appointmentTemplateSchema) {
    // TODO: test it
    appointmentTemplateSchema.pre('save', function (next, done) {
        var appointmentTemplate = this;
        appointmentTemplate.resourceNames = [];

        if (appointmentTemplate.resources.length === 0) {
            return next();
        }

        // TODO: why?
        var Resource = require('mongoose').model('resource');
        Resource
            .where('_id')
            .in(appointmentTemplate.resources)
            .select('name')
            .exec(function (err, resources) {
                if (err) {
                    return done(err);
                }
                var resourceNames = resources.map(function (resource) {
                    return resource.name;
                });
                appointmentTemplate.resourceNames = resourceNames;
                next();
            });
    });
};
