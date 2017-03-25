/* eslint-env jquery */
/* global database window */

$("document").ready(function()
{
    var url = window.location.href.pathname;

    //THIS SHOULD BE REMOVED LATER
    url = "/Test";
    console.log("rooms" + url);

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
        console.log("UPDATED!");
        var songsObject = snapshot.val();
        var songsArray = Object.keys(songsObject);
        var rightContainer = $("#right");
        var children = rightContainer.children();
        while(children.length <= songsArray.length)
        {
            var copy = children[0].cloneNode(true);
            $(copy).appendTo($("#right"));
            children = $("#right").children();
        }

        while(children.length > songsArray.length + 1)
        {
            children[children.length - 1].remove();
            children = $("#right").children();
        }

        rightContainer = $("#right");

        for (var i in songsObject)
        {
            var song = songsObject[i];
            var songElement = children[song.position];
            songElement.id = i;

            console.log(songElement);
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
