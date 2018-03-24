//book js page
//add code here
function tweetBookInfo() {
	var twitterURL = "https://twitter.com/intent/tweet?text=" + bookInfo;
	var bookInfo = $("#bookinfo").text();
}
$(document).ready(function () {
	var bookString = localStorage.getItem("bookInfo");
	var bookObject = JSON.parse(bookString)
});
