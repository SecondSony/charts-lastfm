import axios from 'axios';

const BASE_URL = "http://ws.audioscrobbler.com/2.0/";
const API_KEY = "c2797e2442ddb38a50280e1e697fa316";

const lastfm = {
  
};

export default {
  install(Vue) {
    Object.defineProperty(Vue.prototype, "$lastfm", { value: lastfm });
  }
};