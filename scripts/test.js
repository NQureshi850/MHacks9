/* global config:false, firebase:false */

function assert(bool, message) {
    if (!bool)  {
        throw new Error(message || "");
    }
}

assert(config != undefined);
firebase.initializeApp(config);
