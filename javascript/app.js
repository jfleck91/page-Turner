
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
    event.preventDefault();
    var title = ":" + $("#titleForm").val().trim();
    var author = ":" + $("#authorForm").val().trim();
    var subject = ":" + $("#subjectForm").val().trim();
    var isbn = ":9780689713101";
    $.each($('form input:text'), function generateQuery(index, field));
    //var queryURL = "https://www.googleapis.com/books/v1/volumes?q=+intitle" + title + "+inauthor:" + author + "+ subject=" + subject + "&" + isbn + "&key=" + googleBooksApiKey + "&maxresults=10&projection=lite";
    var queryURL = "https://www.googleapis.com/books/v1/volumes?q=+" + isbn + "&key=" + googleBooksApiKey + "&maxresults=10&projection=lite"
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
$("#submitButton").click(runSearch);
$(document).ready(function () {
    $(".button-collapse").sideNav();
});
$("#advanceSearchColumn .collapsible-header").on("click",function(){
    var iconText = $(this).find("i").text();
    if(iconText == "keyboard_arrow_up"){
        $(this).find("i").text("keyboard_arrow_down");
    }else{
        $(this).find("i").text("keyboard_arrow_up");
    }
});