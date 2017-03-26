
// libraries
const express = require("express");
//const http = require("http");
//const fs = require("fs");

// local files
//const mongodb = require("./scripts/mongodb.js");
const firebase = require("./scripts/FirebaseAdmin.js");

// define a port we want to listen to
const PORT=8880;

var app = express();

var roomApp = express();
roomApp.get("/", function (req, res) {
    res.sendFile(__dirname + "/website/template.html");
});

app.use(express.static("public"));
// app.use(express.static("website"));
app.use("/room/", express.static("website"));
app.use("/room/*", roomApp);

app.listen(PORT);


const db = firebase.db;

var globalTimeout = null;

const ref = db.ref("/rooms/Test/currentsong/");
ref.on("value", function(snapshot) {
    console.log("current song changed");
    if (globalTimeout !== null) {
        clearTimeout(globalTimeout);
    }
    setTimeout(function () {
        broadcast(true, "sync");
        globalTimeout = null;
    }, 3000);
});



// web socket
const WebSocketServer = require("ws").Server;
const wss = new WebSocketServer({ port: 9090});

var users = [];
var currentId = 1;

function User(ws) {
    this.id = currentId;
    this.connected = true;
    this.ws = ws;

    currentId++;
    users.push(this);
}

// function Message(next, text, type) {
//     this.text = text;
//     this.type = type;
// }

function removeUser(user) {
    var i = users.indexOf(user);
    if (i > -1) {
        users[i].connected = false;
        users[i] = null;
        users.splice(i, 1);
    }
}

function getUser(ws) {
    for (var i = 0; i < users.length; i++) {
        if (users[i].ws === ws) {
            return users[i];
        }
    }
    return null;
}

function sendStringifiedMessage(ws, message)
{
    try
    {
        ws.send(message);
    }
    catch (e)
    {
        console.log("[ERROR]: ", e);
    }
}

function sendMessage(ws, text, type)
{
    ws.send(JSON.stringify({type: type}));
}

// function userList() {
//     var list = "";
//     for (var i = 0; i < users.length; i++) {
//         list += users[i].name;
//         if (i + 1 < users.length)
//             list += ", ";
//     }
//     if (users.length === 0)
//         list = "None";
//     return list;
// }

function broadcast(text, type)
{
    console.log("broadcast type of message: ", type);
    var message = JSON.stringify({type: type});
    users.forEach(function (client)
    {
        // sendMessage(client.ws, text, type);
        sendStringifiedMessage(client.ws, message);
    });
}

function disconnect(user)
{
    try
    {
        user.ws.close();
    }
    catch (e)
    {
        console.error("disconnect [ERROR]: ", e);
    }
    removeUser(user);
}

// function formatMessage(name, time, message) {
//     var timeStr = new Date(time);
//     timeStr = timeStr.toLocaleTimeString();
//     return "[" + name + " | " + timeStr + "] " + message;
// }

function currentTime()
{
    return null;
}

var changed = false;

wss.on("connection", function (ws)
{
    console.log("connection");
    var scopeUser;

    ws.on("message", function (data)
    {
        var msg = JSON.parse(data);
        console.log("connection message type2: ", msg);
        console.log("connection message readyState: ", ws.readyState);

        if (msg.type === "join")
        {
            console.log("new join");
            var u = new User(ws);
            scopeUser = u;
            scopeUser.connected = true;
            console.log(scopeUser.id);

            sendMessage(ws, null, "join");
            // sendMessage(ws, currentTime(), "sync");
        }
        else if(msg.type === "video-ended" || msg.type === "skip-vote-update")
        {
          if(!changed)
          {
              var song = {"found":0};
              var nextSong = database.ref("rooms/Test/songs");
              nextSong.once("value", function(snapshot)
              {
                  var songsObject = snapshot.val();
                  var songsArray = Object.keys(songsObject);
                  for(var i in songsArray)
                  {
                      var testSong = songsObject[i];
                      if(testSong.position == 1)
                      {
                          song.album = testSong.album;
                          song.artist = testSong.artist;
                          song.id = testSong.id;
                          song.img = testSong.img;
                          song.name = testSong.name;
                          song.skipVotes = testSong.skipVotes;
                          song.source = testSong.source;
                          song.time = testSong.time;
                          song.url = testSong.url;
                          song.username = testSong.username;
                          song.uuid = testSong.uuid;
                          song.votes = testSong.votes;
                          song.found = 1;
                      }
                  }
                  if(song.found == 1)
                  {
                      database.ref("rooms/Test/songs/" + song.uuid).remove();
                      database.ref("rooms/Test/currentSong").update(song);
                      for(var j in songsArray)
                      {
                          var testSong = songsObject[j];
                          database.ref("rooms/Test/songs/" + testSong.uuid).update({"position" : testSong.position - 1});
                      }
                  }
              });
              changed = true;
              setTimeout(function() {changed = false;}, 5000);
          }
        }
        else if (msg.type === "ping")
        {
            console.log("connection message readyState: ", ws.readyState);
            console.log("msg ping");
            scopeUser.connected = true;
        }

        /*
        if (msg.type === "join") {
            var u = new User(ws);
            scopeUser = u;
            sendMessage(ws, currentTime(), "sync");
        } else if (msg.type === "ping") {
            scopeUser.connected = true;
        } else if (msg.type === "next") {
            broadcast(true, "next");
        } else if (msg.type === "sync") {
            broadcast(currentTime(), "sync");
        }
        */
    });

    ws.on("error", function(e)
    {
        console.error("error [ERROR]: ", e);
    });

    ws.on("close", function(e)
    {
        if (getUser(scopeUser.ws) !== null)
            disconnect(scopeUser);
    });
});

wss.on("error", function(e)
{
    console.error("error [ERROR]: " + e);
});

// setInterval(function () {
//     for (var i = 0; i < users.length; i++) {
//         var u = users[i];
//         if (u.connected === false) {
//             disconnect(u);
//         } else {
//             // u.connected = false;
//             // sendMessage(u.ws, "ping");
//         }
//     }
// }, 1000);
