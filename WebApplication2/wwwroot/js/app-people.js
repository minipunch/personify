app.controller('peopleCtrl', function ($scope) {
     $scope.name = "";
     $scope.date = "";
     $scope.people = JSON.parse(localStorage.people);
     $scope.nameError = false;
     $scope.dateError = false;

     $scope.addPerson = function () {
          // if input both fields are not empty
          if ($scope.name && $scope.date) {
               var date = new Date($scope.date);
               // create the person object
               var person = {
                    name: $scope.name,
                    createdAt: {
                         day: date.getDate(),
                         month: date.getMonth(),
                         year: date.getFullYear(),
                         mili: date.getTime()
                    }
               };

               // add to people array
               $scope.people.push(person);

               // sort the array
               $scope.people.sort(function (a, b) {
                    return a.createdAt.mili - b.createdAt.mili;
               });

               // clear the form fields and reset error variables
               $scope.name = "";
               $scope.date = "";
               $scope.nameError = false;
               $scope.dateError = false;

               // check for compatability
               if (typeof (Storage) !== "undefined") {
                    // Store into local storage
                    localStorage.people = JSON.stringify($scope.people);
               } else {
                    // Sorry! No Web Storage support..
                    alert("error: local storage is not working!");
               }
          } else {
               // both fields empty
               if (!$scope.name && !$scope.date) {
                    $scope.nameError = setNameError();
                    $scope.dateError = setDateError();
                    // name field empty
               } else if (!$scope.name) {
                    $scope.nameError = setNameError();
                    // date field empty
               } else {
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
               if ($scope.name) {
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

function setNameError() {
     $("input[name='name']").attr('data-toggle', 'tooltip');
     $("input[name='name']").attr('data-placement', 'right');
     $("input[name='name']").attr('title', 'Please enter a valid name!');
     $("input[name='name']").tooltip('enable');
     return true;
};

function setDateError() {
     $("input[name='date']").attr('data-toggle', 'tooltip');
     $("input[name='date']").attr('data-placement', 'right');
     $("input[name='date']").attr('title', 'Please enter a valid date!');
     $("input[name='date']").tooltip('enable');
     return true;
};

function deleteFromArray(name,date,array) {
     var index = 0;
     // find person with matching properties
     for (var x = 0; x < array.length; x++) {
          console.log(array[x].name);
          if (array[x].name === name && array.date === date) {
               index = x; // set index of person to delete
          }
     }
     // delete the person at that index fom people array
     if (index > -1) {
          array.splice(index, 1);
     }
     
     return array;
};