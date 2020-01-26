/* eslint-disable no-undef */
/* eslint-env browser */
/* global $ */
// ---------------------------------------------------------------------------------------------------
// Link to Live file here. https://vincent440.github.io/firebase-train-tracker/
// -----------------------------------  Global Variable Declarations  ----------------------------------------------
// Initialize Firebase - (1.)
const config = {
  apiKey: 'AIzaSyB6EK9wBiEo6i7KeX9AvziCK6pJjU1SPnk',
  authDomain: 'vince-train-scheduler.firebaseapp.com',
  databaseURL: 'https://vince-train-scheduler.firebaseio.com',
  projectId: 'vince-train-scheduler',
  storageBucket: 'vince-train-scheduler.appspot.com',
  messagingSenderId: '245005340748'
}

firebase.initializeApp(config)

const database = firebase.database()

$('#add-train-btn').on('click', event => {
  // prevent page refresh on click event from the form submission
  event.preventDefault()
  // Train name saved to variable
  const newTrainName = $('#train-name').val().trim()
  // Train destination to variable
  const tDest = $('#destination').val().trim()

  // First Train arrival time in military time to variable
  const tFirstTrain = moment($('#first-train').val().trim(), 'hh:mm').format('HH:mm')

  // Train Frequency in minutes saved to variable
  const tFreq = $('#frequency').val().trim()

  const firstTimeConverted = moment(tFirstTrain, 'HH:mm').subtract(1, 'years')

  // Difference between the times
  const diffTime = moment().diff(moment(firstTimeConverted), 'minutes')

  // Time apart (remainder)
  const tRemainder = diffTime % tFreq

  // Minute Until Train
  const tMinsTillTrain = tFreq - tRemainder

  // Next Train
  const nextTrain = moment().add(tMinsTillTrain, 'minutes')

  const nextTrainArrives = moment(nextTrain).format('hh:mm')

  // Create a train object for each new train added to the database
  const newTrain = {
    trainName: newTrainName, // Stored Train Name
    trainDest: tDest, // location
    nextArrival: nextTrainArrives, // next time train will arrive
    trainFrequency: tFreq, // frequency of train arrival in minutes
    minutesAway: tMinsTillTrain// minutes remaining until next train arrives
  }

  // Push new Train object into the database
  database.ref().push(newTrain)

  // Clear form of text inputted
  $('#train-name').val('')
  $('#destination').val('')
  $('#first-train').val('')
  $('#frequency').val('')
})

database.ref().on('child_added', childSnapshot => {
  // Store everything into a variable.
  const trainName = childSnapshot.val().trainName
  const destination = childSnapshot.val().trainDest
  const nextTrain = childSnapshot.val().nextArrival
  const frequency = childSnapshot.val().trainFrequency
  const minutesTill = childSnapshot.val().minutesAway

  // Create the new row
  const newRow = $('<tr>').append(
    $('<td>').text(trainName),
    $('<td>').text(destination),
    $('<td>').text(frequency),
    $('<td>').text(nextTrain),
    $('<td>').text(minutesTill)
  )

  // Append the new row to the table
  $('#train-time-table > tbody').append(newRow)
})
