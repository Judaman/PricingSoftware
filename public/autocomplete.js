angular.module("myApp", []).controller("myCtrl", function($scope) {
  $scope.cars_list = [
    "Acura", "Alfa Romeo", "Aston Martin", "Audi", "Bentley", "BMW", "Bugatti", "Buick", "Cadillac", "Chevrolet", "Chrysler", "Citroen", "Dodge", "Ferrari", "Fiat", "Ford", "Geely", "General Motors", "GMC", "Honda", "Hyundai", "Infiniti",
    "Jaguar", "Jeep", "Kia", "Koenigsegg", "Lamborghini", "Land Rover", "Lexus", "Maserati", "Mazda", "McLaren", "Mercedes-Benz", "Mini", "Mitsubishi", "Nissan", "Pagani", "Peugeot", "Porsche", "Ram", "Renault", "Rolls Royce", "Suzuki",
    "Tata Motors", "Tesla", "Toyota", "Volkswagen", "Volvo"
  ];
  $scope.autocomp = function(string) {
    $scope.hideinfo = false;
    var output = [];
    angular.forEach($scope.cars_list, function(car) {
      if (car.toLowerCase().indexOf(string.toLowerCase()) >= 0) {
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
