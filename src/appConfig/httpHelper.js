const { default: Axios } = require("axios");
const axios = Axios.create({
  baseURL: "http://65.2.129.68:8002/api",
});

export default axios;
