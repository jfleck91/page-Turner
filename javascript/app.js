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
    event.preventDefault();
    var title = ":" + $("#titleForm").val().trim();
    var author = ":" + $("#authorForm").val().trim();
    var subject = ":" + $("#subjectForm").val().trim();
    var queryURL = "https://www.googleapis.com/books/v1/volumes?q=+intitle" + title + "+inauthor:" + author + "+ subject=" + subject + "&" + "key=" + googleBooksApiKey + "&maxresults=10&projection=lite";
    $.ajax({
        url: queryURL,
        method: 'GET'
    }).done(function (response) {
        console.log(JSON.stringify(response) + "response from Google Books API");
        console.log(queryURL);

        var p = $("<p>");
        img = $("<img>");
        img = img.attr("src", response.items[0].volumeInfo.imageLinks.thumbnail);
        console.log("image " + response.items[0].volumeInfo.imageLinks.thumbnail);
        p = p.text(response.items[0].volumeInfo.description);
        $("#booksDiv").append(img);
        $("#booksDiv").append(p);




    })
}
$("#submitButton").click(runSearch);
$(document).ready(function () {
    $(".button-collapse").sideNav();
});
