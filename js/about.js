function parseTweets(runkeeper_tweets) {
	//Do not proceed if no tweets loaded
	if(runkeeper_tweets === undefined) {
		window.alert('No tweets returned');
		return;
	}
    

	tweet_array = runkeeper_tweets.map(function(tweet) {
		return new Tweet(tweet.text, tweet.created_at);
	});
    
    var completed = 0;
    var achieved = 0;
    var live = 0;
    var misc = 0;
    var written_comp = 0;
    
    //loop through the tweet array and keep count of each event type's frequency
    for (var item = 0, len = tweet_array.length, text = ""; item < len; item++){
        if (tweet_array[item].written == true && tweet_array[item].source == 'completed_event'){
            written_comp += 1;
            completed += 1;
        } else if (tweet_array[item].source == 'completed_event'){
            completed += 1;
        } else if (tweet_array[item].source == 'achievement'){
            achieved += 1;
        } else if (tweet_array[item].source == 'live_event'){
            live += 1;
        } else if (tweet_array[item].source == 'miscellaneous'){
            misc += 1;
        }
    }
	
    //displaying the information gathered
	$('#numberTweets').text(tweet_array.length);
    $('.completedEvents').text(completed);
    $('.completedEventsPct').text(math.format(completed/tweet_array.length*100,  {notation: 'fixed', precision: 2}) + '%');
    $('.achievements').text(achieved);
    $('.achievementsPct').text(math.format(achieved/tweet_array.length*100,  {notation: 'fixed', precision: 2}) + '%');
    $('.liveEvents').text(live);
    $('.liveEventsPct').text(math.format(live/tweet_array.length*100,  {notation: 'fixed', precision: 2}) + '%');
    $('.miscellaneous').text(misc);
    $('.miscellaneousPct').text(math.format(misc/tweet_array.length*100,  {notation: 'fixed', precision: 2}) + '%');
    $('.written').text(written_comp);
    $('.writtenPct').text(math.format(written_comp/completed*100,  {notation: 'fixed', precision: 2}) + '%');
	$('#firstDate').text(tweet_array[tweet_array.length - 1].time.toLocaleDateString('en-US', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' }));
	$('#lastDate').text(tweet_array[0].time.toLocaleDateString('en-US', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' }));
}

//Wait for the DOM to load
$(document).ready(function() {
	loadSavedRunkeeperTweets().then(parseTweets);
});