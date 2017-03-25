/* global config:false, firebase:false */

assert(config != undefined);
assert(firebase != undefined);

// initialize firebase
firebase.initializeApp(config);
const database = firebase.database();

function assert(bool, message) {
    if (!bool)  {
        throw new Error(message || "");
    }
}
