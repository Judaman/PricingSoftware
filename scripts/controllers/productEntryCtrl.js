app.controller('productEntryCtrl', function($scope, $http, productEntryService) {

  $scope.quoteNameInput = productEntryService.name;
  $scope.quoteBrandInput = productEntryService.brand;
  $scope.quoteStyleInput = productEntryService.style;


  $http.get("/getItems" + "/" + $scope.quoteBrandInput + "/" + $scope.quoteStyleInput)
    .then(function mySuccess(response) {

      var allItems = [];
      response.data.result.forEach(function func(items, index) {
        allItems.push(items.item)
      });
      $scope.styleItems = allItems;
    }, function myError(response) {});

  ////////////*START*  get and display price   //////////////////
  $scope.rows = [];
  $scope.total = 0;
  $scope.inputs = {};
  $scope.inputs.quantity = 1;
  $scope.myfunc = function() {
    $http.get("/getPrice" + "/" + $scope.quoteBrandInput + "/" + $scope.quoteStyleInput + "/" + $scope.inputs.item)
      .then(function mySuccess(response) {
        $scope.rows.push({
          brand: $scope.quoteBrandInput,
          style: $scope.quoteStyleInput,
          item: $scope.inputs.item,
          unitPrice: response.data.result[0][$scope.quoteStyleInput],
          price: response.data.result[0][$scope.quoteStyleInput] * $scope.inputs.quantity,
          quantity: $scope.inputs.quantity,
        });
        $scope.total += response.data.result[0][$scope.quoteStyleInput] * $scope.inputs.quantity;
        $scope.inputs.quantity = 1;
      }, function myError(response) {});
  };


  //////////// *END*  get and display price   //////////////////
  //////////// *start *  save quote   //////////////////

  $scope.saveQuote = function() {
    var data = {
      quoteNumber: 0,
      brand: $scope.quoteBrandInput,
      style: $scope.quoteStyleInput,
      rows: $scope.rows
    };
    $http.post('/saveQuote',data).
    success(function(data, status, headers, config) {
      // this callback will be called asynchronously
      // when the response is available
      console.log(data);
    }).
    error(function(data, status, headers, config) {
      // called asynchronously if an error occurs
      // or server returns response with an error status.
    });

  }

  //////////// *END *  save quote   //////////////////

  $scope.moveUp = function(index) {
    $scope.rows.splice(index - 1, 0, $scope.rows[index]);
    $scope.rows.splice(index + 1, 1);
  }

  $scope.moveDown = function(index) {
    $scope.rows.splice(index + 2, 0, $scope.rows[index]);
    $scope.rows.splice(index, 1);
  }

  $scope.delete = function(index) {
    $scope.total -= $scope.rows[index].price;
    $scope.rows.splice(index, 1);
  }

  $scope.updatePrice = function(index, inputQty) {
    $scope.total -= $scope.rows[index].price;
    $scope.rows[index].quantity = inputQty;
    $scope.rows[index].price = $scope.rows[index].unitPrice * $scope.rows[index].quantity,
      $scope.total += $scope.rows[index].price;
  };

  //// autocomplete script //////////
  $scope.autoComplete = function(string) {
    $scope.hideinfo = false;
    var output = [];
    angular.forEach($scope.styleItems, function(styleItem) {
      if ((string !== "") && (styleItem.toLowerCase().indexOf(string.toLowerCase()) >= 0)) {

        output.push(styleItem);
      }
    });
    $scope.autoCompleteItems = output;
  }
  $scope.choose_textbox = function(string) {
    $scope.inputs.item = string;
    $scope.hideinfo = true;
  };



});

var tableToExcel = function tableToExcel(table, name, filename) {
  let uri = 'data:application/vnd.ms-excel;base64,',
    template = '<html xmlns:o="urn:schemas-microsoft-com:office:office" xmlns:x="urn:schemas-microsoft-com:office:excel" xmlns="http://www.w3.org/TR/REC-html40"><title></title><head><!--[if gte mso 9]><xml><x:ExcelWorkbook><x:ExcelWorksheets><x:ExcelWorksheet><x:Name>{worksheet}</x:Name><x:WorksheetOptions><x:DisplayGridlines/></x:WorksheetOptions></x:ExcelWorksheet></x:ExcelWorksheets></x:ExcelWorkbook></xml><![endif]--><meta http-equiv="content-type" content="text/plain; charset=UTF-8"/></head><body><table>{table}</table></body></html>',
    base64 = function(s) {
      return window.btoa(decodeURIComponent(encodeURIComponent(s)))
    },
    format = function(s, c) {
      return s.replace(/{(\w+)}/g, function(m, p) {
        return c[p];
      })
    }

  if (!table.nodeType) table = document.getElementById(table)
  var ctx = {
    worksheet: name || 'Worksheet',
    table: table.innerHTML
  }

  var link = document.createElement('a');
  link.download = filename;
  link.href = uri + base64(format(template, ctx));
  link.click();
};
