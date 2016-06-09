'use strict';

var mongoose = require('mongoose'),
      colors = require('colors');

mongoose.connect('mongodb://localhost/todos', function(err){
  if(err){
    console.log('Failed conneting to MongoDB!'.red);
  }
  else{
    console.log('Succesfully connected to MongoDB'.green);
  }
});
