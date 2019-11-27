app.controller('newQuoteCtrl',
  function($scope, productEntryService) {

    $scope.setSelection = function() {
      productEntryService.name = $scope.quoteNameInput;

    }
    $scope.brands = ["TSG", "CUBITAC", "CNC", "CNG"];
    $scope.styles = ["AW", "AP", "AK", "ONYX_TAFISA", "ONYX_EGGER", "PEARL_50,PEARL_80", "PEARL_110", "PEARL_50MA", "PEARL_80MA", "PEARL_110MA", "SAPPHIRE_UV", "SAPPHIRE_PET", "CORAL_1S_ACR", "CORAL_2S_ACR", "CORAL_2S_HOT"];


    $scope.setBrand = function(brand) {

      console.log(brand);
      productEntryService.brand = brand;
    };
    $scope.setStyle = function(style) {
      console.log(style);
      productEntryService.style = style;
    }
  });
