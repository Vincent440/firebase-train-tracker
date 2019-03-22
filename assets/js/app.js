/* eslint-disable no-console */
/*eslint-env browser*/
/*global $*/
//---------------------------------------------------------------------------------------------------
//Link to Live file here. https://vincent440.github.io/unit-7-firebase/
//------------------ TODO LIST to create a functioning train schedular application  -----------
// 1.) Initialize Firebase-------
// 2.) Create button-on-click event for adding new Trains-----
//      -store the form data in local variables to push to database and clear the form
//      -set train data variables locally inside click event so they empty after being submitted to the database
//-----------------------------------------------------------------------
//
// 3.) update the database with the information submitted
//
// 4.) Create a way to retrieve trains from the trains database.
//      -update the html with the data from train-form data
//      -using on child added firebase event
//
// 5.) Calculate next arrival time 
//     -Using the train start and frequency to determine next arrival time. 
//
// 6.) Create a way to Calculate minutes to next arrival.
//     - Must be in minutes to when the next train arrives
//     - utilize moment js to determine next arrival time vs current time
//
// 7.) Users from many different machines must be able to view same train times from firebase database.
//     -set up to pull firebase data on page load of current trains
//-----------------------------------  Global Variable Declarations  ----------------------------------------------
// Initialize Firebase - (1.)
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

    //Train name saved to local variable
    var tName = $("#train-name").val().trim();
    //Train destination to local variable
    var tDest = $("#destination").val().trim();
    //First Train arrival time in military time to local variable
    var tStart = moment($("#first-train").val().trim(),"hh:mm").format("HH:mm");
    //Train Frequency in minutes saved to local variable
    var tFreq = $("#frequency").val().trim();

    console.log(tName);
    console.log(tDest);
    console.log(tStart);
    console.log(tFreq);

    var newTrain = {
        trainName: tName,
        trainDest: tDest,
        firstArrival: tStart,
        trainFrequency: tFreq
    };
    console.log("submit button clicked");
    console.log(newTrain);

    database.ref().push(newTrain);

    console.log(newTrain.trainName);
    console.log(newTrain.trainDest);
    console.log(newTrain.firstArrival);
    console.log(newTrain.trainFrequency);

    alert("New train submitted to database");

    $("#train-name").val("");
    $("#destination").val("");
    $("#first-train").val("");
    $("#frequency").val("");
});

database.ref().on("child_added", function(childSnapshot) {

    console.log(childSnapshot.val());
  
    // Store everything into a variable.
    var tName = childSnapshot.val().trainName;
    var tDest = childSnapshot.val().trainDest;
    var tStart = childSnapshot.val().firstArrival;
    var tFreq = childSnapshot.val().trainFrequency;
  
    // Train Info
    console.log(tName);
    console.log(tDest);
    console.log(tStart);
    console.log(tFreq);
  
  });
  