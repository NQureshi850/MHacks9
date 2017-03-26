var admin = require("firebase-admin");
var serviceAccount = require("./serviceAccountKey.json");
var roomInfo = require("./databaseObject.js");

admin.initializeApp({
    credential: admin.credential.cert(serviceAccount),
    databaseURL: "https://mhacks9-177a8.firebaseio.com/"
});

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

var db = admin.database();
var ref = db.ref("rooms");
ref.once("value", function(snapshot)
{
    console.log(snapshot.val());
});

var userInfo = new roomInfo.User("Bob", "234890fdsjfdsuifdsjafdsk");
var path1 = "Test/users/" + [userInfo.uuid];
var userInfo2 = new roomInfo.User("Alice", "fdsa;jrew890u234jfdsu9");
var path2 = "Test/users/" + [userInfo2.uuid];
ref.update({[path1]: userInfo});
ref.update({[path2]: userInfo2});

var songInfo = new roomInfo.Song("Love", "Arcade Fire", "Neon bible", "www.kys.com", "39fjq012j39gjwq9d", 0, userInfo, "img/arcadefireneonbible.jpg");
var pathSong1 = "Test/songs/" + [songInfo.id];
ref.update({[pathSong1]: songInfo});

var songListInfo = new roomInfo.Songlist();
songListInfo.addSong(songInfo);
ref.update({"Test/currentsong": songListInfo.currentSong()});

var position = songListInfo.songlist.indexOf(songInfo) + 1;
var newPath = "rooms/" + [pathSong1];
var newRef = db.ref(newPath);

newRef.update({"position": position});
