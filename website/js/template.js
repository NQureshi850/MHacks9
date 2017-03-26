/* eslint-env jquery */
/* global database window WebSocket YT*/
var player;
var shouldMute = true;

function start()
{
    $("document").ready(initialize);
}

function initialize()
{
    if(shouldMute)
    {
        player.mute();
    }

    var url = window.location.pathname;
    url = url.substring(url.lastIndexOf("/"), url.lastIndexOf("."));

    var socket = setupWebSocket();

    //THIS SHOULD BE REMOVED LATER
    url = "/Test";

    var room = database.ref("rooms" + url);
    var songs = database.ref("rooms" + url + "/songs");
    var currentSong = database.ref("rooms" + url + "/currentsong");

    room.once("value", function(snapshot)
    {
        $("#room-name").text(snapshot.val().name);
        $("#room-code").text("#" + url.substring(1));
    });

    songs.on("value", function(snapshot)
    {
        var songsObject = snapshot.val();
        var songsArray = Object.keys(songsObject);
        var rightContainer = $("#right");
        var children = rightContainer.children();

        while(children.length - 2 <= songsArray.length + 30)
        {
            var copy = children[1].cloneNode(true);
            var songData = $(copy).children()[0];

            $(songData.childNodes[1]).click(function()
            {
                socket.send({"type":"vote-update", "vote":"upvote"});

                var mode = (this.src.endsWith("img/upvoteClicked.png") ? -1 : 1);
                mode += (this.parentNode.childNodes[5].src.endsWith("img/downvoteClicked.png") ? 1 : 0);

                if(mode == 2)
                {
                    this.parentNode.childNodes[5].src = "img/downvote.png";
                }

                if(mode != -1)
                {
                    this.src = "img/upvoteClicked.png";
                }
                else
                {
                    this.src = "img/upvote.png";
                }

                //songsObject[element.id].votes += mode;
                //room.child("songs").child(element.id).update({"votes":songsObject[element.id].votes});
            });

            $(songData.childNodes[5]).click(function()
            {
                socket.send({"type":"vote-update", "vote":"downvote"});

                var mode = (this.parentNode.childNodes[1].src.endsWith("img/upvoteClicked.png") ? 1 : 0);
                mode += (this.src.endsWith("img/downvoteClicked.png") ? -1 : 1);

                if(mode == 2)
                {
                    this.parentNode.childNodes[1].src = "img/upvote.png";
                }

                if(mode != -1)
                {
                    this.src = "img/downvoteClicked.png";
                }
                else
                {
                    this.src = "img/downvote.png";
                }

                //songsObject[element.id].votes -= mode;
                //room.child("songs").child(element.id).update({"votes":songsObject[element.id].votes});
            });

            $(children[1]).after(copy);
            children = $("#right").children();
        }

        while(children.length - 3 > songsArray.length + 30)
        {
            children[children.length - 2].remove();
            children = $("#right").children();
        }

        rightContainer = $("#right");

        for (var i in songsObject)
        {
            var song = songsObject[i];

            var songElement = $(children[song.position + 1]);

            songElement.attr("id", i);
            $(songElement.children()[0].childNodes[3]).text(song.votes);

            songData = songElement.children()[1];

            $(songData.childNodes[1]).text(song.name);
            $(songData.childNodes[3]).text(song.artist);
            $(songData.childNodes[5]).text(song.album);
            $(songData.childNodes[7]).text(song.time);
            $(songData.childNodes[9]).text(song.name);

            songElement.show();
        }
    });

    currentSong.on("value", function(snapshot)
    {
        var songData = snapshot.val();
        $($("#art-container").children()[0]).attr("src", songData.imgSrc);
        $("#song-title").text(songData.name);
        $("#song-artist").text(songData.artist);
        $("#song-album").text(songData.album);
        $("#music-player-skip-vote-count").text(songData.skipVotes);

        $("#art-container").css("visibility", "visible");
        $("#song-data").css("visibility", "visible");

        if(songData.source == 0)
        {
            player.loadVideoById(songData.url);
            $("#youtubeplayer").css("visibility", "visible");
        }
    });

    $("#right").scroll(function(e)
    {
        console.log(e);
        var scrollData = $(this).data('scroll');

        if(scrollData.y > $(this).scrollTop()){
            console.log("this");
        }
    });

    $("#music-player-mute").click(function()
    {
        shouldMute = !shouldMute;

        $("#music-player-mute").attr("src", (shouldMute ? "img/mute.png" : "img/unmute.png"));

        if(shouldMute)
        {
            player.mute();
        }
        else
        {
            player.unMute();
        }
    });

    $("#music-player-skip-button").click(function()
    {
        socket.send({"type":"skip-vote-update"});
    });
}

function onYouTubeIframeAPIReady()
{
    player = new YT.Player("youtubeplayer", {
        playerVars: {
            "allowsInlineMediaPlayback":0,
            "autoplay": 1,
            "cc_load_policy":0,
            "controls": 0,
            "disablekb":1,
            "enablejsapi":1,
            "fs":0,
            "iv_load_policy":3,
            "modestbranding":1,
            "rel" : 0,
            "showinfo":0,
        },
        events: {
            "onReady": onPlayerReady
        }
    });
    $("#youtubeplayer").css("visibility", "hidden");
}

function onPlayerReady(event)
{
    start();
    console.log("this");
}

function setupWebSocket()
{
    var socket = new WebSocket("ws://maxocull.com:9090");

    socket.onclose = function()
    {
        console.log("could not connect");
    };

    socket.onmessage = function(message)
    {
        console.log(message);
    };

    window.onbeforeunload = function()
    {
        socket.onclose = function () {}; // Disable onclose event
        socket.close();
    };

    return socket;
}
