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
        while(children.length - 1 <= songsArray.length)
        {
            var copy = children[1].cloneNode(true);
            console.log(children);
            var songData = $(copy).children()[0];

            $(songData.childNodes[1]).click(function()
            {
                var element = this.parentNode.parentNode;

                var mode = (this.src == "img/upvoteClicked.png" ? 0 : 1);
                mode += (this.parentNode.childNodes[7].src == "img/downvoteClicked.png" ? 2 : 0);

                if(mode == 2)
                {
                    this.parentNode.childNodes[7].src = "img/downvote.png";
                }

                this.src = "img/upvoteClicked.png";

                if(mode > 0)
                {
                    room.child("songs").child(element.id).update({"votes":songsObject[element.id].votes + mode});
                }
            });

            $(songData.childNodes[7]).click(function()
            {
                var element = this.parentNode.parentNode;

                var mode = (this.parentNode.childNodes[1].src == "img/upvoteClicked.png" ? 2 : 0);
                mode += (this.src == "img/downvoteClicked.png" ? 0 : 1);

                if(mode == 2)
                {
                    this.parentNode.childNodes[7].src = "img/upvote.png";
                }

                this.src = "img/downvoteClicked.png";

                if(mode > 0)
                {
                    room.child("songs").child(element.id).update({"votes":songsObject[element.id].votes + mode});
                }
            });

            $(copy).appendTo($("#right"));
            children = $("#right").children();
        }

        while(children.length - 2 > songsArray.length)
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
            $(songElement.children()[0].childNodes[5]).text(song.votes);

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
        console.log($("#art-container").children()[0]);
        $("#song-title").text(songData.name);
        $("#song-artist").text(songData.artist);
        $("#song-album").text(songData.album);
        $("#song-votes").text(songData.votes + " Votes");

        $("#art-container").css("visibility", "visible");
        $("#song-data").css("visibility", "visible");
        console.log($("#art-container")[0].style.visibility);
    });
});
