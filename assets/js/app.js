/*eslint-env browser*/
/*global $*/
//---------------------------------------------------------------------------------------------------
//Link to Live file here. https://vincent440.github.io/unit-7-firebase/
//------------------ TODO LIST to create a functioning train schedular application  -----------

//Need to fix input to ensure only valid times are inputted
//need to add AM / PM to the table once displayed


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
    event.preventDefault();//prevent page refresh on click event from the form submission

    //Train name saved to local variable
    var newTrainName = $("#train-name").val().trim();
    //Train destination to local variable
    var tDest = $("#destination").val().trim();

    //First Train arrival time in military time to local variable
    var tFirstTrain = moment($("#first-train").val().trim(),"hh:mm").format("HH:mm");

    //Train Frequency in minutes saved to local variable
    var tFreq = $("#frequency").val().trim();

    var firstTimeConverted = moment(tFirstTrain, "HH:mm").subtract(1, "years");
    //console.log(firstTimeConverted);

    // Difference between the times
    var diffTime = moment().diff(moment(firstTimeConverted), "minutes");
    //console.log("DIFFERENCE IN TIME: " + diffTime);    

    // Time apart (remainder)
    var tRemainder = diffTime % tFreq;
    //console.log(tRemainder);

    // Minute Until Train
    var tMinsTillTrain = tFreq - tRemainder;
    //console.log("MINUTES TILL TRAIN: " + tMinsTillTrain);

    // Next Train
    var nextTrain = moment().add(tMinsTillTrain, "minutes");
   
    //console.log("ARRIVAL TIME: " + moment(nextTrain).format("hh:mm"));
    var nextTrainArrives = moment(nextTrain).format("hh:mm");

    //Create a train object for each new train added to the database
    var newTrain = {
      trainName: newTrainName,//Stored Train Name
      trainDest: tDest,// location
      nextArrival: nextTrainArrives,//next time train will arrive
      trainFrequency: tFreq,// frequency of train arrival in minutes
      minutesAway: tMinsTillTrain// minutes remaining until next train arrives
    };
    
    //Push new Train object into the database
    database.ref().push(newTrain);

    //Clear form of text inputted
    $("#train-name").val("");
    $("#destination").val("");
    $("#first-train").val("");
    $("#frequency").val("");

});

database.ref().on("child_added", function(childSnapshot) {

  //console.log(childSnapshot.val());
  
  // Store everything into a variable.
  var trainName = childSnapshot.val().trainName;
  var destination = childSnapshot.val().trainDest;
  var nextTrain = childSnapshot.val().nextArrival;
  var frequency = childSnapshot.val().trainFrequency;
  var minutesTill = childSnapshot.val().minutesAway;
    
  // Create the new row
  var newRow = $("<tr>").append(
    $("<td>").text(trainName),
    $("<td>").text(destination),
    $("<td>").text(frequency),
    $("<td>").text(nextTrain),
    $("<td>").text(minutesTill)
  );

  // Append the new row to the table
  $("#train-time-table > tbody").append(newRow);

});