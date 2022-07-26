const functions = require('@google-cloud/functions-framework');
const axios = require('axios');

functions.http('helloHttp', async (req, res) => {

    let pss = [];
    let reqs = [];

    req.body.forEach(req => {
        var startTime = Date.now();
        let ps = axios({
            method: "get",
            url: req.url,
            timeout: 5000
        }).then(() => {
            let ms = Date.now() - startTime;
            reqs.push({
                id: req.id,
                ms
            });
        }).catch((err) => {
            console.log(err);
            reqs.push({
                id: req.id,
            });
        })
        pss.push(ps);
    })

    await Promise.all(pss);

    let data = reqs.reduce((prev,cur) => {

        prev += cur.id;

        if(cur.ms) {
            prev += `,${cur.ms}`;
        }

        return prev + "|";
        
    }, "|");

     res.status(200).send(data);

});
