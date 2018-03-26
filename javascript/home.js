
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