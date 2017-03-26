/* eslint-env jquery */
/* global firebase */

var database;

const config = {
    apiKey: "AIzaSyB1ud8zoaq0Asex1cgfl_mF5lf7A4JxBJw",
    authDomain: "mhacks9-177a8.firebaseapp.com",
    databaseURL: "https://mhacks9-177a8.firebaseio.com",
    storageBucket: "mhacks9-177a8.appspot.com",
    messagingSenderId: "474432084634"
};

firebase.initializeApp(config);
database = firebase.database();
