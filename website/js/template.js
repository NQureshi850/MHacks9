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
        var songsObject = snapshot.val();
        var rightContainer = $("#right");
        for (var i in songsObject)
        {
            updateSong(rightContainer, songsObject[i]);
        }
    });
});

function updateSong(container, song)
{
    var children = container.children();
    while(children.length <= song.position)
    {
        var copy = $(children[0]).clone();
        container.add(copy);
    }
}
