require("sails-test-helper");

describe("ProductController", function() {

    afterEach(function(done) {
        sails.once('hook:orm:reloaded', done);
        sails.emit('hook:orm:reload');
    });

    describe("#HTTP", function() {

        describe("GET index", function() {
            it("should open product catalog", function(done) {
                request.get("/products/")
                    .expect(200)
                    .end(done);
            });
        });

    });
});
