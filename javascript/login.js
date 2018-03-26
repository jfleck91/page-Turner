
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