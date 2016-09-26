'use strict'
var app = angular.module('MessageController', []);

app.controller('messagectrl', ["$socket","$scope", 
	function($socket, $scope) {
		$scope.message = '';
		$scope.messages = [];

		$socket.on('send message', function (message) {
			$scope.messages.push(message);
		});

		$scope.sendMessage = function () {
			let struct = {
			message: $scope.message,
			date: new Date()
			}

		  	$socket.emit('send message', struct );	  	
		  	$scope.messages.push($scope.message);
		  	$scope.message = '';
		}	  

	
}]);


