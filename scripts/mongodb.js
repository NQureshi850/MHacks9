
const MongoClient = require("mongodb").MongoClient;
const assert = require("assert");

// Connection URL
var url = "mongodb://localhost:27017/mhacks";

// Use connect method to connect to the server
MongoClient.connect(url, function(err, db) {
    assert.equal(null, err);
    console.log("Connected successfully to Mongodb server");

    savePlaylist(db, {id: "documents"}, function() {
        db.close();
    });

    db.close();
});

var savePlaylist = function(db, playlist, callback) {
    // get the collection corresponding to the playlist
    var collection = db.collection(playlist.id);
    collection.insertOne(playlist);

    callback();
};

exports.savePlaylist = savePlaylist;
