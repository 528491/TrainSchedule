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
    $("#addTrain").on("click", function(event){
        event.preventDefault();

        trainName = $("#trainNameInput").val().trim();
        destination = $("#trainDestinationInput").val().trim();
        firstTrainTime = $("#trainTimeInput").val().trim();
        frequency = $("#trainFrequencyInput").val().trim();
        
        //Calculate minutesAway based on inputed time

        firebase.database().ref().push({
            trainName: trainName,
            destination: destination,
            frequency: frequency,
            firstTrainTime: firstTrainTime
        }, function(errorObject) {
            console.log("Errors handled: " + errorObject.code);
          });

        //Clear existing values in the input fields
        $("#trainNameInput").val("");
        $("#trainDestinationInput").val("");
        $("#trainTimeInput").val("");
        $("#trainFrequencyInput").val("");
    });


    //Listen for additional trains and their accompanying schedules being added
    firebase.database().ref().on("child_added", function(snapshot){
        //Change the table for when a train is added.
        console.log(snapshot.val());

        var newRow = $("<tr>");

        var trainNameCell = $("<td>");
        trainNameCell.text(snapshot.val().trainName);
        newRow.append(trainNameCell);

        var destinationCell = $("<td>");
        destinationCell.text(snapshot.val().destination);
        newRow.append(destinationCell);

        //var firstTrainTimeCell = $("<td>");
        //firstTrainTimeCell.text(snapshot.val().firstTrainTime);
        //newRow.append(firstTrainTimeCell);

        var frequencyCell = $("<td>");
        frequencyCell.text(snapshot.val().frequency);
        newRow.append(frequencyCell);

        $("#trainSchedules").append(newRow);
    });


});