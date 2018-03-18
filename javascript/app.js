var googleBooksApiKey = 'AIzaSyA1b6ByAolu8UnLzqSE5KleVdhA572NBRY';
// Initialize Firebase
var config = {
    apiKey: "AIzaSyCnvuYT1uFfE2BXKi_MbLlwhvDpVLEi6So",
    authDomain: "page-turner-198318.firebaseapp.com",
    databaseURL: "https://page-turner-198318.firebaseio.com",
    projectId: "page-turner-198318",
    storageBucket: "",
    messagingSenderId: "246039286101"
};
firebase.initializeApp(config);
database = firebase.database();

function runSearch() {
    var fields = "items(title)";
    var queryURL = "https://www.googleapis.com/books/v1/volumes?q=flowers+inauthor:keyes&" + "key=" + googleBooksApiKey + "&maxresults=1&projection=lite";
    $.ajax({
        url: queryURL,
        method: 'GET'
    }).done(function (response) {
        console.log(JSON.stringify(response) + "response from Google Books API");
        console.log(queryURL);
    })
}

$(document).ready(function () {
    $(".button-collapse").sideNav();
});
runSearch();
