# About
This API is not official, use it at your own risk.

# NoName
To initialize the client, you need the Token and Token Refresh.
Use Fiddler Classic to retrieve the token.

To start the client:
```js 
const OmegaStrikers = require("omega-strikers");

const client = new OmegaStrikers({
  token: token,
  refresh: token_refresh
});

/*
Players - Number of Players to be displayed in the result;
Region: Global, Asia, NA, SA, EU, OCE;
*/
await client.leaderboard("10", "sa");

/*
Playername | Region;
Will return player information if they are in the top 10,000;
*/
await client.ranked("Aesop", "na");

/*
Playername;
Returns the player's level information;
*/
await client.level("Aesop");

/*
playerName;
Returns user's mastery information;
*/
await client.mastery("Aesop");
```

If you want to help with the project, feel free to contribute.
A big kiss to Aesop <3