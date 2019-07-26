
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
var value = process.argv.slice(3).join(" ");

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
// function for concert-this
function concertThis(value) {
  axios.get("https://rest.bandsintown.com/artists/" + value + "/events?app_id=codingbootcamp")
    .then(function (response) {
      var concertData =
        "--------------------------------------------------------------------" +
        "\nName: " + response.data[0].venue.name +
        "\nCountry: " + response.data[0].venue.country +
        "\nCity: " + response.data[0].venue.city +
        "\nDate: " + moment(response.data[0].datetime).format("MM/DD/YYYY")
      fs.appendFile("log.txt", concertData, function (err) {
        console.log(concertData);
      })
    })
    .catch(function(err) {
    console.log(err);
  });
};
// function for spotify-this-song
function spotifySong(value) {
  if (!value) {
    value = "The Sign";
  }
  spotify
    .search({ type: 'track', query: value })
    .then(function (response) {
        var dataSpotify =
          "--------------------------------------------------------------------" +
          "\nArtist(s): " + response.tracks.items[0].artists[0].name +
          "\nSong Name: " + response.tracks.items[0].name +
          "\nAlbum Name: " + response.tracks.items[0].album.name +
          "\nPreview Link: " + response.tracks.items[0].preview_url;

        console.log(dataSpotify);
      })
    .catch(function (err) {
      console.log(err);
    });
}
// function for movie-this
function movieThis(value) {
  if (!value) {
    value = "mr nobody";
  }
  axios.get("https://www.omdbapi.com/?t=" + value + "&y=&plot=short&apikey=trilogy")
    .then(function (response) {
      var dataMovie =
        "--------------------------------------------------------------------" +
        "Title: " + response.data.Title +
        "\nRelease Year: " + response.data.Year +
        "\nIMDB Rating: " + response.data.imdbRating +
        "\nRotten Tomatos Rating: " + response.data.Ratings[1].Value +
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
// function for do-this
function doThis(value) {

  fs.readFile("random.txt", "utf8", function(err, data) {
      if (err) {
          return console.log(err);
      }
      var arrData = data.split(',');
      command = arrData[0];
      value = arrData[1];
      if (command == "spotify-this-song")
      spotifySong(value);
      if (command == "movie-this")
      movieThis(value);
      if (command == "concert-this")
      concertThis(value);
  })
}
