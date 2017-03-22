
let exec = require('child_process').exec
let command = 'mongoimport --db orion-thyme --collection recipes --drop --file data.json --jsonArray'

exec(command, function(error, stdout, stderr){

});

