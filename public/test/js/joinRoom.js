/* global room */

var joinRoomDiv;
var joinRoomInput;
var joinRoomButton;

var authDiv;

function roomInit() {
    joinRoomDiv = document.getElementById("join-room");
    joinRoomInput = document.getElementById("join-room-input");
    joinRoomButton = document.getElementById("join-room-button");
    authDiv = document.getElementById("auth");

    joinRoomButton.addEventListener("click", joinRoom);
}

function joinRoom() {
    let input = joinRoomInput.value;
    console.log(input);

    if (input != "") {
        room.value = input;
        showSignIn();
    }
}

function showSignIn() {
    joinRoomDiv.style.display = "none";
    authDiv.style.display = "inherit";
}

window.addEventListener("load", function() {
    roomInit();
});
