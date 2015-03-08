/**
 * Product.js
 *
 * @description :: TODO: You might write a short summary of how this model works and what it represents here.
 * @docs        :: http://sailsjs.org/#!documentation/models
 */

module.exports = {

    attributes: {
        title: 'string',
        image: 'string',
        price: 'integer'
    },

    toJSON: function() {
        var obj = this.toObject();
        delete obj._csrf;

        return obj;
    },

    beforeValidate: function(values, next) {
        // don't save _csrf token in database
        if(values._csrf) delete values._csrf;
        next();
    },

    /**
     * TODO: is it necessary?
     * Create stub to product
     */
    'new': function() {

    }
};

