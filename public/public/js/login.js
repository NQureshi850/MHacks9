/* global firebase:false, ui:false, uiConfig:false */

(function(firebase, ui, uiConfig) {
    var displayDiv;
    var logoutButton;
    var displayNameButton;

    function logout() {
        firebase.auth().signOut().then(function() {
            console.log("Signed Out");
        }, function(error) {
            console.error("Sign Out Error", error);
        });
    }

    function initHtml() {
        displayDiv = document.getElementById("display");
        logoutButton = document.getElementById("firebase-auth-logout");
        displayNameButton = document.getElementById("display-name-button");

        logoutButton.addEventListener("click", logout);
        displayNameButton.addEventListener("click", setDisplayName);
    }

    function initAnonAuth(callback) {
        firebase.auth().signInAnonymously().then(function() {
            let user = firebase.auth().currentUser;

            if (callback) callback(user);
        });
    }

    function getOrCreateUser(callback) {
        let user = firebase.auth().currentUser;

    // no user signed in
        if (user != null) {
            callback(user);
        }
        else {
            initAnonAuth(callback);
        }
    }

    function setDisplayNameWithUser(user) {
        let db = firebase.database();
        let ref;

        if (user.isAnonymous) {
            ref = db.ref("/users/anon/" + user.uid);
        }
        else {
            ref = db.ref("/users/uid/" + user.uid);
        }

        let displayNameInput = document.getElementById("display-name-input");
        let name = displayNameInput.value;

        ref.update({displayName: name}).then(function() {
            displayDiv.appendChild(document.createTextNode(name));
            displayDiv.appendChild(document.createElement("br"));

            setTitleName(name);
        });
    }

    function setDisplayName() {
        getOrCreateUser(setDisplayNameWithUser);
    }

    function initAuth() {
        firebase.auth().onAuthStateChanged(function(user) {
            if (user) {
                var isAnon = user.isAnonymous;
                var uid = user.uid;
                user.getToken().then(function(accessToken) {
                    var obj = {
                        uid: uid,
                    // accessToken: accessToken
                    };

                    let text = JSON.stringify(obj, null, 4);

                    displayDiv.appendChild(document.createTextNode(text));
                    displayDiv.appendChild(document.createElement("br"));
                });

                getUsername(user, setTitleName);

            // user is signed in anonymously
                if (isAnon) {
                    console.log("user signed in anon");
                    logoutButton.disabled = true;

                    ui.start("#firebaseui-auth-container", uiConfig);
                }
            // user is signed in
                else {
                    console.log("user signed in reg");
                    logoutButton.disabled = false;
                }
        // user is not signed in
            } else {
                console.log("user not signed in");
                logoutButton.disabled = true;

                ui.start("#firebaseui-auth-container", uiConfig);
            }
        });
    }

    function init() {
        initHtml();
        initAuth();
    }

    function getUsername(user, callback) {
        let db = firebase.database();
        let dynamRef = "/users/uid";

        if (user.isAnonymous) {
            dynamRef = "/anon/uid";
        }

        let ref = db.ref(dynamRef + user.uid);

        console.log("test");

        ref.once("value", function(dataSnapshot) {
            if (dataSnapshot.val() != null && dataSnapshot.val().displayName != undefined) {
                callback(dataSnapshot.val().displayName);
            }
        });
    // ref.once("displayName").then(function(dataSnapshot) {
    //     callback(dataSnapshot);
    // });
    }

    function setTitleName(name) {
        let title = document.getElementById("title");
        title.innerHTML = "Welcome to My Awesome App, " + name;
    }

    /* Add one or more listeners to an element
    ** @param {DOMElement} element - DOM element to add listeners to
    ** @param {string} eventNames - space separated list of event names, e.g. 'click change'
    ** @param {Function} listener - function to attach for each event as a listener
    */
    function addListenerMulti(element, eventNames, listener) {
        var events = eventNames.split(" ");
        for (var i=0, iLen=events.length; i<iLen; i++) {
            element.addEventListener(events[i], listener, false);
        }
    }

    addListenerMulti(window, "load", init);

    window.addEventListener("load", function() {
        init();
    });
})(firebase, ui, uiConfig);
