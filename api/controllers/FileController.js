/**
 * FileController
 *
 * @description :: Server-side logic for managing files
 * @help        :: See http://links.sailsjs.org/docs/controllers
 */

var fs = require('fs');
var gm = require('gm').subClass({imageMagick: true});
var path = require('path');

module.exports = {

    /**
     * `FileController.upload()`
     */
    upload: function(req, res) {
        return res.json({
            todo: 'upload() is not implemented yet!'
        });
    },

    /**
     * `FileController.download()`
     */
    download: function(req, res, next) {

        // TODO: fix this:
        if (req.param('id') === 'undefined') return next();

        // Get image's path
        var uploadDir = sails.config.fileUpload.uploadDir,
            filePath = path.resolve(uploadDir, req.param('id'));

        if (!fs.existsSync(filePath)) return next();

        var filePathWithSize,

        // Get required image size
            height = req.query.h || null,
            width = req.query.w || null,

        // h_0000_w_0000_
            sizeNamePart = (height ? ('h_' + height + '_') : '') + (width ? 'w_' + width + '_' : '');

        filePathWithSize = path.resolve(uploadDir, sizeNamePart + req.param('id'));

        // If image with required size isn't present
        if (!fs.existsSync(filePathWithSize)) {
            gm(filePath)
                .resize(width, height)
                .write(filePathWithSize, function(err) {
                    if (err) next(err);

                    res.sendfile(filePathWithSize);
                });
        } else {
            res.sendfile(filePathWithSize);
        }
    },

    getStatic: function(req, res, next) {
        var file = req.param('file');
        var directory = req.param('directory');

        // TODO: fix this:
        if (file === 'undefined') return next();

        var filePath = path.resolve(__dirname, sails.config.fileUpload.staticDir, directory, file);

        if (fs.existsSync(filePath)) {
            res.sendfile(filePath);

        } else {
            next();
        }

    }
};
