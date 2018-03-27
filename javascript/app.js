
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

auth.onAuthStateChanged(function(user) {
    if (user) {
        console.log(user);
        if(user!= null){
            var email = user.email;
            $("#login, #login2").text(email);
        }
    }
});


var searchResult = [
];
var amount = 6;

var email;
var password;

// auth.createUserWithEmailAndPassword(email, password).catch(function (error) {
//     // Handle Errors here.
//     var errorCode = error.code;
//     var errorMessage = error.message;
//     //post html from the search form to give some sort of error message
// });


// auth.signInWithEmailAndPassword(email, password).catch(function (error) {
//     // Handle Errors here.
//     var errorCode = error.code;
//     var errorMessage = error.message;
//     //same as above
// });


// auth.onAuthStateChanged(function (user) {
//     if (user) {
//         // User is signed in.
//         var displayName = user.displayName;
//         var email = user.email;
//         var emailVerified = user.emailVerified;
//         var isAnonymous = user.isAnonymous;
//         var uid = user.uid;
//         var providerData = user.providerData;
//         // ...
//     } else {
//         // User is signed out.
//         // ...
//     }
// });



///////////////////////////////////
//    Generate the cards(books)  //
// Does not need to be called    //
// use intialSetupPagination     //
///////////////////////////////////
function generateItems(indexStart, length) {
    $("#cardDiv").empty();
    for (var i = indexStart; i < indexStart + length; i++) {
        var value = searchResult[i];

        var source = $("#search-card-template").html();
        var template = Handlebars.compile(source);
        var context = {
            imageSrc: value.imageLinks.thumbnail,
            title: value.title,
            price: value.retailPrice,
            shortDescription: "",
            longDescription: "",
            author: "",
            dataIndex: i
        };
        shortDesc = "";
        if (value.description != null) {
            if (value.description.length > 100) {
                shortDesc = value.description.substring(0, 100) + "...";
            } else {
                shortDesc = value.description;
            }
            context.shortDescription = shortDesc;
            context.longDescription = value.description;
        }

        authors = "";
        value.authors.forEach(function (authorName) {
            authors += authorName + ', ';
        });
        authors = authors.substring(0, authors.length - 2);
        context.author = authors;
        var html = template(context);
        $("#cardDiv").append($(html));
    };
}
////////////////////////////////////
//      Setup Pagination          //
// Run this for every ajax call   //
////////////////////////////////////
function initialSetupPagination() {
    $(".pagination").css("display", "block");
    var numPages = Math.ceil(searchResult.length / amount);

    var pagesDynamic = $("#pages");
    pagesDynamic.empty();
    for (var i = 0; i < numPages; i++) {
        var pagIcon = $("<li class = 'wave-effect'><a href = '#'></a></li>");
        pagIcon.children("a").text(i + 1);
        pagIcon.attr("data-index", i * 6);
        if (i == 0) {
            pagIcon.removeClass("wave-effect");
            pagIcon.addClass("active");
        }
        pagesDynamic.append(pagIcon);
    }
    if ($("#pages li").length > 1) {
        console.log("Greater")
        $("#pag-next").removeClass("disabled");
    }
    var dataLength = amount;
    if (searchResult.length < amount) {
        dataLength = searchResult.length;
    }
    generateItems(0, dataLength);
}
////////////////////////////////
//  Left Right Chevron  icon  //
//    for pagination          //
////////////////////////////////
function leftRightChevronCheck() {
    if ($("#pages li").eq(0).hasClass("active")) {
        $("#pag-back").addClass("disabled");
    } else {
        $("#pag-back").removeClass("disabled");
    }
    if ($("#pages li").eq($("#pages li").length - 1).hasClass("active")) {
        $("#pag-next").addClass("disabled");
    } else {
        $("#pag-next").removeClass("disabled");
    }
}
/////////////////////////////////////////
//     Ajax request:                   //
//        query creation               //
//        object creation              //
/////////////////////////////////////////
function runSearch() {

    var title = $("#titleField").val().trim();
    var author = $("#authorField").val().trim();
    var subject = $("#subjectField").val().trim();
    var publisher = $("#publisherField").val().trim();
    var isbn = $("#isbnField").val().trim();
    var lccn = $("#lccnField").val().trim();
    var oclc = $("#oclcField").val().trim();

    var paidFilter = $("input:checked").filter("input[name='filterGroup']").next().text().toLowerCase().split(" ").join("-");
    console.log(paidFilter + " filter");
    var orderFilter = $("input:checked").filter("input[name='orderGroup']").next().text().toLowerCase();
    var printFilter = $("input:checked").filter("input[name='printGroup']").next().text().toLowerCase();
    console.log(orderFilter + " order filter");
    console.log(printFilter + "print filter");
    var queryURL = "https://www.googleapis.com/books/v1/volumes?q=+intitle:" + title + "+inauthor:" + author + "+subject: " + subject + "+inpublisher:" + publisher + "+isbn:" + isbn + "+lccn:" + lccn + "+oclc:" + oclc + "&key=" + googleBooksApiKey + "&maxresults=10&projection=lite&orderBy=" + orderFilter + "&printType=" + printFilter + "";
    getURL();
    function getURL() {
        //reminder: add ":" before values in form
        var formArr = [title, author, subject, publisher, isbn, lccn, oclc];
        var key = ["+intitle:", "+inauthor:", "+subject:", "+inpublisher:", "+isbn:", "+lccn:", "+oclc:"]
        console.log(queryURL);
        //checkString function?
        checkFilter();
        for (var i = 0; i < formArr.length; i++) {
            if (formArr[i] === undefined || formArr[i] === "") {
                var str = key[i] + formArr[i];
                console.log(str);
                queryURL = queryURL.replace(str, "");
                console.log("query URL after changes" + queryURL);
            }


        }
        function checkFilter() {
            if (paidFilter !== "none") {
                queryURL = queryURL + "&filter=" + paidFilter;
                console.log(queryURL);
            }
        }
        resetForm();
    }


    queryURL += "&maxResults=40";

    $.ajax({
        url: queryURL,
        method: 'GET'
    }).done(function (response) {
        console.log(JSON.stringify(response) + "response from Google Books API");
        console.log(queryURL);

        searchResult = [];
        var amountResult = 0;
        if (response.hasOwnProperty("items")) {
            amountResult = response.items.length;
            response.items.forEach(function (value) {

                if (value.saleInfo.hasOwnProperty("listPrice")) {
                    var book = {
                        title: value.volumeInfo.title,
                        authors: value.volumeInfo.authors,
                        publisher: value.volumeInfo.publisher,
                        publishedDate: value.volumeInfo.publishedDate,
                        pageCount: value.volumeInfo.pageCount,
                        printedPageCount: value.volumeInfo.printedPageCount,
                        imageLinks: value.volumeInfo.imageLinks,
                        retailPrice: value.saleInfo.retailPrice.amount,
                        buylink: value.saleInfo.buyLink
                    };
                    if(!value.volumeInfo.hasOwnProperty("authors")){
                        continue;
                    }
                    if (value.volumeInfo.hasOwnProperty("description")) {
                        book.description = value.volumeInfo.description;
                    } else {
                        continue;
                    }
                    if (value.volumeInfo.hasOwnProperty("industryIdentifiers")) {
                        book.industryIdentifiers = value.volumeInfo.industryIdentifiers;
                    } else {
                        continue;
                    }
                    searchResult.push(book);
                } else {
                    amountResult--;
                }
            });
            $("#numberResults").text(amountResult);
        }
        initialSetupPagination();
    });
}

function resetForm() {
    //set text of form elements to be empty string
    $("#titleField").text("");
    $("#authorField").text("");
    $("#subjectField").text("");
    $("#publisherField").text("");
    $("#isbnField").text("");
    $("#lccnField").text("");
    $("#oclcField").text("");
}

///////////////////////////////////////
//       Click Event for Submit      //
///////////////////////////////////////
$("#submitSearch").click(runSearch);
$(".searchForm").keyup(function(event){
    console.log("hllo");
    if(event.which === 13){
        event.preventDefault();
        runSearch();
    }
})
///////////////////////////////////////
//         Ready function            //
//  Check for search string in       //
//  session storage                  //
///////////////////////////////////////
$(document).ready(function () {

    $(".button-collapse").sideNav();
    var qSearch = sessionStorage.getItem("query");
    if(qSearch.length > 0){
        $("#titleField").val(qSearch);
        runSearch();
    }
    sessionStorage.setItem("query", "");
});
///////////////////////////////////////
//    Collapsible Icon change        //
///////////////////////////////////////
$("#advanceSearchColumn .collapsible-header").on("click", function () {
    var iconText = $(this).find("i").text();
    if (iconText == "keyboard_arrow_up") {
        $(this).find("i").text("keyboard_arrow_down");
    } else {
        $(this).find("i").text("keyboard_arrow_up");
    }
});
//////////////////////////////////////
//       Key listener for           //
//       search field in nav        //
//////////////////////////////////////
$(document).on("keyup", function(e){
    if((e.key === "Enter")&& $("#querySearch").val().length > 0){
        //console.log("#querySearch");
        $("#titleField").val($("#querySearch").val());
        $("#querySearch").val("");
        runSearch();  
    }
});
///////////////////////////////////////////
//          Input Changed Handler        //
///////////////////////////////////////////
$("#querySearch2").on("input", function(){
    $("#querySearch").val($("#querySearch2").val());
});
$("#querySearch").on("input", function(){
    $("#querySearch2").val($("#querySearch").val());
});
/////////////////////////////////////////////////
//pagination buttons                           //
/////////////////////////////////////////////////
$(document).on("click", "#pages li:not(.active)", function () {

    var index = parseInt($(this).attr("data-index"));
    var dataLength = 6;
    if (searchResult.length - index < amount) {
        dataLength = searchResult.length - index;
    }
    generateItems(index, dataLength);
    $("#pages").find(".active").addClass("wave-effect").removeClass("active");
    $(this).removeClass("wave-effect").addClass("active");
    leftRightChevronCheck();
});
$(document).on("click", "#pag-back:not(.disabled)", function () {
    var indexElement = $("#pages li").index($("#pages li.active")) - 1;
    var dataIndex = parseInt($("#pages li").eq(indexElement).attr("data-index"));
    var dataLength = 6;
    if (searchResult.length - dataIndex < amount) {
        dataLength = searchResult.length - dataIndex;
    }
    generateItems(dataIndex, dataLength);
    $("#pages").find(".active").addClass("wave-effect").removeClass("active");
    $("#pages li").eq(indexElement).removeClass("wave-effect").addClass("active");
    leftRightChevronCheck();
});
$(document).on("click", "#pag-next:not(.disabled)", function () {
    var indexElement = $("#pages li").index($("#pages li.active")) + 1;
    var dataIndex = parseInt($("#pages li").eq(indexElement).attr("data-index"));
    var dataLength = 6;
    if (searchResult.length - dataIndex < amount) {
        dataLength = searchResult.length - dataIndex;
    }
    console.log(dataIndex);
    console.log(dataLength);
    generateItems(dataIndex, dataLength);
    $("#pages").find(".active").addClass("wave-effect").removeClass("active");
    $("#pages li").eq(indexElement).removeClass("wave-effect").addClass("active");
    leftRightChevronCheck();
});
///////////////////////////////////////////////////////////////////
//                  Book Card Click into Local Storage           //
///////////////////////////////////////////////////////////////////
$(document).on("click", ".card-image", function(){
    console.log("hello");
    var indexValue = parseInt($(this).attr("data-index"));
    localStorage.setItem("bookInfo", JSON.stringify(searchResult[indexValue]));
    open("./book.html","_self");
});

$("#login, #login2").on("click", function(){
    open("./login.html", "_self");
});