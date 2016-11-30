// So this is a simple store for managing API'S in the programming environment
// without having to use the process inbuilt function.
// All the API keys are hashed and are stored in a hidden file.

let path = require("path"),
    fs = require("fs"),
    store = path.join(".", ".apiStore.json");

/**
 * General purpose data encoding
 *
 * (string): string
 */
function encode (data) {
  return (new Buffer(data)).toString('base64');
};

/**
 * Inverse of `encode`
 *
 * (string): string
 */
function decode (data) {
  return (new Buffer('' + data, 'base64')).toString();
};


//this is going to generate a random word or 50 characters
//and you can use this as a cookie for sites that require it's  use.

function sessionId_generator() {
    var chars = "0123456789ABCDEFGHIJKLMNOPQRSTUVWXTZabcdefghiklmnopqrstuvwxyz_%!#$^*",
        cookie_length = 50,
        cookie = "",
        i = 0;

    for (i; i < cookie_length; i++) {
        randomNumber = Math.floor(Math.random() * chars.length);
        cookie += chars[randomNumber];
    }

    return cookie;
}

// this is supposed to write the data to the store in base64 encoding
// first off, it encodes the data it stringifies the object, encodes the whole object
// and then writes it to the store.
function writeStore (data) {
    let stringified;
    try {
        stringified = JSON.stringify(data);
    } catch (e) {
        console.log(e);
    }
    fs.writeFileSync(store, encode(stringified));
};

// this does the reverse opposite of the writeStore
// reads the file and then decodes it and then tries to parse
// it as json data. but I have some issues with that one.
function readStore () {
    let read = fs.readFileSync(store),
        decoded = decode(read);
    try {
        return JSON.parse(decoded);
    } catch (e) {
        console.log(e);
    }
};


// create a new file if the store file is not available.
// the file is called package.json and that is it.
function createStore() {
    let exist = fs.existsSync(store);
    if (!exist) {
        writeStore({});
    } else {
        return null;
    }
};

//refactor this part of the code tomorrow
// create a simple save api and then get the api by its name
// that should be rather simple.
createStore();

let update = function (apiName, apiKey) {

    let storage = readStore();

    if (storage[apiName]) {
        storage[apiName] = apiKey;
    } else {
        console.log("You cannot add a new API, if you want to add an API, use add instead");
    }

    writeStore(storage);

    return readStore();

}

let remove = function (apiName) {

    let storage = readStore();

    delete storage[apiName];

    writeStore(storage);

    return readStore();

}


let save = function (apiName, apiKey) {

    let storage = readStore();

    if (!storage[apiName]) {
        storage[apiName] = apiKey;
    } else {
        console.log("You cannot change the " + apiName + " API key. if you want to update the key, then use update instead");
    }

    writeStore(storage);

    return readStore();
}


// the add property has the save function and you call it by passing the apiName and apiKey
// the sessionId is used to generate the sessionId if you need it to generate a random 50-length string
// the getStore function is the one that returns the object store.

module.exports = {
    add: save,
    update: update,
    del: remove,
    sessionId: sessionId_generator,
    getStore: readStore
};


/*

var api = require('api');

// this function returns the newly modifies storage as calling api.getStore() would.
storage = api.add(apiName, apiKey)

// this well only update if the apiName is available in the stoarge.
storage = api.update(apiName, apiKey)

// this is used to remove an api from the store. just enter the name of the api as a string.
storage = api.del(apiName);

// you need to get the store after you are done saving to get the cotent of the file.
var stoarge = api.getStore()
storage.apiName  //should return the apiKey for you to use.

// this is for generating the random string values for the
// anytime you call this, a new session iD should be created.
var id = api.sessionId()

*/
