
$('.carousel.carousel-slider').carousel({ fullWidth: true });

$(document).ready(function () {
    $(".button-collapse").sideNav();
    $('.carousel').carousel({ dist: 0 });
    window.setInterval(function () { $('.carousel').carousel('next') }, 5000)
});

$(".btn-floating2").click(function () {
    $('html, body').animate({
        scrollTop: $("#bottom").offset().top
    }, 1500);
});
///////////////////////////////////////////
//      Store search to session storage  //
///////////////////////////////////////////
function addSessionStorage(query){
    sessionStorage.setItem("query", query);
    open("./html/search.html", "_self");
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
///////////////////////////////////////////
//              login page               //
///////////////////////////////////////////
$("#login, #login2").on("click", function(){
    open("./html/login.html", "_self");
});

var config = {
    apiKey: "AIzaSyCnvuYT1uFfE2BXKi_MbLlwhvDpVLEi6So",
    authDomain: "page-turner-198318.firebaseapp.com",
    databaseURL: "https://page-turner-198318.firebaseio.com",
    projectId: "page-turner-198318",
    storageBucket: "page-turner-198318.appspot.com",
    messagingSenderId: "246039286101"
};
firebase.initializeApp(config);
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