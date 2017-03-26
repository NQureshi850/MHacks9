var admin = require("firebase-admin");
var serviceAccount = require("./serviceAccountKey.json");
// var roomInfo = require("./databaseObject.js");

admin.initializeApp({
    credential: admin.credential.cert(serviceAccount),
    databaseURL: "https://mhacks9-177a8.firebaseio.com/"
});

var db = admin.database();

/*
var uid = [];
for (var i = 0; i < uid.length; i++) {
    admin.auth().deleteUser(uid[i])
        .then(function() {
            console.log("Successfully deleted user");
        })
        .catch(function(error) {
            console.log("Error deleting user:", error);
        });
}
*/
