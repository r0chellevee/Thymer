
let exec = require('child_process').exec
let command = 'mongoimport --db DATABASENAME --collection COLLECTIONNAME --drop --file data.json --jsonArray'

exec(command, function(error, stdout, stderr){

});

