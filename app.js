/*
MEAN_STACK_2 is an attempt to create a better mean stack template that incorporates sass and compass,
webpack for asset bundling, gulp for tak automation, babel-loader to transofrm ES2015 code to ES5.

The project base is highly configurable for anyone with an understanding of this technologies. Even those
who do not have an understanding of the any of this tech can get a scalable web app up and running
from scratch.
It aims to include es2015+ support. support for react and angular2 and typescript, maybe.

ISC LICENSCE
(c) Danny Mcwaves.
*/

// the third party dependencies required by the app for simple and easy development..
// DEVELOPER MODE ONLY.
var express = require('express'),
        logger = require('morgan'),
        cookie_parser = require("cookie-parser"),
        method_override = require("method-override"),
        compression = require('compression'),
        body_parser = require("body-parser"),
        favicon = require("serve-favicon"),
        errorhandler = require("errorhandler"),
        csurf = require("csurf"),
        session = require("express-session"),
        busboy = require("connect-busboy"),
        mongoskin = require("mongoskin"),
        mongoose = require("mongoose"),
        path = require("path"),
        serveIndex = require("serve-index"),
        routes = require("./routes/index"),
        multer = require("multer"),
        debug = require('debug'),

        // instantiating the express application.
        app = express();

// configuring the application information: response formats, name
// templates to use, the current mode of the app. ie; development || production
// and other setting the app has to depend on.
app.set("appName", "MEAN STACK 2");
app.set("x-powered-by", false);
app.set("env", "development");
app.set("view engine", "pug");
app.set("views", path.join(__dirname, "views"));
app.set("view cache", app.get("env") === "production");
app.set("json spaces", 4);
app.set("jsonp callback name", "cb");


// DEVELOPER MODE
// configuring middlewares to parse the data on the request, // bodyParser
// log the request // logger
// compress the response //compression
// provide response to all methods even non standard ones // method_override
// use cookies and sessions in the requests and the response
app.use(logger("dev"));
app.use(compression({threshold: 1}));
app.use(body_parser.json({strict: false, limit: 5000}));
app.use(body_parser.urlencoded({limit: 10000, extended: true}));
app.use(method_override("_method"));
app.use(cookie_parser("this is used for constructing cookies for a particular project."));
app.use(session({key: "_sessId", secret: "jkqhrqnuthvnwusviwivhguvovnewk", resave: true, saveUninitialized: true}));

// configuring the middlewares routes to respond to STATIC GET REQUESTS from the client.
// GET static contents from the server using this middleware setups.
app.use("/upload", busboy({immediate: true}));
app.use("/fonts", express.static("./fonts"));
app.use("/images",  express.static("./images"));
app.use("/js", express.static("./js"));
app.use("/css", express.static("./css"));
app.use("/dist", express.static("./dist"));

// ROUTE the GETS, POSTS, PUTS, DELETES request that are coming to the server.
app.get("/", routes.test);
app.post("/", routes.test);
app.put("/", routes.test);
app.delete("/", routes.test);

// if anything fails, such as 404 or Internal server error, let this error handler take care of it for us.
app.use(errorhandler());

// debug the MEAN_STACK_2 app package.json file for any errors. DEVELOPER ONLY. and the proceed.
debug('MEAN_STACK_2')

// set the port of the app. the environments process or 8000 if undefined.
app.set('port', process.env.PORT || 8000);

//the we set the app to listen on the port and the name will be localhost or whatever your system or the name.
app.listen(app.get('port'), function () {
	debug("the server is running on ", app.get('port'));
});
