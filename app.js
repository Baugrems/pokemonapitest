var express = require('express');
var app = express();
var request = require('request');
var bodyParser = require('body-parser');

// set the view engine to ejs
app.set('view engine', 'ejs');

app.use(express.static(__dirname + '/public'));
app.use(bodyParser.urlencoded({extended: true}));

app.get("/", function(req,res){
    res.render('home');
});

app.get("/pokemon/:id/", function(req,res){
    getPokemon(req.params.id.toLowerCase(),function(err, result){
        res.render("pokemon", {pokemon: result});
    });
});

app.get("/search/", function(req,res){
    res.render("search");
});

app.post("/search/", function(req,res){
    if (!req.body) return res.render("/search/");
    var pokeID = req.body.pokeID.toLowerCase();
    if(pokeID == ""){
        res.render("search");
    }
    else {
        getPokemon(pokeID,function(err, result){
            if(err){res.render("search")}
            else if(result == "Not Found"){
                res.render("search");
            }
            else{
                res.render("pokemon", {pokemon: result});
            }
        });
    }
});


function getPokemon(id, callback){
    url = "https://pokeapi.co/api/v2/pokemon/" + id;
    request(url, { json: true }, (err, res, body) => {
    if(err) {
            return callback(err);
            }
    else {
        callback(null, body);
    }
});


}

//Listener to turn website on
app.listen(process.env.PORT, process.env.IP);
console.log("App is listening");
