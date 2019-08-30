require("dotenv").config();

var keys = require("./keys.js");
var Spotify = require("node-spotify-api");
var spotify = new Spotify(keys.spotify);

var command = process.argv[2];
var searchInput = process.argv.slice(3).join(" ");
// var searchInput = command.join(" ");

console.log("Command: ", command);
console.log("Arguments: ", searchInput);

switch (command) {
    case "concert-this":
        bandsAPI();
        break;
    case "spotify-this-song":
        if (searchInput == false) {
            spotify
                .request('https://api.spotify.com/v1/tracks/0hrBpAOgrt8RXigk83LLNE')
                .then(function (response) {
                    console.log("-----------------------------------------------------");
                    console.log(`Song title: ${response.name}`);
                    console.log(`Artist: ${response.artists[0].name}`);
                    console.log(`Preview Link: ${response.external_urls.spotify}`);
                    console.log(`Album: ${response.album.name}`);
                })
                .catch(function (err) {
                    console.error('Error occurred: ' + err);
                });
            break;
        }
        spotifyAPI(searchInput);
        break;
    case "movie-this":
        ombdAPI();
        break;
    case "do-what-it-says":
        randomFile();
        break;
    case undefined:
        console.log("Please tell me what you want to do.");
        break;
    default:
        console.log("You entered an invalid command.");
}

// Spotify API

function spotifyAPI(track) {

    spotify
        .search({
            type: 'track',
            query: track,
            limit: 10
        })
        .then(function (response) {

            for (i = 1; i < response.tracks.items.length; i++) {
                console.log("-----------------------------------------------------");
                console.log(`Song title: ${response.tracks.items[i].name}`);
                console.log(`Artist: ${response.tracks.items[i].album.artists[0].name}`);
                console.log(`Preview Link: ${response.tracks.items[i].external_urls.spotify}`);
                console.log(`Album: ${response.tracks.items[i].album.name}`);
            }
        })
        .catch(function (err) {
            console.log(err);
        });

}

// OMBD API

function ()