
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
    } else {
        
    }
});
function login(){
    var email = $("#email").val();
    var password = $("#password").val();
    auth.signInWithEmailAndPassword(email, password).catch(function (err){
        console.log(err);
    });
}
function create(){
    var email = $("#emailCreate").val();
    var password = $("#passwordCreate").val();
    auth.createUserWithEmailAndPassword(email, password).catch(function(err){
        console.log(err);
    });
}
function logout(){
    auth.signOut().then(function (){

    }).catch(function (err){

    })
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