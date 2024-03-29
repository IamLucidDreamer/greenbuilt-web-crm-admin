const { default: Axios } = require("axios");
const axios = Axios.create({
  baseURL: "http://greenbuilt.aamdhane.com/api"
});

export default axios;
