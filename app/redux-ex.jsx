var redux = require('redux');

console.log('Starting redux');
//Pure function. Redux only works with pure function
//same input - same output
//cannot use a global/external variable/ or change the value of a parameter passed in
//cannot have callbacks or promises
// Like the following - Pure function
function add(a,b) {
  return a + b;
}

//Not Pure
var a =3;
function add(b) {
  return a + b;
}
//Not Pure
var result;
function add(a,b) {
  result =  a + b;
  return result;
}
//Not Pure since result changes
function add(a,b){
  return a + b + new Date().getSeconds();
}

//Pure since obj is not changed
function changeProp(obj){
  return{
    ...obj,
    name: 'Jen'
  };
  //BUT the following will change the obj. So not pure
  //obj.name = 'Jen';
  //return obj;
}

var startingValue = {
  name: 'Andrew', age:20
};
var res = changeProp(startingValue);
console.log(startingValue);
console.log(res);
