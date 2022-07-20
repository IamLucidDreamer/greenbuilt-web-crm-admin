const { default: Axios } = require("axios");
const axios = Axios.create({
  baseURL: "http://localhost:8002/api"
});

export default axios;
