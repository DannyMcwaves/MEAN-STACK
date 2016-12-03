<p align="center">
  <img src="http://meanjs.org/img/logo.png" title="MEAN STACK LOGO">
</p>

<p align="center">
    <a href="https://heroku.com/deploy">
        <img src="https://www.herokucdn.com/deploy/button.svg" alt="Deploy">
    </a>
</p>

#MEAN STACK
**A simple mean stack boilerplate for creating scalable MEAN STACK web applications.**

**It contains a collection of packages that build a web application using `npm scripts`**

#FEATURES
- [x] **DEV :** As the name suggests, it contains the files that are used for the development of the application. Mostly, files that will be minified, compressed or bundled for production. the production folder is the DIST.

- [x] **DIST :** The DIST folder contains processed files from the DEV folder. The files over here are ready for public deployment/distribution.

- [x] **routes :** Express for routing requests and providing responses is very easy to do. All the routes for the express web app are based in the routes directory.

- [x] **views :** This express setup is configured to use pug(formerly jade). the views directory contains pug templates that are rendered in the routes responses to a request. You can set up new templates in the app.js file.

- [x] **app.js :** The main entry point of the express application is the app.js. It contains setups for express, middlewares, route decisions and more. Contains comments for every configuration.

- [x] **api.js :** This is simple file for managing api keys by saving the keys in a hidden file in encoded base64 format. Contains comments on how o use it.

- [x] **npm dependencies :**  Contains enough third party dependencies needed to build a web app with express. You can take out existing or add new dependencies before installing the dependencies with npm.

- [x] **npm devDependencies :** Contains enough third party build packages for a smooth and easy development process. It is not advisable to remove any of the DevDEPENDENCIES as current configuration might depend on it. But you can always add new one's to extend your development configurations.

- [x] **tests :** Tests are done using the mocha, superagent and expect.js packages. the test files are in the test folder. You can add new ones or reconfigure existing ones based on the needs of your application and then run `npm test` to start test.

- [x] **webpack :** Asset bundling is done using webpack configuration files and not gulp webpack plugin. so you can enter the webpack.config.js file and reconfigure it based on the needs of your app and then run `npm run webpack` to bundle your assets.

- [x] **sass compilation :** Using sass with compass is now commonplace so my settings in the `config.rb` are based on compass settings. To use it, you need to have sass installed `gem install sass && gem install ruby-compass`. If not not you can use node sass libraries to to compile sass files.

- [x] **gulp :** Task automation is done using gulp in this setup.  You can setup other automation scripts, maybe with grunt. Auto test are available in the gulpfile.js. you can reconfigure this to your taste or run `npm run gulp` to automate all tasks.
