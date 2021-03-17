var twit = require("twit");

require("dotenv").config();

const Bot = new twit({
    consumer_key: process.env.API_KEY,
    consumer_secret: process.env.API_SECRET_KEY,
    access_token: process.env.ACCESS_TOKEN,
    access_token_secret: process.env.ACCESS_TOKEN_SECRET,
    timeout_ms: 60 * 1000,
});

function BotInit() {
    var query = {
        q: "lutero",
        result_type: "recent",
    };

    Bot.get("search/tweets", query, BotGotLatestTweet);

    function BotGotLatestTweet(error, data, response){
        if (error){
            console.log("Bot não conseguiu os últimos tweets");
        } else {
            var id = {
                id: data.statuses[0].id_str,
            };
        }
        Bot.post("statuses/retweet/:id", id, BotRetweet);

        function BotRetweet(error, response){
            if (error){
                console.log("não retweetou" + error);
            } else {
                console.log("bot retweetou" + id.id);
            }
        }
    }
}
setInterval(BotInit, 1 * 60 * 1000)
BotInit();