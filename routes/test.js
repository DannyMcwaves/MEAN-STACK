
const express = require("express"),
    router = express.Router();

router
    .get("/",  function(req, res) {
        res.render("test");
    })
    .get("/react", (req, res) => {
        res.render("react");
    })
    .post("/", function(req, res) {
        res.send(req.body);
    })
    .put("/", function (req, res) {
        res.send(req.body);
    })
    .delete("/", function (req, res) {
        res.send("Data Deletion Successful. TEST RUN PASSED\n");
    })

module.exports = router;
