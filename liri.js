require("dotenv").config();
var Spotify = require("node-spotify-api");
var keys = require("./keys.js");
var omdbApi = require("omdb-client");
var fs = require("fs");

//var spotify = new Spotify(keys.spotify);
var axios = require("axios");
var spotify = new Spotify(keys.spotify);

var command = process.argv[2];
var value = process.argv[3];
//console.log(command);
//console.log(value);
//console.log(spotify);
//console.log(omdbApi);


if (command == "concert-this") {

  var queryUrl = "https://rest.bandsintown.com/artists/" + value + "/events?app_id=codingbootcamp";

  axios.get(queryUrl).then(
    function (response) {
      var shows = response.data;
      for (var i = 0; i < shows.length; i++) {


        console.log("venue name: " + shows[i].venue.name);
        console.log("venue city: " + shows[i].venue.city);
        console.log("date: " + shows[i].datetime);
        console.log("\n\n");
      }
    }
  );

}
if (command == "spotify-this-song") {

  spotify.search({ type: 'track', query: value }, function (err, data) {
    if (err) {
      return console.log('Error occurred: ' + err);
    }
    var artists = data.tracks.items;
    for (var i = 0; i < artists.length; i++) {
      console.log("Artist: " + artists[i].album.artists[0].name);
      console.log("Album: " + artists[i].album.name)
      console.log("Song: " + value)
      console.log("Spotify Url: " + artists[i].album.external_urls.spotify);
      console.log("\n\n");
    }
  });

}
if (command == "movie-this") {

  var queryUrl = "http://www.omdbapi.com/?t=" + value + "&y=&plot=short&apikey=trilogy";
  axios.get(queryUrl).then(
    function (response) {
      console.log(response.data.Actors);
      console.log(response.data.Title);
      console.log(response.data.Year);
      console.log(response.data.imdbRating);

      console.log(response.data.Ratings[1].Value);
      console.log(response.data.Country);
      console.log(response.data.Language);
      console.log(response.data.Plot);
    }
  )


}
if (command == "do-what-it-says") {
  fs.readFile("random.txt", "utf8", function (error, data) {
    console.log(data);
    var dataArray = data.split(",");
    command = dataArray[0];
    value = dataArray[1];

    if (command == "concert-this") {

      var queryUrl = "https://rest.bandsintown.com/artists/" + value + "/events?app_id=codingbootcamp";

      axios.get(queryUrl).then(
        function (response) {
          var shows = response.data;
          for (var i = 0; i < shows.length; i++) {


            console.log("venue name: " + shows[i].venue.name);
            console.log("venue city: " + shows[i].venue.city);
            console.log("date: " + shows[i].datetime);
            console.log("\n\n");
          }
        }
      );

    }
    if (command == "spotify-this-song") {

      spotify.search({ type: 'track', query: value }, function (err, data) {
        if (err) {
          return console.log('Error occurred: ' + err);
        }
        var artists = data.tracks.items;
        for (var i = 0; i < artists.length; i++) {
          console.log("Artist: " + artists[i].album.artists[0].name);
          console.log("Album: " + artists[i].album.name);
          console.log("Song: " + value);
          console.log("Spotify Url: " + artists[i].album.external_urls.spotify);
          console.log("\n\n");
        }
      });

    }
    if (command == "movie-this") {

      var queryUrl = "http://www.omdbapi.com/?t=" + value + "&y=&plot=short&apikey=trilogy";
      axios.get(queryUrl).then(
        function (response) {
          console.log("Actor: " + response.data.Actors);
          console.log("Title: " + response.data.Title);
          console.log("Year: " + response.data.Year);
          console.log("IMDB Rating: " + response.data.imdbRating);

          console.log("Rotten Tomato Rating: " + response.data.Ratings[1].Value);
          console.log("Country: " + response.data.Country);
          console.log("Language: " + response.data.Language);
          console.log("Plot: " + response.data.Plot);
          console.log("\n\n");
        }
      )


    }

  })
}