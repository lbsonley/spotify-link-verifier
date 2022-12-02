/**
 * This is an example of a basic node.js script that performs
 * the Client Credentials oAuth2 flow to authenticate against
 * the Spotify Accounts.
 *
 * For more information, read
 * https://developer.spotify.com/web-api/authorization-guide/#client_credentials_flow
 */

import fetch from "node-fetch";

const fetchSong = async (songId) => {
  const client_id = process.env.CLIENT_ID; // Your client id
  const client_secret = process.env.CLIENT_SECRET; // Your secret

  // your application requests authorization
  const authOptions = {
    url: "https://accounts.spotify.com/api/token",
    headers: {
      Authorization:
        "Basic " +
        Buffer.from(client_id + ":" + client_secret).toString("base64"),
    },
    form: {
      grant_type: "client_credentials",
    },
    json: true,
  };

  const parameters = new URLSearchParams();
  parameters.append("grant_type", "client_credentials");

  // get token
  const tokenResponse = await fetch(authOptions.url, {
    method: "POST",
    body: parameters,
    headers: authOptions.headers,
  });
  const data = await tokenResponse.json();
  const token = data["access_token"];

  const songResponse = await fetch(
    `https://api.spotify.com/v1/tracks/${songId}`,
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
  );

  const songData = await songResponse.json();

  return songData;
};

export default fetchSong;
