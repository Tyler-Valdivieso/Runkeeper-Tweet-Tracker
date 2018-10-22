function parseTweets(runkeeper_tweets) {
	//Do not proceed if no tweets loaded
	if(runkeeper_tweets === undefined) {
		window.alert('No tweets returned');
		return;
	}
	
	tweet_array = runkeeper_tweets.map(function(tweet) {
		return new Tweet(tweet.text, tweet.created_at);
	});
    
    var dict = {};
    
    
    for (var item = 0, len = tweet_array.length, text = ""; item < len; item++){
        if (!(tweet_array[item].activityType in Object.keys(dict))){
            dict[tweet_array[item].activityType] = 1;
        } else {
            dict[tweet_array[item].activityType] += 1;
        }
    }
    
   $('#numberActivities').text(Object.keys(dict));


	activity_vis_spec = {
	  "$schema": "https://vega.github.io/schema/vega-lite/v2.6.0.json",
	  "description": "A graph of the number of Tweets containing each type of activity.",
	  "data": {
	    "values": tweet_array
	  }
	  //TODO: Add mark and encoding
	};
    
	vegaEmbed('#activityVis', activity_vis_spec, {actions:false});

	//TODO: create the visualizations which group the three most-tweeted activities by the day of the week.
	//Use those visualizations to answer the questions about which activities tended to be longest and when.
}

//Wait for the DOM to load
$(document).ready(function() {
	loadSavedRunkeeperTweets().then(parseTweets);
});