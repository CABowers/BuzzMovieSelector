/**
 * Created by coleb_000 on 4/23/2016.
 */
var Firebase = require("firebase");

var apiKey = "yedukp76ffytfuy24zsqk7f5";
var pageLimit = "1";
var info;

function myFunction() {
    var x = document.getElementById("demo");
    x.style.fontSize = "25px";
    x.style.color = "red";
}

function searchByName() {
    //var url = "http://api.rottentomatoes.com/api/public/v1.0/lists/movies/in_theaters.json?page_limit=" + pageLimit + "&page=1&country=us&apikey=" + apiKey;
    //var url = "http://api.rottentomatoes.com/api/public/v1.0/lists/movies/box_office.json?limit=1&country=us&apikey=yedukp76ffytfuy24zsqk7f5";
    var title = document.getElementById("title").value;
    //var url = "http://api.rottentomatoes.com/api/public/v1.0/movies.json?q=deadpool&page_limit=10&page=1&apikey=yedukp76ffytfuy24zsqk7f5";
    var url = "http://www.omdbapi.com/?t=" + title +"&y=&plot=short&r=json";

    var xhttp = new XMLHttpRequest();
     xhttp.onreadystatechange = function() {
         //document.getElementById("info").innerHTML = String(xhttp.status);
         if (xhttp.readyState == 4 && xhttp.status == 200) {
             info = JSON.parse(xhttp.responseText);
             displayMovieInfo(info);
             //document.getElementById("info").innerHTML = info;
         }
     };
     xhttp.open("GET", url, true);
     xhttp.send();
 }

function displayMovieInfo(movie){
    var image = document.createElement("img");
    var imageParent = document.getElementById("search");
    image.id = "poster";
    image.className = "class";
    image.style = "width:8%; height:8%";
    imageParent.appendChild(image);
    document.getElementById("poster").src = movie["Poster"];


    var p = document.createElement("p");
    p.id = "movies";
    imageParent.appendChild(p);
    document.getElementById("movies").innerHTML = "Title: " + movie["Title"]
        + "<br>" + "Year: "
        + movie["Year"]
        + "<br>" + "Rating: "
        + movie["imdbRating"]
        + "<br>"
        + "How would you rate this movie? (Scale 0-10)"
        +" <div class='form-group'> Rating: <input  class = 'inline' type='number' id='points' min='0' max='10' step='1'>&#160 &#160;"
        + '<button type="button" class="btn btn-default inline" onClick="rate()">Rate!</button></div>'
        + '<p id="rating"></p>';



}

function rate() {
    var value = document.getElementById("points").value;
    if (value >= 0 && value <= 10) {
        document.getElementById("rating").innerHTML = "Your Rating: " + value;
    } else {
        document.getElementById("rating").innerHTML = "Your Rating: Invalid rating";
    }

}

function logout() {
    var ref = new Firebase("https://scorching-inferno-6879.firebaseio.com");
    ref.unauth();
    var newUrl = "Login.html";
    window.location.replace(newUrl);
}

function updatePassword() {
    var op = document.getElementById("op").value;
    var np = document.getElementById("np").value;
    var pEmail = document.getElementById("pEmail").value;
    
    
    var ref = new Firebase("https://scorching-inferno-6879.firebaseio.com");
    ref.changePassword({
        email       : pEmail,
        oldPassword : op,
        newPassword : np
    }, function(error) {
        if (error === null) {
            //console.log("Password changed successfully");
            document.getElementById("pStatus").innerHTML = "Password changed successfully";
            document.getElementById("pStatus").style.color = "green";
        } else {
            //console.log("Error changing password:", error);
            document.getElementById("pStatus").innerHTML = error;
            document.getElementById("pStatus").style.color = "red";
        }
    });
}

function updateEmail() {
    var oe = document.getElementById("e1").value;
    var ne = document.getElementById("e2").value;
    var ePass = document.getElementById("ePass").value;
    
    var ref = new Firebase("https://scorching-inferno-6879.firebaseio.com");
    ref.changeEmail({
        oldEmail : oe,
        newEmail : ne,
        password : ePass
    }, function(error) {
        if (error === null) {
            //console.log("Email changed successfully");
            document.getElementById("eStatus").innerHTML = "Email changed successfully";
            document.getElementById("eStatus").style.color = "green";
            
        } else {
            //console.log("Error changing email:", error);
            document.getElementById("eStatus").innerHTML = error;
            document.getElementById("eStatus").style.color = "red";
        }
    });
}
