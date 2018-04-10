// Initialize Firebase
var config = {
    apiKey: "AIzaSyAeHBKQarrrBJtsTeE43EhgWVFQut9wtK0",
    authDomain: "trainschedule-eac12.firebaseapp.com",
    databaseURL: "https://trainschedule-eac12.firebaseio.com",
    projectId: "trainschedule-eac12",
    storageBucket: "",
    messagingSenderId: "937485885457"
  };
  firebase.initializeApp(config);

$(document).ready(function(){
    //Create the variables that will hold the information submitted from each form.
    var trainName = "";
    var destination = "";
    var frequency = 0;
    var firstTrainTime = "";
    var minutesAway = 0;

    //Create a click listener for the addTrain button that will update the necessary variables
    //in accordance with the user input.
    $("#addTrain").on("click", function(){
        trainName = $("#trainNameInput").val().trim();
        destination = $("#trainDestinationInput").val().trim();
        frequency = $("#trainTimeInput").val().trim();
        firstTrainTime = $("#trainFrequencyInput").val().trim();

        firebase.database().ref().set({
            trainName: trainName,
            destination: destination,
            frequency: frequency,
            firstTrainTime: firstTrainTime
        });
    });



});