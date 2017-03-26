/* eslint-env jquery */
/* global database window */

$("document").ready(function()
{
    var url = window.location.href.pathname;

    //THIS SHOULD BE REMOVED LATER
    url = "/Test";

    var room = database.ref("rooms" + url);
    var songs = database.ref("rooms" + url + "/songs");
    var currentSong = database.ref("rooms" + url + "/currentSong");

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
        while(children.length - 1 <= songsArray.length + 30)
        {
            var copy = children[1].cloneNode(true);
            var songData = $(copy).children()[0];

            $(songData.childNodes[1]).click(function()
            {
                var element = this.parentNode.parentNode;

                console.log(this.parentNode.childNodes);

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

                songsObject[element.id].votes += mode;
                room.child("songs").child(element.id).update({"votes":songsObject[element.id].votes});
            });

            $(songData.childNodes[5]).click(function()
            {
                var element = this.parentNode.parentNode;

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

                songsObject[element.id].votes -= mode;
                room.child("songs").child(element.id).update({"votes":songsObject[element.id].votes});
            });

            $(copy).appendTo($("#right"));
            children = $("#right").children();
        }

        while(children.length - 2 > songsArray.length + 30)
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
            $(songData.childNodes[9]).text(song.user);

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
        $("#song-votes").text(songData.votes + " Votes");

        $("#art-container").css("visibility", "visible");
        $("#song-data").css("visibility", "visible");
    });
});
