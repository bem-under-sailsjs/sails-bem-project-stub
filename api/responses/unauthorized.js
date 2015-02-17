/**
 * 401 (unauthorized) Handler
 *
 * e.g.:
 * ```
 * return res.unauthorized();
 * ```
 */

module.exports = function unauthorized() {

    // Get access to `req`, `res`, & `sails`
    var req = this.req;
    var res = this.res;
    var sails = req._sails;

    // Set status code
    res.status(401);

    return res.redirect('/login?retpath=' + req.originalUrl);
};
