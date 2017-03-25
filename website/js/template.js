/* eslint-env jquery */
/* global database window */

$("document").ready(function()
{
    var url = window.location.href.pathname;

    //THIS SHOULD BE REMOVED LATER
    url = "/Test";
    console.log("rooms" + url);

    var room = database.ref("rooms" + url + "/songs");
    room.on("value", function(snapshot)
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
            updateSong(rightContainer, songsObject[i]);
        }
    });
});
