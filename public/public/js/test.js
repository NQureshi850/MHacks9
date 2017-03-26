/* global config:false, firebase:false, firebaseui:false */

assert(config != undefined);
assert(firebase != undefined);

function assert(bool, message) {
    if (!bool) {
        throw new Error(message || "");
    }
}



(function(firebase, config) {

    // initialize firebase
    firebase.initializeApp(config);

    // FirebaseUI config.
    var uiConfig = {
        // signInSuccessUrl: "test.html",
        signInOptions: [
            firebase.auth.GoogleAuthProvider.PROVIDER_ID,
            firebase.auth.AnonymousAuthProvider.PROVIDER_ID,
        ],
        // Terms of service url.
        // tosUrl: "<your-tos-url>"
    };

    // Initialize the FirebaseUI Widget using Firebase.
    var ui = new firebaseui.auth.AuthUI(firebase.auth());
    // The start method will wait until the DOM is loaded.
    ui.start("#firebaseui-auth-container", uiConfig);


    firebase.auth().onAuthStateChanged(function(user) {
        if (user) {
            // User is signed in
            console.log("logged in");
        } else {
            // no user is signed in
            console.log("logged out");
        }
    });

    /*
    let user = firebase.auth().currentUser;
    let name,
        email,
        uid;

    if (user != null) {
        name = user.username;
        email = user.email;

        // The user's ID, unique to the Firebase project.
        // Do NOT use this value to authenticate with your
        // backend server. Use User.getToken() instead.
        uid = user.uid;
    }
    */

    // firebase database
    const database = firebase.database();
    const room = database.ref("room");
    const user = database.ref("users");
    console.log("database started");

    room.set({
        value: {
            val: 2,
            val2: 2
        }
    });

    user.set({
        value: {
            val: 2,
            val2: 2
        }
    });

    room.on("value", function(snapshot) {
        console.log(snapshot.val());
    });

})(firebase, config);
