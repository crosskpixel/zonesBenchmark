const { default: axios } = require("axios");

setInterval(() => {
    console.log(`/api/app`)
    axios.get("http://127.0.0.1:3000/api/app");
}, 10000);