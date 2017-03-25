//const util = require("util");
// require the HTTP module
var http = require("http");

// define a port we want to listen to
const PORT=8080;

// handles requests and send response
function handleRequest(request, response){
    response.end("It Works!! Path Hit: " + request.url);
    let url = request.url;

    //console.log(util.inspect(url, false, null));
    if(url == "/")
    {
        console.log("empty");
    }
    else if(url == "/favicon.ico")
    {
        console.log("icon empty");
    }

    else
    {
        console.log("here: " + url);
    }
}

// create a server
var server = http.createServer(handleRequest);

function serverListener() {
    // callback triggered when server is successfully listening
    console.log("Server listening on: http://localhost:%s", PORT);
}

// start the server
server.listen(PORT, serverListener);
