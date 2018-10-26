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
    
    var written_num = 0;
    
    $('#textFilter').change(function() {
        written_num = 0;
        $('#tweetTable .wRow').each(function(){
            $(this).remove(); //WHY ISNT IT DELETING THE ROWS!?!?!
        });
        $('#searchText').text($('#textFilter').val());
        for (var item = 0, len = written_tweets.length, text = ""; item < len; item++){
            if (written_tweets[item].writtenText.toLowerCase().includes($('#textFilter').val().toLowerCase()) && $('#textFilter').val() != '' ) {
                written_num += 1;
                $('#tweetTable').append('<tr class = wRow>');
                $('#tweetTable').append('<td>'+written_num+'</td>');
                $('#tweetTable').append('<td>'+written_tweets[item].source+'</td>');
                $('#tweetTable').append('<td class = written>'+written_tweets[item].writtenText+'</td></tr>');
                //$('#tweetTable tbody').append('<tr class="child"><td>blahblah</td></tr>');
            }
        } $('#searchCount').text(written_num);
    });
    
    
	//TODO: Filter to just the written tweets
}

function addEventHandlerForSearch() {
	//TODO: Search the written tweets as text is entered into the search box, and add them to the table
}
                             

//Wait for the DOM to load
$(document).ready(function() {
	addEventHandlerForSearch();
	loadSavedRunkeeperTweets().then(parseTweets);
});