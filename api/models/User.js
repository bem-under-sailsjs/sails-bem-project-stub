// User model
module.exports = {
    // Enforce model schema in the case of schemaless databases
    schema: true,

    attributes: {
        username: {type: 'string', unique: true},
        displayName: {type: 'string'},
        profileUrl: {type: 'string'},
        gender: {type: 'string'},
        isOnline: {type: 'boolean'},
        isAdmin: {type: 'boolean', defaultsTo: false},
        emails: {type: 'array'},
        email: {type: 'email', unique: true},
        passports: {collection: 'Passport', via: 'user'}
    },

    // set first user as admin
    beforeCreate: function(values, next) {
        User.find({limit: 1}, function(err, result) {
            if (err) next(next);

            if (!result || result.length === 0) {
                values.isAdmin = true;
            }

            next();
        });
    }

};
