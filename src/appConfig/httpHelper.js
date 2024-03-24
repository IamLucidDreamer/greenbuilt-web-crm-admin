const { default: Axios } = require("axios");
const axios = Axios.create({
  baseURL: "http://35.154.146.75/api"
});

export default axios;
