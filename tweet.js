"use strict";
class Tweet {
    constructor(tweet_text, tweet_time) {
        this.text = tweet_text;
        this.time = new Date(tweet_time); //, "ddd MMM D HH:mm:ss Z YYYY"
    }
    //returns either 'live_event', 'achievement', 'completed_event', or 'miscellaneous'
    get source() {
        if (this.text.startsWith('Just posted') || this.text.startsWith('Just completed')) {
            return 'completed_event';
        }
        else if (this.text.startsWith('Achieved')) {
            return 'achievement';
        }
        else if (this.text.startsWith('Watch')) {
            return 'live_event';
        }
        else {
            return 'miscellaneous';
        }
    }
    //returns a boolean, whether the text includes any content written by the person tweeting.
    get written() {
        return this.text.includes(' - ');
    }
    get writtenText() {
        if (!this.written) {
            return "";
        }
        else {
            return this.text.slice(this.text.indexOf(' - ') + 2, this.text.indexOf('https:'));
        }
    }
    get activityType() {
        if (this.source != 'completed_event') {
            return "unknown";
        }
        else if (!isNaN(parseFloat(this.text.slice(this.text.indexOf(' a ') + 3, -1)))) {
            return this.text.split(' ')[5];
        }
        else {
            return this.text.split(' ')[3];
        }
    }
    get distance() {
        if (this.source != 'completed_event') {
            return 0;
        }
        else if (!isNaN(parseFloat(this.text.slice(this.text.indexOf(' a ') + 3, -1))) && this.text.split(' ')[4] == 'mi') {
            return parseFloat(this.text.slice(this.text.indexOf(' a ') + 3, -1));
        }
        else if (!isNaN(parseFloat(this.text.slice(this.text.indexOf(' a ') + 3, -1))) && this.text.split(' ')[4] == 'km') {
            return math.format(parseFloat(this.text.slice(this.text.indexOf(' a ') + 3, -1)) / 1.609, { notation: 'fixed', precision: 2 });
        }
        else {
            return 0;
        }
    }
    getHTMLTableRow(rowNumber) {
        //TODO: return a table row which summarizes the tweet with a clickable link to the RunKeeper activity
        return "<tr></tr>";
    }
}
