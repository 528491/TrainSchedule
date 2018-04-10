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

        //Get the current time
        var currentTime = Date.now();

        //Get the minutes value from the current time
        //Assume date is today
        var userEnteredDateComponents = firstTrainTime.split(":");
        var hours = userEnteredDateComponents[0];
        var minutes = userEnteredDateComponents[1];
        console.log(hours);
        console.log(minutes);
        var today = new Date();
        var dateObjectFirstTrainTime = new Date(today.getFullYear(), today.getMonth(), today.getDate(), hours, minutes, 0);
        
        //Minutes will be the remainder (modulus) of the total minutes since the first train arrived and the frequency
        var differenceInMilliseconds = Math.abs(currentTime - dateObjectFirstTrainTime);
        var differenceInMinutes = Math.floor(differenceInMilliseconds / 1000 / 60);
        console.log(differenceInMinutes);
        var timeRemaining = frequency % differenceInMinutes;
        console.log(timeRemaining);

        //Calculate the next arrival time
        var numHourstoWait = Math.floor(timeRemaining / 60);
        var numMinutestoWait = 60 % timeRemaining;

        var firstArrivalHours = parseInt(hours);
        var firstArrivalMinutes = parseInt(minutes);

        var nextArrivalHours = firstArrivalHours + numHourstoWait;
        var nextArrivalMinutes = firstArrivalMinutes + numMinutestoWait;

        var nextArrivalTime = nextArrivalHours + ":" + nextArrivalMinutes;
        console.log(nextArrivalTime);

        firebase.database().ref().push({
            trainName: trainName,
            destination: destination,
            frequency: frequency,
            nextArrivalTime: nextArrivalTime,
            firstTrainTime: firstTrainTime,
            timeRemaining: timeRemaining
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

        var frequencyCell = $("<td>");
        frequencyCell.text(snapshot.val().frequency);
        newRow.append(frequencyCell);

        var nextArrivalTimeCell = $("<td>");
        nextArrivalTimeCell.text(snapshot.val().nextArrivalTime);
        newRow.append(nextArrivalTimeCell);

        var minutesAwayCell = $("<td>");
        minutesAwayCell.text(snapshot.val().timeRemaining);
        newRow.append(minutesAwayCell);

        $("#trainSchedules").append(newRow);
    });


});