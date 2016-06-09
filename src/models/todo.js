'use strict';

var mongoose = require('mongoose');

var todoSchema = new mongoose.Schema({
  name: String,
  completed: Boolean
});

var model = mongoose.model('todos', todoSchema);

module.exports = model;
