var express = require('express');
var bodyParser = require('body-parser');
var mongo = require('mongo');
var mongoose = require('mongoose');
var Recipe = require('./models');
var app = express();
var path = require('path');
var formidable = require('formidable');
var fs = require('fs');

/*CONNECT TO DATABASE*/
//make sure to uncomment which connection you're using

var connection = 'mongodb://thyme:thyme@ds133340.mlab.com:33340/orion-thyme';
// var connection = 'mongodb://localhost/thyme';
mongoose.connect(connection);
mongoose.connection.once('open', function() {
  console.log('Thyme after thyme on: ' + connection);
});



/*CONNECT TO SERVER*/
var port = process.env.PORT || 3000;

app.use(express.static(__dirname + '/client'));
app.use(bodyParser.json());

// app.get('/', function(req, res) {
//   console.log('home!');
//   res.sendfile(__dirname + '/client/index.html');
// })

app.listen(port, function() {
  console.log("we're live!");
  console.log(port);
});



/*SERVER ROUTING*/
app.post('/api/recipes', function(req, res, next) {

  console.log(req.body);

  var recipe = new Recipe({
    time: req.body.time,
    servings: req.body.servings,
    ingredients: req.body.ingredients,
    steps: req.body.steps,
    title: req.body.title,
    author: req.body.author,
    cuisine: req.body.cuisine,
    diet: req.body.diet,
    image: req.body.image,
    description: req.body.description
  });
  recipe.save(function(err) {
    if (err) {
      throw err;
    }
    res.send(200, "Saved to DB");
    //add redirect to new recipe page
    next();
  });
});

app.get('/api/recipes', function(req, res, next) {
  Recipe.find(function(err, data) {
    if (err) {
      throw err;
    }
    res.status(200).send(data);
    next();
  });
});


//IMAGE UPLOAD


app.use(express.static(path.join(__dirname, 'public')));

app.get('/', function(req, res){
  res.sendFile(path.join(__dirname, 'views/index.html'));
});

app.post('/upload', function(req, res){

  // create an incoming form object
  var form = new formidable.IncomingForm();

  // specify that we want to allow the user to upload multiple files in a single request
  form.multiples = true;

  // store all uploads in the /uploads directory
  form.uploadDir = path.join(__dirname, '/uploads');

  // every time a file has been uploaded successfully,
  // rename it to it's orignal name
  form.on('file', function(field, file) {
    fs.rename(file.path, path.join(form.uploadDir, file.name));
  });

  // log any errors that occur
  form.on('error', function(err) {
    console.log('An error has occured: \n' + err);
  });

  // once all the files have been uploaded, send a response to the client
  form.on('end', function() {
    res.end('success');
  });

  // parse the incoming request containing the form data
  form.parse(req);

});
