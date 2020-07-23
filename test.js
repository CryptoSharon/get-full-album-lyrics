const getLyrics = require('./index')
getLyrics('rick astley Whenever You Need Somebody')
	.then(console.log)
	.catch(console.error)