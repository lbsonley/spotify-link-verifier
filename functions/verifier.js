const {fetchSong} = require('../source/fetch-song');

exports.handler = async (event) => {
  const songId = event.queryStringParameters.songId
  console.log(songId);
  const songData = await fetchSong(songId)

  const hasPreview = songData['preview_url'] !== null;

  console.log(songData['preview_url']);
  return {
    statusCode: 200,
    body: hasPreview 
      ? '<div style="height: 100vh; width: 100vw; background-color: green"><h1 style="position: absolute; top: 50%; left: 50%; transform: translate(-50%, -50%);">Song has Preview Link<h1></div>'
      : '<div style="height: 100vh; width: 100vw; background-color: red"><h1 style="position: absolute; max-width: 60vw; top: 50%; left: 50%; transform: translate(-50%, -50%); text-align: center;">Song does not have preview link...<br/>please select a new one<h1></div>',
  };
};