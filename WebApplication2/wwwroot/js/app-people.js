app.controller('peopleCtrl', function ($scope) {
     $scope.name = "";
     $scope.date = "";
     $scope.people = JSON.parse(localStorage.people);
     $scope.nameError = false;
     $scope.dateError = false;

     $scope.addPerson = function () {
          console.log(isValidName($scope.name));
          // if input both fields are not empty
          if ($scope.name && $scope.date && isValidName($scope.name)) {
               var date = new Date($scope.date);
               // create the person object
               var person = {
                    name: $scope.name,
                    createdAt: {
                         day: date.getDate(),
                         month: date.getMonth(),
                         year: date.getFullYear(),
                         mili: date.getTime() // miliseconds since epoch for date entered (for sorting)
                    }
               };

               // add to people array
               $scope.people.push(person);

               // sort the array by miliseconds since epoch
               $scope.people.sort(function (a, b) {
                    return a.createdAt.mili - b.createdAt.mili;
               });

               // clear the form fields and reset error variables
               $scope.name = "";
               $scope.date = "";
               $scope.nameError = false;
               $scope.dateError = false;

               // check for local storage compatability
               if (typeof (Storage) !== "undefined") {
                    // Store into local storage
                    localStorage.people = JSON.stringify($scope.people);
               } else {
                    // Sorry! No Web Storage support..
                    alert("error: local storage is not working!");
               }
          } else {
               // if name doesn't match regex
               if (!isValidName($scope.name)) {
                    $scope.nameError = setNameError();
               }
               // both fields empty
               if (!$scope.name && !$scope.date) {
                    $scope.nameError = setNameError();
                    $scope.dateError = setDateError();
                    // name field empty
               } else if (!$scope.name) {
                    $scope.nameError = setNameError();
                    // date field empty
               } else if(!$scope.date){
                    $scope.dateError = setDateError();
               }
          }
     };

     $scope.deletePerson = function (name, date) {
          $scope.people = deleteFromArray(name,date,$scope.people);
          // update local storage json object string
          localStorage.people = JSON.stringify($scope.people);
     };

     // handle name field error style
     $scope.nameErrorState = function () {
          if ($scope.nameError) {
               if ($scope.name && isValidName($scope.name)) {
                    $scope.nameError = false;
                    $("input[name='name']").tooltip('disable');
                    return { 'border-color': '#cccccc' };
               }
          }

          if ($scope.nameError)
               return { 'border-color': 'red' };
     };

     // handle date field error style
     $scope.dateErrorState = function () {
          if ($scope.dateError) {
               if ($scope.date) {
                    $scope.dateError = false;
                    $("input[name='date']").tooltip('disable');
                    return { 'border-color': '#cccccc' };
               }
          }

          if ($scope.dateError)
               return { 'border-color': 'red' };
     };
});