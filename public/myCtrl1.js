var app = angular.module('myApp', []);

app.controller('myCtrl1', function($scope, $http) {

  $scope.brands = ["TSG", "CUBITAC", "CNC"];
  $scope.styles = ["AW", "AP", "AK"];

  //// autocomplete script //////////
  $scope.total_1 = function(string) {
    $http.get("/getItems" + "/" + "tsg" + "/" + "aw")
      .then(function mySuccess(response) {

        var allItems = [];
        response.data.result.forEach(function func(items, index) {
          allItems.push(items.item)
        });
        $scope.cars_list = allItems;

      }, function myError(response) {});

    $scope.hideinfo = false;
    var output = [];
    angular.forEach($scope.cars_list, function(car) {
      if ((string !== "") && (car.toLowerCase().indexOf(string.toLowerCase()) >= 0)) {

        output.push(car);
      }
    });
    $scope.search_car = output;
  }
  $scope.choose_textbox = function(string) {
    $scope.car = string;
    $scope.hideinfo = true;
  };
  ////////////          //////////////////
  $scope.rows = [];
  $scope.total = 0;

  $scope.myfunc = function() {
    $http.get("/getPrice" + "/" + $scope.brand + "/" + $scope.style + "/" + $scope.item)
      .then(function mySuccess(response) {

        $scope.rows.push({
          brand: $scope.brand,
          style: $scope.style,
          item: $scope.item,
          price: response.data.result[0][$scope.style]
        });
        $scope.total += response.data.result[0][$scope.style];
        //  $scope.rows.push(response.data);
      }, function myError(response) {});
  };
});
