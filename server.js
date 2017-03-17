var express = require('express');
var bodyParser = require('body-parser');
var mongo = require('mongo');
var mongoose = require('mongoose');
var app = express();


/*CONNECT TO DATABASE*/
//make sure to uncomment which connection you're using

// var connection = 'mongodb://thyme:thyme@ds133340.mlab.com:33340/orion-thyme';
var connection = 'mongodb://localhost/thyme';
mongoose.connect(connection);
mongoose.connection.once('open', function() {
  console.log('Thyme after thyme on: ' + connection)
})



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
app.post('/api/recipes', function(){
  console.log('Donuts are yummy');
})
