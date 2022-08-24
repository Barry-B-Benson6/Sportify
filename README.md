<H1>Discord bot that interactes with spotify api</H1>
<p1> 
    searches for playlist links and sends a message about the average release date for that playlist
</p1>

<h1>How to set up Bot</h1>

<h2><a href="https://discordpy.readthedocs.io/en/stable/discord.html" target="_blank">How to make a discord bot</a></h2>

<p1>Create a <code>.env</code> file in the Bot folder directory for the repo</p1>



  ```
    clientId = 'spotifyClientId'
    clientSecret = 'spotifyClientSecret'
    TOKEN="your bot token"
  ```


<p1>ensure that you have node.js installed<p1/>

<h2>Node modules </h2>
  
```
    "discord.js": "^13.3.1",
    "dotenv": "^16.0.1",
    "spotify-web-api-node": "^5.0.2"  
```
  
<p1>to run the bot use <code>node .</code></p1>

<p1>When you see <em>Spotify bot online</em> in the console the bot is up and listening for links<p1/>
