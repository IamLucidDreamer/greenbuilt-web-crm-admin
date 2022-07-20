const { default: Axios } = require("axios");
const axios = Axios.create({
  baseURL: "http://65.1.92.60:8002/api"
});

export default axios;
