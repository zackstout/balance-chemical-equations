
//dependencies:
var express = require('express');

//set up server:
var app = express();
var port = process.env.PORT || 5050;

app.use(express.static('public'));

//Listener
app.listen(port, function() {
  console.log('thx for listening on channel', port);
});
