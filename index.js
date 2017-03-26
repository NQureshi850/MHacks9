
// libraries
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
