
// this is the runtime test for the webpack thingy.
// this should work well for me though
// considering all the practices I have done so far
// okay so let us just give this thing a shot.

let superagent = require("superagent"),
    expect = require("expect.js");


// okay so check if all the methods are working properly on the app.
describe("G E N E R I C   T E S T S   F O R   A L L   M E T H O D S\n", function () {

    it(" should get a rendered document for the get post", function (done) {
        superagent.get("http://localhost:8000/")
            .end(function (err, res) {
                console.log(res.text);
                expect(err).to.eql(null);
                expect(typeof res.text).to.eql('string');
                done();
            })
    });

    it("should post a message to the server and the server should return the message", function(done) {
        superagent.post("http://localhost:8000/")
            .send({
                name: "MOCHA POST TEST",
                version: "1.0.0",
                pass: "true",
                state: "Successful"
            })
            .end(function (err, res) {
                console.log(res.body);
                expect(err).to.eql(null);
                expect(typeof res.body).to.eql('object');
                done();
            })
    });

    it("should put a data on the server but will receive the same data", function(done) {
        superagent.put("http://localhost:8000/")
            .send({
                name: "MOCHA PUT TEST",
                version: "1.1.0-beta.9"
            })
            .end(function (err, res) {
                console.log(res.body);
                expect(err).to.eql(null);
                expect(typeof res.body).to.eql('object');
                done();
            })
    });

    it("should delete a resource on the server and get a message confirming the delete", function (done) {
        superagent.del("http://localhost:8000/")
            .end(function (err, res) {
                console.log(res.text);
                expect(err).to.eql(null);
                expect(typeof res.text).to.eql('string');
                done();
            })
    })

});
