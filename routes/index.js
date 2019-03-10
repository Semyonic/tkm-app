const express = require("express");
//const db = require("../lib/rethinkDB");
const router = express.Router();
const https = require("https");
const crypto = require("crypto");
const dist = require("../lib/distance");
const myLoc = [41.095824, 28.806391];

function sortByPosition(a, b) {
    if (a.x === b.x) return a.y - b.y;
    return a.x - b.x;
}

/* GET home page. */
router.get("/", function (req, res, next) {
    let data = [];
    let distances = [];
    https.get(process.env.DATA_URL, function (response) {
        response.setEncoding("utf8");
        let body = "";
        response.on("data", function (data) {
            body += data;
        });
        response.on("end", function () {
            try {
                body = JSON.parse(body);
                JSON.parse(body).features.forEach(item => {
                    distances.push(dist.calculateDistance(myLoc[0], myLoc[1], item.geometry.y, item.geometry.x));
                    data.push({
                        event: item.attributes.OLAY,
                        event_title: item.attributes.BASLIK,
                        date: item.attributes.ZAMAN,
                        location: {
                            lat: item.geometry.y,
                            lon: item.geometry.x
                        }
                    });
                    data["hash"] = crypto.createHash("md5").update(body).digest("hex");
                });
                res.send(body);
                res.send(distances.sort((a, b) => {
                    return a - b;
                }));
            } catch (error) {
                console.log(error);
            }
        });
    });
});
module.exports = router;
