const express = require("express");
const router = express.Router({});
const request = require("request");
const DistanceCalculator = require("../lib/distance");
const crypto = require("crypto");

const Events = require("../models/Event");

router.get("/", function (req, res, next) {
    (function getNearAccidents() {
        const myLoc = [41.095824, 28.806391];
        let eventData = [];
        let distances = [];
        let results = [];

        request(process.env.APP_EVENT_URL, {json: true}, (err, resp, body) => {
            for (const item of body.features) {
                distances.push({lat: item.geometry.y, lon: item.geometry.x});
                eventData.push({
                    title: item.attributes.BASLIK,
                    body: item.attributes.OLAY,
                    location: {
                        latitude: item.geometry.y,
                        longitude: item.geometry.x
                    },
                    date: item.attributes.ZAMAN
                });
            }

            for (const item in distances) {
                results.push(
                    DistanceCalculator.calculateDistance(
                        myLoc[0],
                        myLoc[1],
                        distances[item].lat,
                        distances[item].lon
                    )
                );
            }
            Events.create(eventData);
            let filterAcc = eventData.filter(text => {
                return text.body.match(/kaza/);
            });
            filterAcc[filterAcc.length - 1]["hash"] = crypto
                .createHash("md5")
                .update(JSON.stringify(filterAcc))
                .digest("hex");
            Events.findOne({}, {}, {sort: {date: -1}}, (err, lastData) => {
                if (lastData.hash !== filterAcc[filterAcc.length - 1]["hash"]) {
                    Events.create(filterAcc).then(recordInfo => {
                        console.log(recordInfo);
                    });
                }
            });
            res.send(filterAcc);
        });
    })();
});

module.exports = router;
