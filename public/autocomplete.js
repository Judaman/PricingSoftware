var app = angular.module('myApp', []);
app.controller('myCtrl1', function($scope, $http) {

  $scope.total = function(string) {
    $http.get("/getItems" + "/" + "tsg" + "/" + "aw")
      .then(function mySuccess(response) {

        var allItems = [];
        response.data.result.forEach(function func(item, index) {
          allItems.push(item.item)
        });
        $scope.cars_list = allItems;
        //  $scope.rows.push(response.data);
      }, function myError(response) {});

    $scope.hideinfo = false;
    var output = [];
    angular.forEach($scope.cars_list, function(car) {
      if ((string!=="") && (car.toLowerCase().indexOf(string.toLowerCase()) >= 0)) {

        output.push(car);
      }
    });
    $scope.search_car = output;
  }
  $scope.choose_textbox = function(string) {
    $scope.car = string;
    $scope.hideinfo = true;
  }
});
