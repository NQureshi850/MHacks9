var admin = require("firebase-admin");
var serviceAccount = require("./serviceAccountKey.json");
var roomInfo = require("./databaseObject.js");

admin.initializeApp({
    credential: admin.credential.cert(serviceAccount),
    databaseURL: "https://mhacks9-177a8.firebaseio.com/"
});

var db = admin.database();

module.exports.db = db;

/*
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

var songInfo = new roomInfo.Song("Love", "Arcade Fire", "Neon Bible", "https://www.youtube.com/watch?v=ZZ5LpwO-An4", "39fjq012j39gjwq9d", 0, userInfo, "img/arcadefireneonbible.jpg");
var pathSong1 = "Test/songs/" + [songInfo.id];
ref.update({[pathSong1]: songInfo});

var songInfo2 = new roomInfo.Song("Velour", "Darius", "Road Trip", "8gT4DUC25PI", "dw2123hu2", 0, userInfo2, "http://i1.sndcdn.com/artworks-000036855150-vd3kt4-t500x500.jpg");
var pathSong2 = "Test/songs/" + [songInfo2.id];
ref.update({[pathSong2]: songInfo2});

var songListInfo = new roomInfo.Songlist();
songListInfo.addSong(songInfo);
songListInfo.addSong(songInfo2);
ref.update({"Test/currentsong": songListInfo.currentSong()});

var position = songListInfo.songlist.indexOf(songInfo) + 1;
var newPath = "rooms/" + [pathSong1];
var newRef = db.ref(newPath);

newRef.update({"position": position});

var position1 = songListInfo.songlist.indexOf(songInfo2) + 1;
var newPath1 = "rooms/" + [pathSong2];
var newRef1 = db.ref(newPath1);

newRef1.update({"position": position1});
*/
