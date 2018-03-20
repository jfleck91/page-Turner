
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
    //library of congress control num
    //isbn
    // Online Computer Library Center Number
    //publisher

    var title = ":" + $("#titleField").val().trim();
    var author = ":" + $("#authorField").val().trim();
    var subject = ":" + $("#subjectField").val().trim();
    var publisher = ":" + $("#publisherField").val().trim();
    var isbn = ":" + $("#isbnField").val().trim();
    var lccn = ":" + $("#lccnField").val().trim();
    var oclc = ":" + $("#oclcField").val().trim();
    ///filter doesn't return the desired value just yet
    var filter = $("input[name='filterGroup']:checked").val().toLowerCase().split(" ").join("-");
    console.log(filter + " filter");

    var queryURL = "https://www.googleapis.com/books/v1/volumes?q=+intitle" + title + "+inauthor:" + author + "+ subject=" + subject + "&+" + isbn + "&key=" + googleBooksApiKey + "&maxresults=10&projection=lite&filter=" + filter;


    $.ajax({
        url: queryURL,
        method: 'GET'
    }).done(function (response) {
        console.log(JSON.stringify(response) + "response from Google Books API");
        console.log(queryURL);

        var description = $("<p>");
        img = $("<img>");
        img = img.attr("src", response.items[0].volumeInfo.imageLinks.thumbnail);
        console.log("image " + response.items[0].volumeInfo.imageLinks.thumbnail);
        description = description.text(response.items[0].volumeInfo.description);
        $("#booksDiv").append(img);
        $("#booksDiv").append(description);
    })
}
function generateQuery(field, html) {
    field = ":" + $("#" + field + "Form").val().trim();
}
function resetForm() {
    //set text of form elements to be empty string
    $("#titleForm").text("");
    $("#authorForm").text("");
    $("#subject").text("");
}

//testing runSearch filters
setTimeout(runSearch, 10000);
$(document).ready(function () {
    $(".button-collapse").sideNav();
});
$("#advanceSearchColumn .collapsible-header").on("click", function () {
    var iconText = $(this).find("i").text();
    if (iconText == "keyboard_arrow_up") {
        $(this).find("i").text("keyboard_arrow_down");
    } else {
        $(this).find("i").text("keyboard_arrow_up");
    }
});
