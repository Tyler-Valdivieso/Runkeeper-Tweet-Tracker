function parseTweets(runkeeper_tweets) {
	//Do not proceed if no tweets loaded
	if(runkeeper_tweets === undefined) {
		window.alert('No tweets returned');
		return;
	}
	
	tweet_array = runkeeper_tweets.map(function(tweet) {
		return new Tweet(tweet.text, tweet.created_at);
	});
    
    
    //creating an object which stores an activity as a key and its frequency in the tweet array as a value
    var dict = {};
    for (var item = 0, len = tweet_array.length, text = ""; item < len; item++){
        if (!(tweet_array[item].activityType in dict)){
            dict[tweet_array[item].activityType] = 1;
        } else {
            dict[tweet_array[item].activityType] += 1;
        }
    }
    
    //objects can't be sorted so I convert my object into an array and sort it here
    var sorted_activites = Object.keys(dict).map(function(key) {
        return [key, dict[key]];
    });
    sorted_activites.sort(function(first, second) {
        return second[1] - first[1];
    });
    
    
    //couldn't get my original dict to work with vega-lite so I create one that is better structured (an array of dicts) for vega-lite use here
    var count_dict = [];
    for (var item = 0, len = sorted_activites.length, text = ""; item < len; item++){
        count_dict.push({Activity: sorted_activites[item][0], Count: sorted_activites[item][1]});
    }
    
    var top3_dist = [];
    
    for (var item = 0, len = tweet_array.length, text = ""; item < len; item++){
        if (["run", "walk", "bike"].indexOf(tweet_array[item].activityType) >= 0) {
            top3_dist.push({Activity: tweet_array[item].activityType, Distance: parseFloat(tweet_array[item].distance), 
                          Day: tweet_array[item].time.toString().split(' ')[0]})
        }
    } 
    
   
    $('#numberActivities').text(sorted_activites.length);
    $('#firstMost').text(sorted_activites[0][0]);
    $('#secondMost').text(sorted_activites[1][0]);
    $('#thirdMost').text(sorted_activites[2][0]);
    


	activity_vis_spec = {
	  "$schema": "https://vega.github.io/schema/vega-lite/v2.6.0.json",
	  "description": "A graph of the number of Tweets containing each type of activity.",
	  "data": {
	    "values": count_dict
	  },
	   "mark": "bar",
        "encoding": {
            "x": {"field": "Activity", "type": "ordinal", "sort": {"field": "Count"}},
            "y": {"field": "Count", "type": "quantitative"},
        }
	};
    
	vegaEmbed('#activityVis', activity_vis_spec, {actions:false});
    
    all_top3_vis_spec = {
	  "$schema": "https://vega.github.io/schema/vega-lite/v2.6.0.json",
	  "description": "A plot of the distances by day of the week for all of the three most tweeted-about activities.",
	  "data": {
	    "values": top3_dist
	  },
	   "mark": "point",
        "encoding": {
            "x": {"field": "Day", "type": "ordinal", "sort": ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"]},
            "y": {"field": "Distance", "type": "quantitative"},
            "color": {"field": "Activity", "type": "nominal"},
        }
	};
    
    vegaEmbed('#distanceVis', all_top3_vis_spec, {actions:false});

    
    means_top3_vis_spec = {
	  "$schema": "https://vega.github.io/schema/vega-lite/v2.6.0.json",
	  "description": "A plot of the distances by day of the week for all of the three most tweeted-about activities.",
	  "data": {
	    "values": top3_dist
	  },
	   "mark": "point",
        "encoding": {
            "x": {"field": "Day", "type": "ordinal", "sort": ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"]},
            "y": {"aggregate": "mean", "field": "Distance", "type": "quantitative"},
            "color": {"field": "Activity", "type": "nominal"},
        }
	};
    
    vegaEmbed('#distanceVisAggregated', means_top3_vis_spec, {actions:false});

	$('#longestActivityType').text('bike');
    $('#shortestActivityType').text('walk');
    $('#weekdayOrWeekendLonger').text('the weekends (Saturday and Sunday)');
    
    $(document).ready(function() {
        $('#distanceVisAggregated').hide();
    });
    
        
    $('#aggregate').click(function() {
        if ($('#aggregate').text() == 'Show means'){
            $('#distanceVis').hide();
            $('#distanceVisAggregated').show();
            $('#aggregate').text('Show all activities');
        } else if ($('#aggregate').text() == 'Show all activities'){
            $('#distanceVisAggregated').hide();
            $('#distanceVis').show();
            $('#aggregate').text('Show means');
        }
    });
    
}


//Wait for the DOM to load
$(document).ready(function() {
	loadSavedRunkeeperTweets().then(parseTweets);
});