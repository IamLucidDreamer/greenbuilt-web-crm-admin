const { default: Axios } = require("axios");
const axios = Axios.create({
  baseURL: "https://greenbuilt.aamdhane.com/api"
});

export default axios;
