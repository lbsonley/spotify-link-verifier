const qs = require("node:querystring");
const { fetchSong } = require("../source/fetch-song");

exports.handler = async (event) => {
  const regex = /(track\/|track:)([\dA-Za-z]+)/;

  const { songLink } = JSON.parse(event.body);

  const regexGroups = regex.exec(songLink);
  const songId = regexGroups !== null && regexGroups[2];

  const songData = await fetchSong(songId);

  const hasPreview = songData["preview_url"];

  return {
    statusCode: 200,
    body: hasPreview
      ? JSON.stringify({
          markup:
            '<div class="result good"><p>Song has Preview Link.<br/>Go ahead and paste it in <a class="spreadsheet-link" target="_blank" href="https://docs.google.com/spreadsheets/d/1uiJ7bnRox800tn4xfm8NU8pq8SrMETKDmXPixItAGWI/edit#gid=423708201">the spreadsheet</a>.<br/></p></div>',
        })
      : JSON.stringify({
          markup:
            '<div class="result bad"><p>Song does not have preview link...<br/>please select a new one</p></div>',
        }),
  };
};
