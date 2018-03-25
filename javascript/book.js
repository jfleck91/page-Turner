//book js page
//add code here
var bookString;
var bookObject;
var authors;


$(document).ready(function () {
	bookString = localStorage.getItem("bookInfo");
	bookObject = JSON.parse(bookString);
	$("#bookImage").attr("src", bookObject.imageLinks.thumbnail);
	$("#title").text(bookObject.title);
	authors = "";
	bookObject.authors.forEach(function (authorName) {
		authors += authorName + ', ';
	});
	$("#authors").text(authors);
	if (bookObject.description) {
		$("#description").text(bookObject.description);
	}
	$("#buyLink").attr("href", bookObject.buyLink);
	function tweetBookInfo() {
		var bookInfo = bookObject.title;
		var tweetBtn = $('<a></a>').addClass('twitter-share-button').attr('href', 'http://twitter.com/share').attr('data-url', bookObject.imageLinks.thumbnail).attr('data-text', authors + bookObject.title);
		$('.twitter').append(tweetBtn);
		twttr.widgets.load();


	}
	tweetBookInfo();
});
