# Train Schedule

Using the form at the bottom of the page, users of this app can input trains
and their key attributes (arrival time, frequency, name) into a Firebase-backed
database that allows for viewing via multiple different machines.

# Key Code Blocks

## Firebase "child_added" Listener for Database Update

One of the most important elements for firebase functionality is the ability to listen for changes to the
database in real time. In the code shown below, we listen for added nodes (representing trains) so that all open
windows of the app have the latest version of the table.

```javascript
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
```