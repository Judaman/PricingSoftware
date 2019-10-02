angular.module('myApp', []).
controller('myCtrl', function($scope, $http) {
  //    $scope.brand =  ;
  $scope.rows = [];
  $scope.total = 0;
  //    $scope.item = ;
  $scope.func = function() {
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
