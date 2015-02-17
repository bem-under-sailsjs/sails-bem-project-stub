/**
 * isOwner policy
 * @param req
 * @param res
 * @param {Function} ok callback when user is owner
 * @returns {*}
 */
module.exports = function(req, res, ok) {

    if (req.session.auth) {

        if (req.session.User.id === req.param('id')) {
            return ok();
        } else {
            return res.forbidden();
        }

        // unauthorized
    } else {
        return res.unauthorized();
    }
};

