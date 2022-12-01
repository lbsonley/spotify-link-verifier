(() => {
  var __create = Object.create;
  var __defProp = Object.defineProperty;
  var __getOwnPropDesc = Object.getOwnPropertyDescriptor;
  var __getOwnPropNames = Object.getOwnPropertyNames;
  var __getProtoOf = Object.getPrototypeOf;
  var __hasOwnProp = Object.prototype.hasOwnProperty;
  var __esm = (fn, res) => function __init() {
    return fn && (res = (0, fn[__getOwnPropNames(fn)[0]])(fn = 0)), res;
  };
  var __commonJS = (cb, mod) => function __require() {
    return mod || (0, cb[__getOwnPropNames(cb)[0]])((mod = { exports: {} }).exports, mod), mod.exports;
  };
  var __copyProps = (to, from, except, desc) => {
    if (from && typeof from === "object" || typeof from === "function") {
      for (let key of __getOwnPropNames(from))
        if (!__hasOwnProp.call(to, key) && key !== except)
          __defProp(to, key, { get: () => from[key], enumerable: !(desc = __getOwnPropDesc(from, key)) || desc.enumerable });
    }
    return to;
  };
  var __toESM = (mod, isNodeMode, target) => (target = mod != null ? __create(__getProtoOf(mod)) : {}, __copyProps(
    isNodeMode || !mod || !mod.__esModule ? __defProp(target, "default", { value: mod, enumerable: true }) : target,
    mod
  ));

  // node_modules/node-fetch/browser.js
  var require_browser = __commonJS({
    "node_modules/node-fetch/browser.js"(exports, module) {
      "use strict";
      var getGlobal = function() {
        if (typeof self !== "undefined") {
          return self;
        }
        if (typeof window !== "undefined") {
          return window;
        }
        if (typeof global !== "undefined") {
          return global;
        }
        throw new Error("unable to locate global object");
      };
      var global = getGlobal();
      module.exports = exports = global.fetch;
      if (global.fetch) {
        exports.default = global.fetch.bind(global);
      }
      exports.Headers = global.Headers;
      exports.Request = global.Request;
      exports.Response = global.Response;
    }
  });

  // source/fetch-song.js
  var import_node_fetch, fetchSong, fetch_song_default;
  var init_fetch_song = __esm({
    "source/fetch-song.js"() {
      import_node_fetch = __toESM(require_browser());
      fetchSong = async (songId) => {
        const client_id = "78e35333ba30494983159f462cde776c";
        const client_secret = "b5244d50fb9440ebae22a61903fb24e9";
        const authOptions = {
          url: "https://accounts.spotify.com/api/token",
          headers: {
            Authorization: "Basic " + Buffer.from(client_id + ":" + client_secret).toString("base64")
          },
          form: {
            grant_type: "client_credentials"
          },
          json: true
        };
        const parameters = new URLSearchParams();
        parameters.append("grant_type", "client_credentials");
        const tokenResponse = await (0, import_node_fetch.default)(authOptions.url, {
          method: "POST",
          body: parameters,
          headers: authOptions.headers
        });
        const data = await tokenResponse.json();
        const token = data["access_token"];
        const songResponse = await (0, import_node_fetch.default)(
          `https://api.spotify.com/v1/tracks/${songId}`,
          {
            headers: {
              Authorization: `Bearer ${token}`
            }
          }
        );
        const songData = await songResponse.json();
        return songData;
      };
      fetch_song_default = fetchSong;
    }
  });

  // source/functions/verifier.js
  var require_verifier = __commonJS({
    "source/functions/verifier.js"(exports) {
      init_fetch_song();
      exports.handler = async () => {
        const songData = await fetch_song_default("6LUfuyLgvgqrykiTE6sJHY");
        const hasPreview = songData["preview_url"] !== void 0;
        return {
          statusCode: 200,
          body: hasPreview ? "Good SONG" : "Bad SONG"
        };
      };
    }
  });
  require_verifier();
})();
