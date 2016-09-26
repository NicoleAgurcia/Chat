var app = angular.module('chatApp', ['btford.socket-io', 'MessageController', 'luegg.directives']);

app.factory('$socket', function (socketFactory) {
  return socketFactory();
});


