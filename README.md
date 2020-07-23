# Download the lyrics for all the songs in an album

This script uses Spotify API (with the following wrapper: [node-spotify-api](https://www.npmjs.com/package/node-spotify-api)), so you will need to fill out `config.json` with your app ID and app Secret.

It also uses [SolenoLyrics](https://github.com/SOLENO/solenolyrics), which is NOT explicit on where the lyrics come from. Therefore I don't know how long this script will work (days? months? years?). No guarantees. Don't use this for commercial purposes (unless you want to take the risk).

# Usage

`yarn add get-full-album-lyrics`

```js
const albumLyrics = require("get-full-album-lyrics");
albumLyrics("rick astley Whenever You Need Somebody")
  .then(console.log) // do stuff
  .catch(console.error); // do stuff on error
```

# Please be aware

If the album contains stuff like the following:

> artist: 'Madonna',
> title: 'Material Girl - **Extended Dance Remix**'

the lyrics won't be found easily. In fact, they will probably NOT be found at all, or wrong lyrics will be displayed. My recommendation: sanitize your results (maybe split song titles by - or simply remove them if they contain keywords such as "remix"; you might get lucky and find the lyrics despite it all, but in my experience it's very rare)

**The following section has been stolen from [this guide](https://github.com/ceckenrode/node-spotify-api/blob/master/README.md)**

# Don't have a Spotify client id and client secret?

The Spotify API requires an authentication token to work. This package will perform all of the work of generating an authentication token for you, but you will still need to supply a client id and client secret.

Sign up for a Spotify developer account [here](https://developer.spotify.com/my-applications/#!/login). If you already have a Spotify account, you'll just have to log in. A membership can be paid or free, it makes no difference when it comes to using the Spotify API.

Once you're signed up, navigate to <https://developer.spotify.com/my-applications/>. You should be presented with the following page:

![Applications](Images/1-Applications.png)

Click the button to "Create An App". Once you're at the next page, fill in the required fields.

![Required](Images/2-Required.png)

Submit the form and on the next page, you should be presented with a client id and secret.

![Key](Images/3-Key.png)

And you're all set!! 🎉
