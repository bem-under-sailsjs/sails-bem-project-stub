require("sails-test-helper");

describe("FileController.test", function() {

    describe("#API", function() {

        describe("getStatic", function() {
            it("should receive a file", function(done) {
                request.get("/static/js/_merged.js")
                    .expect(200)
                    .end(done);
            });

            it("should set right MIME type", function(done) {
                request.get("/static/js/_merged.js")
                    .expect('Content-Type', /javascript/)
                    .end(done);
            });

        });
    });
});
