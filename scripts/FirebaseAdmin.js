var admin = require("firebase-admin");
var serviceAccount = require("./serviceAccountKey.json");
var roomInfo = require("./databaseObject.js");

admin.initializeApp({
    credential: admin.credential.cert(serviceAccount),
    databaseURL: "https://mhacks9-177a8.firebaseio.com/"
});

var db = admin.database();
var ref = db.ref("rooms");
ref.once("value", function(snapshot)
{
    console.log(snapshot.val());
});

var userInfo = new roomInfo.User("bob", "234890fdsjfdsuifdsjafdsk");
var path1 = "Test/users/" + [userInfo.uuid];
var userInfo2 = new roomInfo.User("Alice", "fdsa;jrew890u234jfdsu9");
var path2 = "Test/users/" + [userInfo2.uuid];
//console.log(typeof userInfo.uuid);
ref.update({[path1]: userInfo});
ref.update({[path2]: userInfo2});

var songInfo = new roomInfo.Song("Love", "Arcade Fire", "Neon bible", "www.kys.com", "39fjq012j39gjwq9d", 0, userInfo, "img/arcadefireneonbible.jpg");
var pathSong1 = "Test/songs/" + [songInfo.id];
ref.update({[pathSong1]: songInfo});

var songListInfo = new roomInfo.Songlist();
songListInfo.addSong(songInfo);
ref.update({"Test/currentsong": songListInfo.currentSong()});

/*
ref.update({"Test/currentSong/album": "Love"});
ref.update({"Test/currentSong/artist": "Arcade Fire"});
ref.update({"Test/currentSong/imgSrc": "\"img/arcadefireneonbible.jpg\""});
ref.update({"Test/currentSong/name": "Neon Bible"});
ref.update({"Test/currentSong/skipVotes": "0"});
ref.update({"Test/currentSong/votes": "0"});

ref.update({"Test/name" : "Test Room"});

ref.update({"Test/songs/album": "Love"});
ref.update({"Test/songs/artist": "Arcade Fire"});
ref.update({"Test/songs/imgSrc": "\"img/arcadefireneonbible.jpg\""});
ref.update({"Test/songs/name": "Neon Bible"});
ref.update({"Test/songs/skipVotes": "0"});
ref.update({"Test/songs/votes": "0"});
*/
