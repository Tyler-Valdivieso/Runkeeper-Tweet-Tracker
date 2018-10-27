$(document).ready(function() {
	//Function-scope boolean to alter as the button switches state
	var liveTweets = false;
    
    $('#liveButton').click(function() {
        if ($('#liveButton').text() == "Switch to live tweets") { //once the button is pressed, fetch the live tweets and switch the button
            fetch('http://localhost:7890/1.1/search/tweets.json?q=%23RunKeeper&lang=en&count=100&result_type=recent').then(function(response) {
                var live_tweets = response.json();
                console.log(live_tweets);
});;
            $('#liveButton').text("Switch to saved tweets"); //change the button back
        } else if ($('#liveButton').text() == "Switch to saved tweets") {
            $('#liveButton').text("Switch to live tweets");
        }
    });
    
    
	//TODO: use jQuery to listen for a click event,
	//toggle the button text between "Switch to live tweets" and "Switch to saved tweets", 
	//and load the corresponding tweets
});

