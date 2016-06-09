'use strict';

var express = require('express'),
     colors = require('colors'),
     router = require('./api'),
     parser = require('body-parser');

var app = express();

require('./database');
require('./seed');


app.use('/', express.static('public'));
app.use(parser.json());
app.use('/api', router);

app.listen(3000, function(){
  console.log('The server is running on port 3000'.green);
});
