
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
function addSessionStorage(query){
    sessionStorage.setItem("query", query);
    open("./html/search.html", "_self");
}
$(document).on("keyup", function(e){
    if((e.key === "Enter")&& $("#querySearch").val().length > 0){
        addSessionStorage($("#querySearch").val());
    }
});