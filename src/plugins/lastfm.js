import axios from "axios";

const BASE_URL = "https://ws.audioscrobbler.com/2.0/";
const API_KEY = "c2797e2442ddb38a50280e1e697fa316";

const lastfm = {
  chart: {
    async getTopArtists(page, limit) {
      let result = null;
      page = (page >= 1 ? page : 1) || 1;
      limit = (limit >= 15 ? limit : 15) || 15;

      await axios
        .get(
          `${BASE_URL}?method=chart.gettopartists&api_key=${API_KEY}&page=${page}&limit=${limit}&format=json`
        )
        .then(function(response) {
          result = response.data.artists.artist;
        })
        .catch(function (error) {
          console.log(error.response);
        });

      return result;
    },
    async getTopTracks(page, limit) {
      let result = null;
      page = (page >= 1 ? page : 1) || 1;
      limit = (limit >= 15 ? limit : 15) || 15;

      await axios.get(
        `${BASE_URL}?method=chart.gettoptracks&api_key=${API_KEY}&page=${page}&limit=${limit}&format=json`
        )
        .then(function(response) {
          result = response.data.tracks.track;
        })
        .catch(function (error) {
          console.log(error.response);
        });

        return result;
    },
  },
  artist: {
    async getInfo(name) {
      let result = null;

      await axios
        .get(
          `${BASE_URL}?method=artist.getinfo&api_key=${API_KEY}&artist=${name}&format=json`
        )
        .then(function (response) {
          result = response.data.artist;
          console.log(result);
        })
        .catch(function (error) {
          console.log(error.response)
        });

      return result;
    },
    async getTopAlbums(name, page, limit) {
      let result = null;
      page = (page >= 1 ? page : 1) || 1;
      limit = (limit >= 15 ? limit : 15) || 15;
      
      await axios
        .get(
          `${BASE_URL}?method=artist.gettopalbums&api_key=${API_KEY}&artist=${name}&page=${page}&limit=${limit}&format=json`
        )
        .then(function (response) {
          result = response.data.topalbums.album;
          console.log(result);
        })
        .catch(function (error) {
          console.log(error.response);
        });

      return result;
    },
    getTopTracks(artist) {
      axios.get(
        `${BASE_URL}?method=artist.gettoptracks&api_key=${API_KEY}&artist=${artist}&format=json`
      );
    },
  },
  album: {
    getInfo(artist, album) {
      axios.get(
        `${BASE_URL}?method=album.getinfo&api_key=${API_KEY}&artist=${artist}&album=${album}&format=json`
      );
    },
  },
};

export default {
  install(Vue) {
    Object.defineProperty(Vue.prototype, "$lastfm", { value: lastfm });
  }
};