'use strict';

angular.module('todoListApp')
.service('dataService', function($http, $q){

  this.getTodos = function(callback){
    $http.get('/api/todos').then(callback);
  };

  this.deleteTodo = function(todo){
    if(todo._id){
      return $http.delete('/api/todos/' + todo._id);
    }
  };

  this.saveTodos = function(todos){
    var queue = [];
    todos.forEach(function(todo){
      var request;
      if(!todo._id){
        request = $http.post('/api/todos', todo);
      } else{
        request = $http.put('/api/todos/' + todo._id, todo)
                    .then(function(result){
                      todo = result.data.todo;
                      return todo;
                    });
      }
      queue.push(request);
    });
    return $q.all(queue).then(function(results){
        console.log(todos.length + " todos has been saved!");
    });
  };

});
