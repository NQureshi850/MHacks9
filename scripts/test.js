/* global config:false, firebase:false */

assert(config != undefined);
assert(firebase != undefined);

function assert(bool, message) {
    if (!bool)  {
        throw new Error(message || "");
    }
}

(function(firebase, config) {

    // initialize firebase
    firebase.initializeApp(config);
    const database = firebase.database();
    const ref = database.ref();
    console.log("database started");

    ref.on("value", function(snapshot) {
        console.log("test");
        console.log(snapshot.val());
    });

    ref.once("value", function(snapshot) {
        console.log("test");
        console.log(snapshot.val());
    });

})(firebase, config);
