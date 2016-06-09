'use strict';

var express = require('express'),
       Todo = require('../models/todo');

var router = express.Router();

router.get('/todos', function(req, res){
  Todo.find({}, function(err, todos){
    if(err){
      return res.status(500).json({message: err.message});
    }
    else{
      res.json({todos:todos});
    }
  });
});

router.post('/todos', function(req, res){
    var todo = req.body;
    Todo.create(todo, function(err){
      if(err){
        return res.status(500).json({message:err.message});
      }
      res.json({'todo':todo, message: 'Todo Created'});
    });

});

router.put('/todos/:id', function(req, res){
    var id = req.params.id;
    var todo = req.body;

    if(todo && todo._id !== id){
      return res.status(500).json({message: 'Ids dont match'});
    }
    Todo.findByIdAndUpdate(id, todo, {new:true}, function(err, todo){
      if(err){
        return res.status(500).json({message:err.message});
      }
      res.json({'todo':todo, message: 'Todo Updated'});
    });

});

router.delete('/todos/:id', function(req, res){
    var id = req.params.id;

    if(!id){
      return res.status(500).json({message: 'Id required'});
    }
    Todo.findByIdAndRemove(id, function(err, todo){
      if(err){
        return res.status(500).json({message:err.message});
      }
      res.json({'todo':todo, message: 'Todo Deleted'});
    });

});


module.exports = router;
