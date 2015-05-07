require("sails-test-helper");

describe("IndexPageController", function() {

    describe("#HTTP", function() {
        describe("GET /", function() {
            it("should open the index page", function(done) {
                request.get("/")
                    .expect(200)
                    .end(done);
            });
        });
    });
});
