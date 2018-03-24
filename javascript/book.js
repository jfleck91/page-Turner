
$(document).ready(function() {
    var bookString = localStorage.getItem("bookInfo");
    var bookObject = JSON.parse(bookString);
    $("#bookImage").attr("src", bookObject.imageLinks.thumbnail);
    $("#title").text(bookObject.title);
    authors = "";
    bookObject.authors.forEach(function (authorName) {
        authors += authorName + ', ';
    });
    $("#authors").text(authors);
});