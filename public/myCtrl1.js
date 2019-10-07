var app = angular.module('myApp', []);

app.controller('myCtrl1', function($scope, $http) {
  $scope.setBrand = function(brand) {
    $scope.inputs.brand = brand;
    console.log(brand);
  };




  $scope.setStyle = function(style) {
    $scope.inputs.style = style;

    $http.get("/getItems" + "/" + $scope.inputs.brand + "/" + style)
      .then(function mySuccess(response) {

        var allItems = [];
        response.data.result.forEach(function func(items, index) {
          allItems.push(items.item)
        });
        $scope.styleItems = allItems;
      }, function myError(response) {});

    $scope.hideinfo = false;
    var output = [];
    angular.forEach($scope.styleItems, function(item) {
      if ((style !== "") && (car.toLowerCase().indexOf(style.toLowerCase()) >= 0)) {

        output.push(car);
      }
    });
    $scope.search_car = output;
  }
  $scope.choose_textbox = function(string) {
    $scope.car = string;
    $scope.hideinfo = true;
  };







};

$scope.updatePrice = function(index, inputQty) {
  $scope.rows[index].quantity = inputQty;
  $scope.rows[index].price = $scope.rows[index].unitPrice * $scope.rows[index].quantity,
    console.log($scope.rows[index]);

};


$scope.brands = ["TSG", "CUBITAC", "CNC"]; $scope.styles = ["AW", "AP", "AK"];

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
$scope.rows = []; $scope.total = 0;

$scope.inputs = {};

$scope.myfunc = function() {
  $http.get("/getPrice" + "/" + $scope.inputs.brand + "/" + $scope.inputs.style + "/" + $scope.inputs.item)
    .then(function mySuccess(response) {

      $scope.rows.push({
        brand: $scope.inputs.brand,
        style: $scope.inputs.style,
        item: $scope.inputs.item,
        unitPrice: response.data.result[0][$scope.inputs.style],
        price: response.data.result[0][$scope.inputs.style] * $scope.inputs.quantity,
        quantity: $scope.inputs.quantity,
      });
      $scope.total += response.data.result[0][$scope.inputs.style];
      //  $scope.rows.push(response.data);
    }, function myError(response) {});
};
});
