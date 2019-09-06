// Modules

require("dotenv").config();
var moment = require('moment');
const axios = require('axios');
var keys = require("./keys.js");
var Spotify = require("node-spotify-api");
var spotify = new Spotify(keys.spotify);
var fs = require("fs");
var formPhrase = require('font-ascii').default;

// Input variables 
var command = process.argv[2];
var searchInput = process.argv.slice(3).join(" ");
var data = [];
var line = "---------------------------------------------------------------------"


// Spotify API

function spotifyAPI(track) {

    if (searchInput == false) {
        spotify
            .request('https://api.spotify.com/v1/tracks/0hrBpAOgrt8RXigk83LLNE')
            .then(function (response) {

                data.push(line);
                data.push(`Song title: ${response.name}`);
                data.push(`Artist: ${response.artists[0].name}`);
                data.push(`Preview Link: ${response.external_urls.spotify}`);
                data.push(`Album: ${response.album.name}`);
                logData();
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
                    data.push(line);
                    data.push(`Song title: ${response.tracks.items[i].name}`);
                    data.push(`Artist: ${response.tracks.items[i].album.artists[0].name}`);
                    data.push(`Preview Link: ${response.tracks.items[i].external_urls.spotify}`);
                    data.push(`Album: ${response.tracks.items[i].album.name}`);
                    logData();
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
            data.push(line);
            data.push(`Movie title: ${response.data.Title}`);
            data.push(`Year: ${response.data.Year}`);
            data.push(`IMBD rating: ${response.data.imdbRating}`);
            data.push(`Rotten Tomatoes rating: ${response.data.Ratings[1].Value}`);
            data.push(`Country: ${response.data.Country}`);
            data.push(`Language: ${response.data.Language}`);
            data.push(`Plot: ${response.data.Plot}`);
            data.push(`Actors: ${response.data.Actors}`);
            logData();
        })
        .catch(function (error) {
            // handle error
            console.log(error);
        })
};

//bandsAPI

function bandsAPI(band) {
    if (searchInput == false) {
        console.log("Please enter a band name.")
    } else {
        axios.get(`https://rest.bandsintown.com/artists/${band}/events?app_id=codingbootcamp`)
            .then(function (response) {
                // handle success
                response.data.forEach(element => {
                    data.push(line);
                    data.push(`${element.venue.name}`);
                    data.push(`${element.venue.city}, ${element.venue.region || element.venue.country}`, );
                    data.push(`${ moment(element.datetime).format('MMMM Do YYYY, h:mm:ss a')}`);
                    logData();
                });

            })
            .catch(function (error) {
                // handle error
                console.log(error);
            })
    };
};

function doWhat() {
    fs.readFile("random.txt", "utf8", (error, data) => {
        if (error) throw error;
        let rdata = data.split(",");
        spotifyAPI(rdata[1]);
    });
}

function logData() {
    fs.appendFile("log.txt", "\n" + line + "\n" + line + "\n" + moment().format('MMMM Do YYYY, h:mm:ss a') + "\n" + "Command: " + command + "\n" + "Searched for: " + searchInput, function (err) {
        if (err) {
            return console.log(err);
        }
    });
    data.forEach(element => {
        console.log(element);
        fs.appendFile("log.txt", "\n" + element, function (err) {
            if (err) {
                return console.log(err);
            }
        });
    });
    data = [];
};

formPhrase('LIRI Bot', {
    typephase: 'Varsity',
    color: 'blue'
});

console.log(line);
console.log("Command: ", command);
console.log("Arguments: ", searchInput);
console.log(line);

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