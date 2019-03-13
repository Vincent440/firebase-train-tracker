/*eslint-env browser*/
/*global $*/
//---------------------------------------------------------------------------------------------------
//Link to Live file here. https://vincent440.github.io/unit-7-firebase/

//------------------ TODO LIST to create a functioning train schedular application  -----------
//
// 1. Initialize Firebase
//
// 2. Create button-on-click event for adding new Trains - then  + 
//    - Train name
//    - Destination
//    - first train time
//    - frequency
//
// 3. update the html with the data from train-form
//
// 4. update the database with the information submitted
//
// 5. Create a way to retrieve trains from the trains database.
//
// 6. Calculate next arrival time 
//     -Using the train start and frequency to determine next arrival time. 
//
// 7. Create a way to Calculate minutes to next arrival.
//     - Must be in minutes to when the next train arrives
//     - utilize moment js to determine next arrival time vs current time
//
// 8. Users from many different machines must be able to view same train times from firebase database.
//                  -set up to pull firebase data on page load of current trains
//
//----------------------------------------------------------------------------------------------------
console.log("js working");

// Initialize Firebase
var config = {
    apiKey: "AIzaSyB6EK9wBiEo6i7KeX9AvziCK6pJjU1SPnk",
    authDomain: "vince-train-scheduler.firebaseapp.com",
    databaseURL: "https://vince-train-scheduler.firebaseio.com",
    projectId: "vince-train-scheduler",
    storageBucket: "vince-train-scheduler.appspot.com",
    messagingSenderId: "245005340748"
};

firebase.initializeApp(config);

var database = firebase.database();

$("#add-train-btn").on("click", function(event) {
    
    event.preventDefault();

    console.log("submit button clicked");

});