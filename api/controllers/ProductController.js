/**
 * ProductController
 *
 * @description :: Server-side logic for managing Products
 * @help        :: See http://links.sailsjs.org/docs/controllers
 */

module.exports = {

    /**
     * `ProductController.index()`
     */
    index: function(req, res) {
        Product.find(function(err, products) {

            // TODO: demo
            if (products.length === 0) {
                products = [{
                    title: 'title',
                    image: 'image',
                    price: 'price'
                }]
            }

            res.render({data: {products: products}});
        });
    },

    /**
     * `ProductController.show()`
     */
    show: function(req, res) {
        Product.findOne({id: req.param('id')}, function(err, product) {
            res.render({data: {product: product}});
        });
    },

    /**
     * `ProductController.create()`
     */
    create: function(req, res, next) {

        req.file('image')
            .upload({
                dirname: sails.config.fileUpload.uploadDir
            }, function(err, file) {
                if (err) return next(err);

                var productData = req.params.all();
                productData.image = getImageName(file);

                // TODO: rewrite
                Product.create(productData, function(err, product) {
                    if (err) return next(err);

                    res.status(201);
                    res.redirect('/product/' + product.id);
                });

            });

    },

    /**
     * `ProductController.edit()`
     */
    edit: function(req, res) {
        Product.findOne({id: req.param('id')}, function(err, product) {
            res.render({data: {product: product}});
        });
    },

    /**
     * `ProductController.new()`
     */
    'new': function(req, res) {
        res.render({data: {product: {}}});
    },

    /**
     * `ProductController.update()`
     */
    update: function(req, res, next) {

        req.file('image')
            .upload({
                dirname: sails.config.fileUpload.uploadDir
            }, function(err, file) {
                if (err) return next(err);

                var productData = req.params.all();
                productData.image = getImageName(file);

                console.log("productData.image: ", productData.image);

                Product.update(req.param('id'), productData, function(err, product) {
                    if (err) res.redirect('/product/' + req.param('id') + '/edit');

                    res.status(201);
                    res.redirect('/product/' + req.param('id'));
                });

            });
    },

    /**
     * `ProductController.delete()`
     */
    'delete': function(req, res, next) {
        var productId = req.param('id');

        Product.findOne({id: productId}, function(err, product) {

            Product.delete({id: productId}, function(err) {
                next();
            });

        });
    }
};

/**
 * Get file name from `file` object
 *
 * @param {Object} file
 * @return {String} file name
 */
function getImageName(file) {

    console.log('file: ', file);

    if (file && file[0] && file[0].fd) {
        return file[0].fd.split('/').pop();
    }
}
