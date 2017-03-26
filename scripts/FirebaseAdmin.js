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

module.exports.db = db;

var userInfo = new roomInfo.User("Bob", "234890fdsjfdsuifdsjafdsk");
var path1 = "Test/users/" + [userInfo.uuid];
var userInfo2 = new roomInfo.User("Alice", "fdsa;jrew890u234jfdsu9");
var path2 = "Test/users/" + [userInfo2.uuid];
ref.update({[path1]: userInfo});
ref.update({[path2]: userInfo2});

/*var songInfo = new roomInfo.Song("Neon Bible", "Arcade Fire", "Neon Bible", "79jgy0pJciw", "39fjq012j39gjwq9d", 0, userInfo, "img/arcadefireneonbible.jpg");
var pathSong1 = "Test/songs/" + [songInfo.id];
ref.update({[pathSong1]: songInfo});*/

var songInfo5 = new roomInfo.Song("Skin", "Flume", "3", "AiNqHRUWqI4", "zxciopwerlkasdf", 0, userInfo2, "http://images.genius.com/ccad3405e3a136e1b60d8939e581c7b4.1000x1000x1.jpg");
var pathSong5 = "Test/songs/" + [songInfo5.id];
ref.update({[pathSong5]: songInfo5});

var songInfo2 = new roomInfo.Song("Velour", "Darius", "Road Trip", "8gT4DUC25PI", "dw2123hu2", 0, userInfo2, "http://i1.sndcdn.com/artworks-000036855150-vd3kt4-t500x500.jpg");
var pathSong2 = "Test/songs/" + [songInfo2.id];
ref.update({[pathSong2]: songInfo2});

var songInfo3 = new roomInfo.Song("Animal Shapes", "Geographer", "Kites", "talOq6wp8kk", "sdifwejimcxlkasd", 0, userInfo2, "http://34stze45y5gp63pi14vklg15.wpengine.netdna-cdn.com/wp-content/uploads/2014/08/61aTK+WX+-L._SS500_.jpg");
var pathSong3 = "Test/songs/" + [songInfo3.id];
ref.update({[pathSong3]: songInfo3});

var songInfo4 = new roomInfo.Song("Drink the Sea", "The Glitch Mob", "Between Two Points(feat. Swan)", "eHFx11tUO1M", "asd89wa6dj3kl", 0, userInfo2, "http://images.genius.com/70b51b8ee7012b71832eb7db35efdd1e.640x640x1.jpg");
var pathSong4 = "Test/songs/" + [songInfo4.id];
ref.update({[pathSong4]: songInfo4});

var songInfo6 = new roomInfo.Song("Gemini", "What So Not, George Maple", "Gemini", "F6nt3Sw3Isk", "ledoxlalaldopeep", 0, userInfo2, "https://images.genius.com/bcf7640e7dacf4be856049224a8ff292.1000x1000x1.jpg");
var pathSong6 = "Test/songs/" + [songInfo6.id];
ref.update({[pathSong6]: songInfo6});

var songInfo7 = new roomInfo.Song("Headlunge", "CAPYAC", "James Shuffle", "QqzhlEFECUE", "asldlkdwokdaksdl", 0, userInfo2, "https://f4.bcbits.com/img/a3173612467_10.jpg");
var pathSong7 = "Test/songs/" + [songInfo7.id];
ref.update({[pathSong7]: songInfo7});

var songListInfo = new roomInfo.Songlist();
songListInfo.addSong(songInfo5);
//songListInfo.addSong(songInfo);
songListInfo.addSong(songInfo2);
songListInfo.addSong(songInfo3);
songListInfo.addSong(songInfo4);
songListInfo.addSong(songInfo6);
songListInfo.addSong(songInfo7);
ref.update({"Test/currentsong": songListInfo.currentSong()});

/*var position = songListInfo.songlist.indexOf(songInfo) + 1;
var newPath = "rooms/" + [pathSong1];
var newRef = db.ref(newPath);

newRef.update({"position": position});*/

var position4 = songListInfo.songlist.indexOf(songInfo5) + 1;
var newPath4 = "rooms/" + [pathSong5];
var newRef4 = db.ref(newPath4);

newRef4.update({"position": position4});

var position1 = songListInfo.songlist.indexOf(songInfo2) + 1;
var newPath1 = "rooms/" + [pathSong2];
var newRef1 = db.ref(newPath1);

newRef1.update({"position": position1});

var position2 = songListInfo.songlist.indexOf(songInfo3) + 1;
var newPath2 = "rooms/" + [pathSong3];
var newRef2 = db.ref(newPath2);

newRef2.update({"position": position2});

var position3 = songListInfo.songlist.indexOf(songInfo4) + 1;
var newPath3 = "rooms/" + [pathSong4];
var newRef3 = db.ref(newPath3);

newRef3.update({"position": position3});

var position5 = songListInfo.songlist.indexOf(songInfo6) + 1;
var newPath5 = "rooms/" + [pathSong6];
var newRef5 = db.ref(newPath5);

newRef5.update({"position": position5});

var position6 = songListInfo.songlist.indexOf(songInfo7) + 1;
var newPath6 = "rooms/" + [pathSong7];
var newRef6 = db.ref(newPath6);

newRef6.update({"position": position6});
