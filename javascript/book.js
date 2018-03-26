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

var emailParse = "";

auth.onAuthStateChanged(function(user) {
    if (user) {
        console.log(user);
        if(user!= null){
            var email = user.email;
            $("#login, #login2").text(email);
            emailParse = email.split(".")[0];
        }
    }
});


$(document).ready(function() {
    $(".button-collapse").sideNav();
    ////////////////////////////////////////
    //    Populate the page with data     //
    //    from local storage              //
    ////////////////////////////////////////
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
    $("#buyLink").attr("href", bookObject.buylink);
    $("#buyLink").attr("target", "_blank");
    ////////////////////////////////////////
    //    Get amount specific book has    //
    //    been viewed globally            //
    ////////////////////////////////////////
    database.ref().once('value', function(snapshot){
        var numberVisits = 0;
        if(snapshot.child(bookObject.title).exists()){
            var count2 = snapshot.child(bookObject.title).val().count;
            console.log(count2);
            var object = {};
            object[bookObject.title] = {
                count: count2 +1
            }
            database.ref().update(object);
            numberVisits = count2+1;
        }else{
            var object = {};
            object[bookObject.title] = {
                count: 1
            }
            database.ref().update(object);
            numberVisits = 1;
        }
        $("#visitCounter").text(numberVisits);
	});

	function tweetBookInfo() {
		var bookInfo = bookObject.title;
		var tweetBtn = $('<a></a>').addClass('twitter-share-button').attr('href', 'http://twitter.com/share').attr('data-url', bookObject.imageLinks.thumbnail).attr('data-text', authors + bookObject.title);
		$('.bookimg').prepend(tweetBtn);
		twttr.widgets.load();
    }
    tweetBookInfo();
});

///////////////////////////////////////////
//      Store search to session storage  //
///////////////////////////////////////////
function addSessionStorage(query){
    sessionStorage.setItem("query", query);
    open("./search.html", "_self");
}
///////////////////////////////////////////
//          Input Changed Handler        //
///////////////////////////////////////////
$("#querySearch2").on("input", function(){
    $("#querySearch").val($("#querySearch2").val());
});
$("#querySearch").on("input", function(){
    $("#querySearch2").val($("#querySearch").val());
});
//////////////////////////////////////////
//      Key Handler for Search Field    //
//////////////////////////////////////////
$(document).on("keyup", function(e){
    if(e.key === "Enter"){
        if($("#querySearch").val().length > 0){
            addSessionStorage($("#querySearch").val());
        }
    }
});
////////////////////////////////////////////
$("#login, #login2").on("click", function(){
    open("./login.html", "_self");
});
////////////////////////////////////////////
