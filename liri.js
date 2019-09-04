require("dotenv").config();
var moment = require('moment');
const axios = require('axios');
var keys = require("./keys.js");
var Spotify = require("node-spotify-api");
var spotify = new Spotify(keys.spotify);
var fs = require("fs");
var formPhrase = require('font-ascii').default

var command = process.argv[2];
var searchInput = process.argv.slice(3).join(" ");

formPhrase('LIRI Bot', {
    typephase: 'Ghost',
    color: 'blue'
});

console.log("-----------------------------------------------------");
console.log("Command: ", command);
console.log("Arguments: ", searchInput);
console.log("-----------------------------------------------------");

switch (command) {
    case "concert-this":
        bandsAPI(searchInput);
        break;
    case "spotify-this-song":
        spotifyAPI(searchInput);
        break;
    case "movie-this":
        ombdAPI(searchInput.split(" ").join("+"));
        break;
    case "do-what-it-says":
        doWhat();
        break;
    case undefined:
        console.log("Please tell me what you want to do.");
        break;
    default:
        console.log("You entered an invalid command.");
}

// Spotify API

function spotifyAPI(track) {

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
    } else {

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
}

// OMBD API

function ombdAPI(movie) {

    if (searchInput == false) {
        movie = "Mr. Nobody"
    }
    axios.get(`http://www.omdbapi.com/?t=${movie}&apikey=trilogy`)
        .then(function (response) {
            // handle success
            console.log("-----------------------------------------------------");
            console.log(`Movie title: ${response.data.Title}`);
            console.log(`Year: ${response.data.Year}`);
            console.log(`IMBD rating: ${response.data.imdbRating}`);
            console.log(`Rotten Tomatoes rating: ${response.data.Ratings[1].Value}`);
            console.log(`Country: ${response.data.Country}`);
            console.log(`Language: ${response.data.Language}`);
            console.log(`Plot: ${response.data.Plot}`);
            console.log(`Actors: ${response.data.Actors}`);

        })
        .catch(function (error) {
            // handle error
            console.log(error);
        })
};

//bandsAPI

function bandsAPI(band) {
    axios.get(`https://rest.bandsintown.com/artists/${band}/events?app_id=codingbootcamp`)
        .then(function (response) {
            // handle success
            response.data.forEach(element => {
                console.log("-----------------------------------------------------");
                console.log(`${element.venue.name}`);
                console.log(`${element.venue.city}, ${element.venue.region || element.venue.country}`, );
                console.log(`${ moment(element.datetime).format('MMMM Do YYYY, h:mm:ss a')}`);
                // console.log(element.venue.city);
                // console.log(element.venue.city);

            });


        })
        .catch(function (error) {
            // handle error
            console.log(error);
        })
};

function doWhat() {
    fs.readFile("random.txt", "utf8", (error, data) => {
        if (error) throw error;
        let rdata = data.split(",");
        console.log(rdata);


        spotifyAPI(rdata[1]);
    });
}

//change