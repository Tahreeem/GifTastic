var topics = ["Ben 10", "Teen Titans", "The Powerpuff Girls", "Ed, Edd n Eddy", "Courage the Cowardly Dog", "Samurai Jack",
    "Dexter's Laboratory"];

for (i = 0; i < topics.length; i++) {
    $(".Buttons").append($("<button>").addClass("btn btn-secondary").text(topics[i]));
}


var APIkey = "eqwLj7AtqSOjo5RLgHKUfHxByvlptLuw";

var attachEvent = $(".btn.btn-secondary").on("click", attachListener);


$(".AddTopic").on("click", function (event) {
    var newTopic = $("#topic-input").val().trim();
    topics.push(newTopic);
    $(".Buttons").append($("<button>").addClass("btn btn-secondary").text(newTopic).on("click", attachListener));
});

$(".Reset").on("click", function (event) {
    $(".Results").remove();
});



function attachListener(theEvent) {
    var topic = this.textContent;

    var queryURL = "http://api.giphy.com/v1/gifs/search?q=" + topic + "&api_key=" + APIkey + "&limit=10";

    $.ajax({
        url: queryURL,
        method: "GET"
    }).then(function (response) {

        for (n = 0; n < response.data.length; n++) {

            var newURL = response.data[n].images.preview_gif.url;

            var gifBox = $("<img>").attr("src", newURL).attr("data-state", "animate").attr("data-animate", newURL);
            var title = $("<p>").text(response.data[n].title);
            var rating = $("<p>").text(response.data[n].rating);
            var trending_datetime = $("<p>").text(response.data[n].trending_datetime);
            $("#container").append($("<div>").addClass("row justify-content-center Results")
                .append(title).append(rating).append(trending_datetime).append(gifBox));

            //console.log(response);

        }
    });


}


