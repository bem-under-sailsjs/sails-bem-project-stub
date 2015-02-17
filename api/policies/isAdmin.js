/**
 * isAdmin policy
 * @param req
 * @param res
 * @param {Function} ok callback when user is admin
 * @returns {*}
 */
module.exports = function(req, res, ok) {

    if (req.session.auth) {

        if (req.session.User.isAdmin === true) {
            return ok();
        } else {
            return res.forbidden();
        }

        // unauthorized
    } else {
        // TODO: do redirect to return path
        return res.unauthorized();
    }
};
