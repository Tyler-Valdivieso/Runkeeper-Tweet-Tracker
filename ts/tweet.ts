class Tweet {
	private text:string;
	time:Date;

	constructor(tweet_text:string, tweet_time:string) {
        this.text = tweet_text;
		this.time = new Date(tweet_time);//, "ddd MMM D HH:mm:ss Z YYYY"
	}

	//returns either 'live_event', 'achievement', 'completed_event', or 'miscellaneous'
    get source():string {
        if (this.text.startsWith('Just')) {
            return 'completed_event'; 
        } else if (this.text.startsWith('Achieved')){
            return 'achievement';
        } else if (this.text.startsWith('Watch')){
            return 'live_event';
        } else {
            return 'miscellaneous';
        }
    }

    //returns a boolean, whether the text includes any content written by the person tweeting.
    get written():boolean {
        return this.text.includes(' - ');
    }

    get writtenText():string {
        if(!this.written) {
            return "";
        }
        //TODO: parse the written text from the tweet
        return "";
    }

    get activityType():string {
        if (this.source != 'completed_event') {
            return "unknown";
        } else if (!isNaN(parseFloat(this.text.slice([this.text.indexOf(' a ')+3],-1)))){
            return this.text.split(' ')[5];
        } else {
            return this.text.split(' ')[3];
        }
    }

    get distance():number {
        if(this.source != 'completed_event') {
            return 0;
        } else if (!isNaN(parseFloat(this.text.slice([this.text.indexOf(' a ')+3],-1)))){
            return parseFloat(this.text.slice([this.text.indexOf(' a ')+3],-1));
        } else {
            return 0;
        }
    }

    getHTMLTableRow(rowNumber:number):string {
        //TODO: return a table row which summarizes the tweet with a clickable link to the RunKeeper activity
        return "<tr></tr>";
    }
}