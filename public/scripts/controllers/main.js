'use strict';

angular.module('todoListApp')
.controller('mainCtrl', function($scope, $log, $interval, dataService){

  $scope.seconds = 0;

  $scope.counter = function(){
    $scope.seconds++;
    $log.log($scope.seconds + ' have passed!');
  };

  $interval($scope.counter, 1000, 10);

  $scope.addTodo = function(){
    var todo = {name: "This is a new todo."};
    $scope.todos.unshift(todo);
  };

  dataService.getTodos(function(response){
    $scope.todos = response.data.todos;
  });

  $scope.deleteTodo = function(todo, index){
    dataService.deleteTodo(todo).then(function(){
      $scope.todos.splice(index, 1);
    });
  };

  $scope.saveTodos = function(){
    var toSave = $scope.todos.filter(function(todo){
      if(todo.edited)
        return todo;
    });
    dataService.saveTodos(toSave)
      .finally($scope.resetTodoState());
  };

  $scope.resetTodoState = function(){
    $scope.todos.forEach(function(todo){
      todo.edited = false;
    });
  };

});
