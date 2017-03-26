var admin = require("firebase-admin");
var serviceAccount = require("./serviceAccountKey.json");
var roomInfo = require("./databaseObject.js");

admin.initializeApp({
    credential: admin.credential.cert(serviceAccount),
    databaseURL: "https://mhacks9-177a8.firebaseio.com/"
});

var db = admin.database();
var ref = db.ref("restricted_access/secret_document");
ref.once("value", function(snapshot)
{
    console.log(snapshot.val());
});
