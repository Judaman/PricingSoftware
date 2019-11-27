
  app.factory('productEntryService', function($rootScope) {
    var service = {};
    service.value = 0;

    service.prepForBroadcast = function(count) {
      this.value = count;
      this.broadcastItem();
    };

    service.getValue = function () {
      return service.value;
    };

    service.broadcastItem = function() {
      $rootScope.$broadcast('handleBroadcast');
    };

    return service;

  });
