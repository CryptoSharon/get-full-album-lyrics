const Spotify = require("node-spotify-api");
const secrets = require('./config.json')
const spotify = new Spotify(secrets);
const solenolyrics = require("solenolyrics");

const getAlbumTracklist = (query) =>
	spotify
	.search({
		type: "album",
		query,
	})
	.then(async (res) => {
		const resList = ((res || {}).albums || {}).items || [];
		if (resList.length) {
			const albums = resList.filter((res) => res.album_type === "album");
			if (albums.length) {
				const url = albums[0].href;
				const album = await spotify.request(url);
				const artist = album.artists[0].name;
				const tracks = album.tracks.items.map((track) => ({
					artist,
					song: track.name,
				}));
				return tracks;
			} else {
				throw new Error("no album-type result");
			}
		} else {
			throw new Error("nothing found");
		}
	});

const findLyricList = (tracklist) =>
	tracklist.map(item => solenolyrics.requestLyricsFor(item.artist + " " + item.song));

const getAlbumLyrics = (query) =>
	getAlbumTracklist(query)
	.then(tracklist => ({
		tracklist,
		promises: findLyricList(tracklist)
	}))

const processAlbumLyrics = query =>
	getAlbumLyrics(query)
	.then(async res => {
		const lyricObjs = await Promise.allSettled(res.promises)
		return lyricObjs.reduce((arr, lyricObj, index) => {
			const trackObj = {
				trackNo: index + 1,
				artist: res.tracklist[index].artist,
				title: res.tracklist[index].song,
				lyrics: lyricObj.value ? lyricObj.value : undefined
			}
			return arr.concat(trackObj)
		}, [])
	})
	.catch(console.error);

module.exports = processAlbumLyrics