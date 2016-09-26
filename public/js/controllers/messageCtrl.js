'use strict'
var app = angular.module('MessageController', []);

app.controller('messagectrl', ["$socket","$scope", 
	function($socket, $scope) {
		$scope.message = '';
		$scope.messages = [];

		$socket.on('init', function (data) {
		    $scope.name = data.name;
		    $scope.users = data.users;
	  	});

		$socket.on('send message', function (message) {
			$scope.messages.push(message);
		});

		$socket.on('change name', function (data) {
			changeName(data.oldName, data.newName);
		});

		$socket.on('user join', function (data) {
		    $scope.messages.push({
		      user: 'chatroom',
		      text: 'User ' + data.name + ' has joined.'
		    });
		    $scope.users.push(data.name);
	  	});


	  	  var changeName = function (oldName, newName) {
		    // rename user in list of users
		    var i;
		    for (i = 0; i < $scope.users.length; i++) {
		      if ($scope.users[i] === oldName) {
		        $scope.users[i] = newName;
		      }
		    }

		    $scope.messages.push({
		      user: 'chatroom',
		      text: 'User ' + oldName + ' is now known as ' + newName + '.'
		    });
		  }
		 $scope.changeName = function () {
	
	    $socket.emit('change name', {
			  name: $scope.newName
			}, function (result) {
			  if (!result) {
			    alert('There was an error changing your name');
			  } else {
			    
			    changeName($scope.name, $scope.newName);

			    $scope.name = $scope.newName;
			    $scope.newName = '';
			  }
			});
		};


		$scope.sendMessage = function () {
		/*	let struct = {
			message: $scope.message,
			date: new Date()
			}

		  	$socket.emit('send message', struct );	  	
		  	$scope.messages.push($scope.message);
		  	$scope.message = '';*/
			$socket.emit('send message', {
      			message: $scope.message
    		});

    
			$scope.messages.push({
			  user: $scope.name,
			  text: $scope.message,
			});
    		$scope.message = '';
		}	  

	
}]);


