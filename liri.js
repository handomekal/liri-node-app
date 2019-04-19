require("dotenv").config();
var Spotify = require("node-spotify-api");
var keys = require("./keys.js");
var omdbApi = require("omdb-client");

//var spotify = new Spotify(keys.spotify);
var axios = require("axios");
var spotify = new Spotify(keys.spotify);

var command = process.argv[2];
var value = process.argv[3];
console.log(command);
console.log(value);
console.log(spotify);
console.log(omdbApi);


if (command == "concert-this") {

    var queryUrl = "https://rest.bandsintown.com/artists/" + value + "/events?app_id=codingbootcamp";

    axios.get(queryUrl).then(
        function (response) {
            console.log(response.data[0].venue);
        }
    );

}
if(command == "spotify-this-song") {
    
  spotify.search({ type: 'track', query: value }, function(err, data) {
    if (err) {
      return console.log('Error occurred: ' + err);
    }
   
  console.log(data.tracks.items[0]); 
  });
  
}
if(command == "movie-this") {

    var queryUrl = "http://www.omdbapi.com/?t=" + value + "&y=&plot=short&apikey=trilogy";
    axios.get(queryUrl).then(
        function(response){
            console.log(response)
        }
    )

    
}