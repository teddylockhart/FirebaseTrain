// Initialize Firebase
var config = {
  apiKey: "AIzaSyCALpRE4fSedxoyKjYs2mdUp1ZFz2WOi5A",
  authDomain: "realtime-database-bcd14.firebaseapp.com",
  databaseURL: "https://realtime-database-bcd14.firebaseio.com",
  projectId: "realtime-database-bcd14",
  storageBucket: "realtime-database-bcd14.appspot.com",
  messagingSenderId: "619923435321"
};

firebase.initializeApp(config);

var database = firebase.database();

var tFrequency = 90;

// Writes Train Table
database.ref("/cTrain").on("child_added", function(snapshot){
  var startTrain = snapshot.val().FirstTrain;

  // Moment.js train time calculations
  var firstTimeConverted = moment(startTrain, "hh:mm").subtract(1, "years");
  var currentTime = moment();
  var diffTime = moment().diff(moment(firstTimeConverted), "minutes");
  var tRemainder = diffTime % tFrequency;
  var tMinutesTillTrain = tFrequency - tRemainder;
  var nextTrain = moment().add(tMinutesTillTrain, "minutes");

  var tableString = "<tr><td>" + snapshot.val().TrainName + 
        "</td><td>" + snapshot.val().Destination +
        "</td><td>" + snapshot.val().Frequency +
        "</td><td>" + nextTrain +
        "</td><td>" + tMinutesTillTrain +
        "</td></tr>";

  $("#train-table").append(tableString);

});

// Takes User Input and Stores to Firebase
$("#submit").on("click", function() {
  event.preventDefault();

  var trainName = $("#train-name-input").val().trim();
  var destination = $("#destination-input").val().trim();
  var firstTrain = $("#first-train-input").val().trim();
  var frequency = $("#frequency-input").val().trim();

// Use Push (the object into an array) instead of Set (which overwrites).
  database.ref("/cTrain").push({
    TrainName : trainName, 
    Destination : destination, 
    FirstTrain : firstTrain, 
    Frequency : frequency
  });

  $("#train-name-input").val("");
  $("#destination-input").val("");
  $("#first-train-input").val("");
  $("#frequency-input").val("");

});
