#!/usr/bin/env node

'use strict';

const customers = require("./data/customers.json");

const _ = require('lodown-andrejacksonnola');

/**
 * 1. Import your lodown module using the require() method, 
 *    using the string 'lodown-<my-username>', or whatever 
 *    name with which you published your npm lodown project.
 * 
 * 2. Solve all problems as outlined in the README.
 */
 
 /*FIND THE NUMBER OF MALES*/
 
//all male customers

function allMaleCustomers(array, action){
 var counter = 0; 
  _.filter(customers, function(value, index, array){
    if(value.gender === 'male'){
      counter++;
    }
      
      
  });

console.log("There are " + counter + " male customers.");
  
  
}
allMaleCustomers(customers);
 
 
 /*ALL FEMALE CUSTOMERS*/
 function allFemaleCustomers(array, action){
   var counter = 0;
   _.filter(customers, function(value, index, array){
  if(value.gender === 'female') {
    
    counter++;
    
  }
  });
   console.log("There are " + counter + " female customers.");
 }
allFemaleCustomers(customers);
 
  
 
 
 /* OLDEST OF ALL CUSTOMERS */
 
  var maxAge = customers[0].age;


function oldestAge(array, action){
    array.filter(function(v, i, a){
        action(v, i, a);
    });
    
    console.log("The oldest person is " + maxAge.name + " and their age is " + maxAge.age);
}

oldestAge(customers, function(v, i, a){
    if(v.age > maxAge){
        maxAge = v;
    }
});

/* YOUNGEST OF ALL CUSTOMERS */
var minAge;
function min(array, action){
array.filter(function(v, i, a){
action(v, i, a); });
console.log('the youngest persons name is ' + minAge.name + " and their age is " + minAge.age);
}
min(customers, function(v, i, a){
    if(v.age < customers[0].age){
    minAge = v;
    }
});


//average money for each customer
var sum = [];

  _.each(customers, function(v, i, a){
    sum.push(v.balance.slice(1).replace(/,/g, '') * 1);
     });
  
var nums = sum.reduce(function(a, b) { return a + b; }, 0);

var avg = nums/sum.length;
console.log("The average balance of all customers is " + avg);


// /*FIND CUSTOMERS WITH SAME FIRST LETTER IN NAME*/

function findNames (randomLetter){
    let custNames = _.pluck(customers, "name");
    var storeNames = [];
    _.each(custNames, function(element, index, array){
       if(randomLetter.toLowerCase() === element[0].toLowerCase())
{
           storeNames.push(element);
           
       }
       
    
    });
    //console.log(custNames);
    return storeNames.length;
     
 
}
console.log("The amount of customers name that begin with 's' is " + findNames("s"));

/*FIND CUSTOMERS FRIENDS WITH MATCHING LETTER*/
function matchingFriendsLetter(array, person, letter){
  var messg;
  var count = 0;
  var wholeMssg;
  var matchingFriends;
  customers.filter(function(value, index, arr){
    if(value.name === person){
      matchingFriends = value.friends;
    }
    
    return matchingFriends;
 });
    matchingFriends.filter(function(e, i, c){
      if(e.name.charAt(0).toLowerCase() === letter.toLowerCase()){
        count++;
        messg = e.name;
        wholeMssg = person + " has " + count + " friend(s) whose name starts with the letter " + letter;
      }
      else {
          wholeMssg = person + " does not have any friends with names starting with the letter " + letter;
      }
      
      
    });
    
  return wholeMssg;
    
  }
console.log(matchingFriendsLetter(customers, 'Doris Smith', 'o'));

//FRIENDS WITH GIVEN CUSTOMER
var findCustomers = function(name, customers){
    var result = [];
  _.each(customers, function(customer){
    //console.log(customer , 'this is customer');
      _.map(customer.friends, function(friend){
        //console.log(friend, 'this is friend');
          if(name === friend.name){
            //console.log(' you found me friend', friend);
            result.push(customer.name);      
          } 
          
      });
  });
  return result;
};
console.log(findCustomers('Buckner Kennedy', customers));

//TOP THREE TAGS
function topTags(customers) {
    var allTags = [];
    var tagCount = {};
    var count = 0;
    var topCounts = [];
    _.each(customers, customer => _.each(customer.tags, tags => allTags.push(tags)));
  
    
    _.reduce(allTags, function(count, tag) {
        tagCount[tag] = (count[tag] || 0) + 1;
        return tagCount;
    });
    
    _.filter(tagCount, function(e, i) {
       if(e >= count) {
           topCounts.push(i); 
           count = e;
        }
    });
  //console.log(topCounts);
    var topThree = topCounts.slice(-3);
    return topThree;
}
console.log(topTags(customers));
  


/* OBJECT OF GENDERS */
var gendersArr = _.pluck(customers, 'gender');

function pickGenders(genderCount, gender) {
 if(gender in genderCount) ++genderCount[gender];
 else genderCount[gender] = 1;
 return genderCount;
}
console.log(_.reduce(gendersArr, pickGenders, {}));
