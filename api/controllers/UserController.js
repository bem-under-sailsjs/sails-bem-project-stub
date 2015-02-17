/**
 * UserController
 *
 * @description :: Server-side logic for managing users
 * @help        :: See http://links.sailsjs.org/docs/controllers
 */

module.exports = {

    show: function(req, res, next) {

        User.findOne(req.param('id'), function(err, user) {
            if (err) next(err);

            if (!user) {
                res.notFound()
            } else {
                res.render({
                    data: {user: user},
                    controller: 'user',
                    action: 'show'
                });
            }
        });
    },

    edit: function(req, res, next) {
        User.findOne(req.param('id'), function(err, user) {
            if (err) next(err);

            res.render({
                data: {user: user},
                controller: 'user',
                action: 'edit'
            });
        });
    },

    update: function(req, res, next) {

        var data = req.params.all();

        // TODO: refactor
        data.isAdmin = (req.session.User.isAdmin) && (data.isAdmin === 'yes');

        User.update(req.param('id'), data, function(err, user) {
            if (err) next(err);

            res.redirect('/user/' + data.id);
        });
    }
};

