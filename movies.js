var express = require('express');
var app = express();
var fs = require("fs");

app.get('/getMovies', function (req, res) {
   fs.readFile( __dirname + "/" + "movies.json", 'utf8', function (err, data) {
      console.log( data );
      res.end( data );
   });
})

var movie = {
    "movie6" : {
        "title" : "12 Angry Men",
        "director" : "Henry Fonda",
        "genre" : "Action",
        "IMDB": "https://www.imdb.com/title/tt0050083/?ref_=chttp_t_5"
     },
 }
 
 app.post('/addMovie', function (req, res) {
    // First read existing users.
    fs.readFile( __dirname + "/" + "movies.json", 'utf8', function (err, data) {
       data = JSON.parse( data );
       data["movie6"] = movie["movie6"];
       console.log( data );
       res.end( JSON.stringify(data));
    });
 })

 app.get('/getMovie:id', function (req, res) {
    // First read existing users.
    fs.readFile( __dirname + "/" + "movies.json", 'utf8', function (err, data) {
       var movies = JSON.parse( data );
       var movie = movies["movie" + req.params.id] 
       console.log( movie );
       res.end( JSON.stringify(movie));
    });
 })

app.delete('/deleteMovie:id', function (req, res) {
   // First read existing users.
   fs.readFile( __dirname + "/" + "movies.json", 'utf8', function (err, data) {
      data = JSON.parse( data );
      delete data["movie" + req.params.id];
       
      console.log( data );
      res.end( JSON.stringify(data));
   });
})

var server = app.listen(8081, function () {
   var host = server.address().address
   var port = server.address().port
   console.log("Example app listening at http://%s:%s", host, port)
})
