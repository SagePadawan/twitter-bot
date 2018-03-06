//app.js

var Twitter = require('twitter');
var config = require('./config.js');

var T = new Twitter(config);

//Setting up search parameters
var params = {
    q: '#MUFC',
    count: 10,
    result_type: 'recent',
    language: 'en'
}

//get request 
T.get('search/tweets', params, function(err, data, response) {
    if (!err) {
        //loop through array of returned tweets to favorite individually
        for(let i = 0; i < data.statuses.length; i++) {
            //get the twee Id from the returned data
            let id = { id: data.statuses[i].id_str }
            //Favorite the selected post
            T.post('favorites/create', id, function(err, response) {
                if (err) {
                    console.log(err[0].message);
                } else {
                    let username = response.user.screen_name;
                    let tweetId = response.id_str;
                    console.log('Favorited: ', `https://twitter.com/${username}/status/${tweetId}`)
                }
            });
        }
    } else {
        console.log(err);
    }
});