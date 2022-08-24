const Discord = require('discord.js');
const client = new Discord.Client({ intents: ["GUILDS", "GUILD_MESSAGES", "DIRECT_MESSAGE_REACTIONS"] });
require('dotenv').config()

function sleep(delay) {
  var start = new Date().getTime();
  while (new Date().getTime() < start + delay);
}

var SpotifyWebApi = require('spotify-web-api-node');
var spotifyApi = new SpotifyWebApi({
  clientId: process.env.clientId,
  clientSecret: process.env.clientSecret
});

client.on('error', (err) => {
  console.log(err.message)
});

client.once('ready', () => {
  console.log('Spotify bot online');

  setInterval(() => {
    client.user.setActivity(`Monitoring for links`);
  }, 2000);
});


client.on('messageCreate', message => {

  if (message.author.bot) return;

  let words = message.content.toString().split(" ")
  let wordIndex = -1;
  let isLink = false;

  for (let i = 0; i < words.length; i++) {
    try {
      let parts = words[i].split(":")

      const command = parts[0]


      if (command === 'https') { wordIndex = i; isLink = true }
    }
    catch (e) { console.log(e) }
  }

  if (!isLink) return;

  let parts = words[wordIndex].toString().split(":")
  const command = parts[0]


  if (command === 'https') {
    try {
      spotifyApi.clientCredentialsGrant().then(function (data) {
        // Set the access token on the API object so that it's used in all future requests
        spotifyApi.setAccessToken(data.body['access_token']);

        let releaseYears = [];

        PlaylistId = parts[1].toString().split('playlist/')[1]

        if (PlaylistId === undefined) return;

        spotifyApi.getPlaylist(PlaylistId).then(data => {
          let songs = data.body.tracks.items
          let sum = 0;

          for (let i = 0; i < songs.length; i++) {

            if (songs[i].track.album.release_date_precision === 'day' || songs[i].track.album.release_date_precision === 'month') {
              sections = songs[i].track.album.release_date.toString().split('-')
              console.log(sections[0])
              sum += parseInt(sections[0])
            }
            else if (songs[i].track.album.release_date_precision === 'year') {
              console.log(parseInt(songs[i].track.album.release_date))
              sum += parseInt(songs[i].track.album.release_date)
            }
          }
          console.log("avg: " + sum / songs.length)
          message.channel.send("The Average release date for that playlist is in " + Math.floor(sum / songs.length))
        });
      })
    } catch {
      console.log("unable to parse link: " + message.content)
    }
  }

});

client.login(process.env.TOKEN);