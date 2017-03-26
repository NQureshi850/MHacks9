
// libraries
const WebSocketServer = require('ws').Server;
const express = require("express");
//const http = require("http");
//const fs = require("fs");

// local files
//const mongodb = require("./scripts/mongodb.js");
const firebase = require("./scripts/FirebaseAdmin.js");

// define a port we want to listen to
const PORT=8080;

var app = express();

app.use(express.static("public"));

app.listen(PORT);

serverSocket = new WebSocketServer({ port: 9090});

serverSocket.on('connection', function (socket)
{
    var scopeUser;

    socket.on("message", function(data)
    {
        console.log(data);
    });

    socket.on('error', function(e)
    {
        console.error('[ERROR]: ' + e);
    });

    ws.on('close', function(e)
    {
        if (getUser(scopeUser.name, scopeUser.id) !== null)
        {
            disconnect(scopeUser);
        }
    });
};

function disconnect(user)
{
    var name = user.name;

    try
    {
        user.ws.close();
    }
    catch (e)
    {
        console.error('[ERROR]: ' + e);
    }

    removeUser(user);

    console.log('User ' + name + ' has disconnected.');
    console.log('Users online: ' + userList() + '.');
}

function removeUser(user)
{
    var i = users.indexOf(user);

    if (i > -1)
    {
        users[i] = null;
        users.splice(i, 1);
    }
}

/*
function createWriteToResponse(response) {
    function writeToResponse(err, data) {
        response.writeHead(200, {"Content-Type": "text/html"});
        response.write(data);
    }
    return writeToResponse;
}

// handles requests and send response
function handleRequest(request, response){
    let url = request.url;

    if (url == "/")
    {
        fs.readFile("website/index.html", createWriteToResponse(response));
    }
    else if(url == "/favicon.ico")
    {
        // TODO add icon
    }
    else
    {
        fs.readFile("website/template.html", createWriteToResponse(response));
    }
    response.end();
}

// create a server
var server = http.createServer(handleRequest);

function serverListener() {
    // callback triggered when server is successfully listening
    console.log("Server listening on: http://localhost:%s", PORT);
}

// start the server
server.listen(PORT, serverListener);
*/
