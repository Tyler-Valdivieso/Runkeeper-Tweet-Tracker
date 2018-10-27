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
    
    //all event handling for 'What people are saying'
    $('#textFilter').keyup(function() {
        written_num = 0;
        $('#tweetTable .wRow').each(function(){
            $(this).remove(); //delete old rows after every new search
        });
        $('#searchText').text($('#textFilter').val());
        for (var item = 0, len = written_tweets.length, text = ""; item < len; item++){
            if (written_tweets[item].writtenText.toLowerCase().includes($('#textFilter').val().toLowerCase()) && $('#textFilter').val() != '' ) { //if tweet contains the search string then add it to the table as a row
                written_num += 1;
                $('#tweetTable').append('<tr class = wRow><td>'+written_num+'</td><td>'+written_tweets[item].source+'</td><td>'+written_tweets[item].writtenText+' '+'<a href = '+(written_tweets[item].text.slice(written_tweets[item].text.indexOf('https:'))).split(' ')[0]+'>'+(written_tweets[item].text.slice(written_tweets[item].text.indexOf('https:'))).split(' ')[0]+'</a></td></tr>'); 
            }
        } $('#searchCount').text(written_num); //display number of results
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