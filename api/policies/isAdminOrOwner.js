/**
 * isAdminOrOwner policy
 * @param req
 * @param res
 * @param {Function} ok callback when user is admin or owner
 * @returns {*}
 */
module.exports = function(req, res, ok) {

    if (req.session.auth) {

        if (req.session.User.isAdmin === true || req.session.User.id === req.param('id')) {
            return ok();
        } else {
            return res.forbidden();
        }

        // unauthorized
    } else {
        return res.unauthorized();
    }
};

