
require("dotenv").config();
// Seeting up our variables
  var keys = require("./keys.js");
  var Spotify = require('node-spotify-api');
  var spotify = new Spotify(keys.spotify);
  var moment = require ('moment');
  moment().format();
  var axios = requiren('axios');
  var fs = require('fs');
  var command = process.argv[2];
  var value = process.argv[3];
  