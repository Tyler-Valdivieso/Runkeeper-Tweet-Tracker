function parseTweets(runkeeper_tweets) {
	//Do not proceed if no tweets loaded
	if(runkeeper_tweets === undefined) {
		window.alert('No tweets returned');
		return;
	}

    tweet_array = runkeeper_tweets.map(function(tweet) {
		return new Tweet(tweet.text, tweet.created_at);
	});
    
    var written_tweets = [];
    
    for (var item = 0, len = tweet_array.length, text = ""; item < len; item++){
        if (tweet_array[item].written == true){
            written_tweets.push(tweet_array[item]);
        }
    }
    
	//TODO: Filter to just the written tweets
}

function addEventHandlerForSearch() {
	//TODO: Search the written tweets as text is entered into the search box, and add them to the table
//    $('#textFilter').onchange(function(event)) {
//        $('#searchCount').text('plshelp');
//    }
}
                             

//Wait for the DOM to load
$(document).ready(function() {
	addEventHandlerForSearch();
	loadSavedRunkeeperTweets().then(parseTweets);
});