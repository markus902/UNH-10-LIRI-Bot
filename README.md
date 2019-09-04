# Gif Tastic

### Description and usage

* This project is a CLI verion of the speach recognition SIRI. The user can give 4 different commands to search for song titles, movie titles or concerts. The user gets prompted 10 results for each search. If there is no command given, the the app will notify the user. If there a command but no input given, the app will prompt default results.

Possible commands:

- spotify-this-song
- movie-this
- concert-this
- do-what-is-says

### Code structure

The app first loads all required packages. Then users input is separated into the command and the search term which get stored in variables. The command is evaluated in a switch statemnet wich triggers one of 4 predefined functions. Each function evaluates if there the default case is applicable. If not the appropriate API is searched for the search term and the results are logged.


### Technologies

* Node.js supported by npm packages

* APIs (Spotify, Bands in Town and OMBD) accessed via axios

* Time conversion with MomentJS

* Reading and writing files

* Command line styling with FormPhrase