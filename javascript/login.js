
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

$(document).ready(function () {
    $(".button-collapse").sideNav();
  //  console.log(firebase.ServerValue.TIMESTAMP);
});
var books = [];
auth.onAuthStateChanged(function(user) {
    if (user) {
        console.log(user);
        if(user!= null){
            var email = user.email;
            $("#currentEmail").text(email);
            $("#createForm").addClass("noneDisplay");
            $("#loginForm").addClass("noneDisplay");
            $("#signoutForm").removeClass("noneDisplay");
            $("#login, #login2").text(email);
            books = [];
            $("#listDiv").empty();
            database.ref("users/" + email.split(".")[0] + "/watchList").once("value", function(snapshot){
                var object = snapshot.val();
                for(var key in object){
                    if(key != "example"){
                        //execute
                        books.push(object[key]);
                        console.log(object[key]);
                        $("#listDiv").append("<a class = 'waves-effect waves-light btn-flat grey listAnchor' data-index = '"+
                            books.indexOf(object[key])+
                            "'>"+key+"</a>");
                    }
                }
            });
            $("#singleCardDiv").empty();
        }
    } else {
        $("#createForm").addClass("noneDisplay");
        $("#loginForm").removeClass("noneDisplay");
        $("#signoutForm").addClass("noneDisplay");
        $("#login, #login2").text("Login");
    }
});
function login(){
    var email = $("#email").val();
    var password = $("#password").val();
    var error = false;
    auth.signInWithEmailAndPassword(email, password).catch(function (err){
        $("#email").val("");
        $("#password").val("");
        console.log(err);
        M.toast({
            html: err.message
        });
    });
    if(!error){
        var object = {
            lastLoggedIn: Firebase.ServerValue.TIMESTAMP
        };
        database.ref("users/" + email.split(".")[0]).update(object);
    }
}
function create(){
    var email = $("#emailCreate").val().trim();
    var password = $("#passwordCreate").val();
    var error = false;
    auth.createUserWithEmailAndPassword(email, password).catch(function(err){
        $("#emailCreate").val("");
        $("#passwordCreate").val("");
        console.log(err);
        M.toast({
            html: err.message
        });
        error = true;
    });
    if(!error){
        var object = {};
        object[email.split(".")[0]] = {
            watchList: {
                example: "nothing"
            }
        };
        database.ref("users").update(object);
    }
}
function logout(){
    auth.signOut().catch(function (err){
        console.log(err);
        M.toast({
            html: err.message
        });
    });
}
$("#createLink").on("click", function(){
    $("#loginForm").addClass("noneDisplay");
    $("#createForm").removeClass("noneDisplay");
});
$("#loginLink").on("click", function(){
    $("#createForm").addClass("noneDisplay");
    $("#loginForm").removeClass("noneDisplay");
});
$("#createButton").on("click", create);
$("#loginButton").on("click", login);
$("#logoutButton").on("click",logout);

$("#login, #login2").on("click", function(){
    open("./login.html", "_self");
});
$(document).on("click", ".listAnchor", function(){
    $("#singleCardDiv").empty();

    var object = books[parseInt($(this).attr("data-index"))];
    $(".listAnchor.disabled").removeClass("disabled");
    $(this).addClass("disabled");
    var source = $("#search-card-template").html();
        var template = Handlebars.compile(source);
        var context = {
            imageSrc: object.imageLinks.thumbnail,
            title: object.title,
            price: object.retailPrice,
            shortDescription: "",
            longDescription: "",
            author: "",
            dataIndex: 0
        };
        shortDesc = "";
        if (object.description != null) {
            if (object.description.length > 100) {
                shortDesc = object.description.substring(0, 100) + "...";
            } else {
                shortDesc = object.description;
            }
            context.shortDescription = shortDesc;
            context.longDescription = object.description;
        }

        authors = "";
        object.authors.forEach(function (authorName) {
            authors += authorName + ', ';
        });
        authors = authors.substring(0, authors.length - 2);
        context.author = authors;
        var html = template(context);
        $("#singleCardDiv").append($(html));
});