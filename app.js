const createError = require("http-errors");
const express = require("express");
const path = require("path");
const logger = require("morgan");
const request = require("request");
const MongoDB = require("./Database").initPool();
const redisPool = require("redis-pooling")({
    maxPoolSize: Number(process.env.REDIS_POOL_SIZE),
    credentials: {
        host: process.env.REDIS_HOST,
        port: Number(process.env.REDIS_PORT),
        db: Number(process.env.REDIS_DB)
    }
});

const indexRouter = require("./routes/index");
const mapRouter = require("./routes/distance");

const app = express();

app.use(logger("dev"));
app.use(express.json());
app.use(express.urlencoded({
    extended: true
}));

app.use("/public", express.static(path.join(__dirname, "public")));

app.use("/", indexRouter);
app.use("/distance", mapRouter);

/**
 * String hasher function
 *
 * @param {string} str String to hash
 * @return {string} asd
 */
function hash(str) {
    let hash = 5381,
        i = str.length;

    while (i) {
        hash = (hash * 33) ^ str.charCodeAt(--i);
    }
    return hash >>> 0;
}

MongoDB.getInstance((connection) => {
    setInterval(() => {
        request(process.env.RATINGS_URL, {
            json: true
        }, (err, resp, body) => {
            if (err) console.log(err);

            /**
             * Decrypt data here
             */
            let trafficIndex = TKMDecrypt.Decrypt0(body, process.env.RATINGS_KEY);
            console.info(trafficIndex);
            try {
                connection.db("istanbul-traffic-data").collection("traffic-indexes").insertOne({
                    trafficIndex: respData,
                    ts: Date.now()
                }, ((err) => {
                    if (err) console.log(err);
                }));
            } catch (error) {
                console.log(error);
            }
        });

        (function getNearAccidents() {
            const myLoc = [process.env.MY_COORDINATE_LAT, process.env.MY_COORDINATE_LON];
            let eventData = [];
            let distances = [];
            let results = [];

            request(process.env.APP_EVENT_URL, {
                json: true
            }, (err, resp, body) => {
                if (err) console.log(err);
                for (const item of body.features) {
                    distances.push({
                        lat: item.geometry.y,
                        lon: item.geometry.x
                    });
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
                let filterAcc = eventData.filter(text => {
                    if (text.body.match(/kaza/)) {
                        redisPool.hget(hash(JSON.stringify(text.title)), "hashValue").then((data) => {
                            if (data === null) {
                                redisPool.hmset([hash(JSON.stringify(text.title)), "hashValue", hash(JSON.stringify(text)), "textValue", JSON.stringify(text)],
                                    function (err) {
                                        if (err) console.log(err);
                                        connection.db("istanbul-traffic-data").collection("traffic-accidents").insertOne({
                                            trafficIndex: trafficIndex,
                                            eventTitle: text.title,
                                            eventBody: text.body,
                                            timeStamp: Date.now()
                                        }, ((err, result) => {
                                            if (err) console.log(err);
                                        }));
                                    });
                            }
                        }).catch((err) => {
                            console.log(err);
                        });
                    }
                });
            });
        }());
    }, Number(process.env.REQUEST_POLLING_INTERVAL));
});

// catch 404 and forward to error handler
app.use(function (req, res, next) {
    next(createError(404));
});

// error handler
app.use(function (err, req, res) {
    res.locals.message = err.message;
    res.locals.error = req.app.get("env") === "development" ? err : {};

    res.status(err.status || 500);
    res.render("error");
});

module.exports = app;