//book js page
//add code here
function tweetBookInfo() {
	var twitterURL = "https://twitter.com/intent/tweet?text=" + bookInfo;
	var bookInfo = $("#bookinfo").text();
}

var googleBooksApiKey = 'AIzaSyA1b6ByAolu8UnLzqSE5KleVdhA572NBRY';
// Initialize Firebase
var config = {
    apiKey: "AIzaSyCnvuYT1uFfE2BXKi_MbLlwhvDpVLEi6So",
    authDomain: "page-turner-198318.firebaseapp.com",
    databaseURL: "https://page-turner-198318.firebaseio.com",
    projectId: "page-turner-198318",
    storageBucket: "page-turner-198318.appspot.com",
    messagingSenderId: "246039286101"
};
firebase.initializeApp(config);
database = firebase.database();
auth = firebase.auth();



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
    if(bookObject.description){
        $("#description").text(bookObject.description);
    }
    $("#buyLink").attr("href", bookObject.buyLink);

    database.ref().once('value', function(snapshot){
        if(snapshot.child(bookObject.title).exists()){
            var count2 = snapshot.child(bookObject.title).val().count;
            console.log(count2);
            var object = {};
            object[bookObject.title] = {
                count: count2 +1
            }
            database.ref().update(object);
        }else{
            var object = {};
            object[bookObject.title] = {
                count: 1
            }
            database.ref().update(object);
        }
    });
});

