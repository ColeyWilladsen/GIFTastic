// Initial array of topics
var topics = ["Golf", "Guitars", "Hiking", "Beer"];

// Function for displaying buttons
function renderButtons() {

  // Deleting the buttons prior to adding new buttons
  // (this is necessary otherwise we will have repeat buttons)
  $("#buttons-view").empty();

  // Looping through the array of topics
  for (var i = 0; i < topics.length; i++) {

    // Then dynamicaly generating buttons for each topic in the array.
    var a = $("<button>");
    // Adding a class
    a.attr("id", "topic");
    // Adding a data-attribute with a value of the topic at index i
    a.attr("data-name", topics[i]);
    // Providing the button's text with a value of the topic at index i
    a.text(topics[i]);
    // Adding the button to the HTML
    $("#buttons-view").append(a);
  }
}

$(document).ready(function () {
  // This function handles events where one button is clicked
  $("#add-gif").on("click", function (event) {
    // event.preventDefault() prevents the form from trying to submit itself.
    // We're using a form so that the user can hit enter instead of clicking the button if they want
    event.preventDefault();

    // This line will grab the text from the input box
    var topic = $("#gif-input").val().trim();
    // The topic from the textbox is then added to our array
    topics.push(topic);

    // calling renderButtons which handles the processing of our topic array
    renderButtons();
  });

  $(document).on('click', '#topic', function () {

    var person = $(this).attr("data-name");
    var queryURL = "https://api.giphy.com/v1/gifs/search?q=" +
      person + "&api_key=dc6zaTOxFJmzC&limit=10";

    $.ajax({
      url: queryURL,
      method: "GET"
    })
      .then(function (response) {
        var results = response.data;
        console.log(results)

        var gifDiv = $("<div class='item'>");
        var gifRow = $("<div class='row'>");

        for (var i = 0; i < results.length; i++) {



          var rating = results[i].rating;

          var p = $("<p>").text("Rating: " + rating);

          var topicImage = $("<img>");
          topicImage.attr("src", results[i].images.fixed_height_still.url);
          topicImage.attr("data-still", results[i].images.fixed_height_still.url);
          topicImage.attr("data-animate", results[i].images.fixed_height.url);
          topicImage.attr("data-state", "still");
          topicImage.attr("class", "gif");

          var gifColumn = $("<div class='column'>");
          gifColumn.append(p);
          gifColumn.append(topicImage);
          gifRow.append(gifColumn)

          $("#gifs-appear-here").prepend(gifDiv);
        }


        gifDiv.append(gifRow);
      });

  });

  $(document).on('click', '.gif', function () {
    // The attr jQuery method allows us to get or set the value of any attribute on our HTML element
    var state = $(this).attr("data-state");
    // If the clicked image's state is still, update its src attribute to what its data-animate value is.
    // Then, set the image's data-state to animate
    // Else set src to the data-still value
    if (state === "still") {
      $(this).attr("src", $(this).attr("data-animate"));
      $(this).attr("data-state", "animate");
    } else {
      $(this).attr("src", $(this).attr("data-still"));
      $(this).attr("data-state", "still");
    }
  });
  // Calling the renderButtons function at least once to display the initial list of topics
  renderButtons();
});



