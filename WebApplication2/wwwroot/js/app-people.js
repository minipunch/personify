app.controller('peopleCtrl', function ($scope) {
     $scope.name = "";
     $scope.date = "";
     $scope.people = JSON.parse(localStorage.people);

     $scope.addPerson = function () {
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

          console.log(person);

          // add to people array
          $scope.people.push(person);

          // sort the array
          $scope.people.sort(function (a, b) {
               return a.createdAt.mili - b.createdAt.mili;
          });

          // clear the form fields
          $scope.name = "";
          $scope.date = "";

          if (typeof (Storage) !== "undefined") {
               // Code for localStorage/sessionStorage.
               // Store into local storage
               localStorage.people = JSON.stringify($scope.people);
          } else {
               // Sorry! No Web Storage support..
               alert("error: local storage is not working!");
          }
     };

     $scope.deletePerson = function (name, date) {
          var index = 0;
          // find person with matching properties
          for (var x = 0; x < $scope.people.length; x++) {
               console.log($scope.people[x].name);
               if ($scope.people[x].name === name && $scope.people[x].date === date) {
                    index = x; // set index of person to delete
               }
          }
          // delete the person at that index fom people array
          if (index > -1) {
               $scope.people.splice(index, 1);
          }
          // update local storage json object string
          localStorage.people = JSON.stringify($scope.people);
     };
});