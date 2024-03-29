const { default: Axios } = require("axios");
const axios = Axios.create({
  baseURL: "http://43.204.97.58:8002/api"
});

export default axios;
