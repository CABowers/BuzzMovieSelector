/**
 * Created by coleb_000 on 4/23/2016.
 */
var Firebase = require("firebase");



function login () {

    var password = document.getElementById("pwd").value;
    var email = document.getElementById("usr").value;
    loginReal(email, password);
    //var ref = new Firebase("https://scorching-inferno-6879.firebaseio.com");
    /*
    ref.on("value", function(snapshot) {

        var realPassword = snapshot.val()["Users"][user];
        if(realPassword === password){
            var newUrl = "HomePage.html";
            window.location.replace(newUrl);
        } else {
            document.getElementById("testing").innerHTML = "Invalid Username or password";
            document.getElementById("testing").style.color = "red";
        }
    });
    */

}
function loginReal(email, password) {

    var ref = new Firebase("https://scorching-inferno-6879.firebaseio.com");
    ref.authWithPassword({
        email    : email,
        password : password
    }, function(error, authData) {
        if (error) {
            //console.log("Login Failed!", error);
            document.getElementById("testing").innerHTML = error;
            document.getElementById("testing").style.color = "red";
        } else {
            //console.log("Authenticated successfully with payload:", authData);
            var newUrl = "HomePage.html";
            window.location.replace(newUrl);
        }
    },{
        remember: "sessionOnly"
    });
}

function register() {
    var newUrl = "Register.html";
    window.location.replace(newUrl);
}

function homePage() {
    var newUrl = "Login.html";
    window.location.replace(newUrl);
}

function makeUser() {
    var p1 = document.getElementById("p1").value;
    var email = document.getElementById("email").value;
    var p2 = document.getElementById("p2").value;
    var ref = new Firebase("https://scorching-inferno-6879.firebaseio.com");
    if(p1 === p2) {
        ref.createUser({
            email    : email,
            password : p1
        }, function(error, userData) {
            if (error) {
                //console.log("Error creating user:", error);
                document.getElementById("feedback").innerHTML = error;
                document.getElementById("feedback").style.color = "red";
            } else {
                //console.log("Successfully created user account with uid:", userData.uid);
                loginReal(email, p1);
            }
        });
        /*
        var exists;
        ref.on("value", function(snapshot) {
           exists = (snapshot.val()["Users"][email] === undefined);
        });
        if(exists){
            ref.child("Users").push({
                [email]: p1 //works
            });

            var newUrl = "HomePage.html";
            window.location.replace(newUrl);

        } else {
            document.getElementById("feedback").innerHTML = "User already exists";
            document.getElementById("feedback").style.color = "red";
        }
        */
    } else {
        document.getElementById("feedback").innerHTML = "Passwords don't match";
        document.getElementById("feedback").style.color = "red";
    }
}

function toForgot() {
    var newUrl = "Forgot.html";
    window.location.replace(newUrl);
}

function forgot() {
    var email = document.getElementById("rEmail").value;
    var ref = new Firebase("https://scorching-inferno-6879.firebaseio.com");
    ref.resetPassword({
        email : email
    }, function(error) {
        if (error === null) {
            //console.log("Password reset email sent successfully");
            document.getElementById("update").innerHTML = "Password reset email sent successfully";
            document.getElementById("update").style.color = "green";
        } else {
            //console.log("Error sending password reset email:", error);
            document.getElementById("update").innerHTML = error;
            document.getElementById("update").style.color = "red";
        }
    });
}

