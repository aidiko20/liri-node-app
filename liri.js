
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
function concertThis(value) {
  axios.get("https://rest.bandsintown.com/artists/" + value + "/events?app_id=codingbootcamp")
    .then(function (response) {
      var concertData = 
      "Name: " + response.data[0].venue.name + 
      "\nCountry: " + response.data[0].venue.country + 
      "\nCity: " + response.data[0].venue.city + 
      "\nDate: " + response.data[0].datetime
      fs.appendFile("log.txt", concertData, function (err) {
        console.log(concertData);
      })
    })
};
function movieThis(value) {
  if(!value){
    value = "mr nobody";
}
  axios.get("https://www.omdbapi.com/?t=" + value + "&y=&plot=short&apikey=trilogy")
    .then(function (response) {
      var dataMovie = 
      "Title: " + response.data.Title + 
      "\nRelease Year: " + response.data.Release + 
      "\nIMDB Rating: " + response.data.imdbRating + 
      "\nRotten Tomatos Rating: " + response.data.Ratings.Value + 
      "\nProduction Country: " + response.data.Country + 
      "\nLanguage: " + response.data.Language + 
      "\nThe Plot: " + response.data.Plot + 
      "\nActors: " + response.data.Actors
      fs.appendFile("log.txt", dataMovie, function (err) {
        console.log(dataMovie);
            })
            .catch(function (error) {
              console.log(error);
    });
})
}
// Function for music data
// function spotifySong(value){
//   axios.get("")


