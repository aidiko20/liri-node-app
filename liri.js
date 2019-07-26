
require("dotenv").config();
// Setting up our variables
var keys = require("./keys.js");
var Spotify = require('node-spotify-api');
var spotify = new Spotify(keys.spotify);
var moment = require('moment');
moment().format();
var axios = require('axios');
var fs = require('fs');
var command = process.argv[2];
var value = process.argv[3];

// Switch command add new var for function 
switch (command) {
  case "concert-this":
    concertThis(value);
    break;
  case "spotify-this-song":
    spotifySong(value);
    break;
  case "movie-this":
    movieThis(value);
    break;
  case "do-what-it-says":
    doThis(value);
    break;
};
function concertThis(value){
  axios.get("https://rest.bandsintown.com/artists/" + value + "/events?app_id=codingbootcamp")
  .then(function(response){
    // if(response.data[0].value)
    // console.log(response.data[0]);
    console.log("Name: "+response.data[0].venue.name + " Country: " + response.data[0].venue.country + " City: " +response.data[0].venue.city);
    console.log(response.data[0].datetime)
      
  })
};
// Function for music data
function spotifySong(value){
  axios.get("")
  
}
