const { default: axios } = require("axios");

setInterval(() => {
    console.log(`/api/app`)
    try{
        axios.get("http://127.0.0.1:3000/api/app");
    } catch(err) {
        console.log(err);
    }
    
}, 5000);