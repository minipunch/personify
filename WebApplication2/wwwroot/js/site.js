// set bootstrap tooltip
function setNameError() {
     $("input[name='name']").attr('data-toggle', 'tooltip');
     $("input[name='name']").attr('data-placement', 'right');
     $("input[name='name']").attr('title', 'Please enter a valid name!');
     $("input[name='name']").tooltip('enable');
     return true;
};

// set bootstrap tooltip
function setDateError() {
     $("input[name='date']").attr('data-toggle', 'tooltip');
     $("input[name='date']").attr('data-placement', 'right');
     $("input[name='date']").attr('title', 'Please enter a valid date!');
     $("input[name='date']").tooltip('enable');
     return true;
};

function deleteFromArray(name, date, array) {
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

// match name input with regex
function isValidName(name) {
     // alphabetical letters with optional period followed by an optional dash with more characters (only one dash)
     var regex = "[a-zA-Z.]+(-[a-zA-Z]+)?$";
     if (name.match(regex)) {
          return true;
     } else {
          return false;
     }
};