const MongoClient = require("mongodb").MongoClient;

const option = {
    auto_reconnect: true,
    poolSize: 5,
    ssl: false,
    connectTimeoutMS: 1000,
    socketTimeoutMS: 1000,
    keepAlive: 3600000
};

let pool_db;

function MongoPool() {
}

function initPool(callback) {
    MongoClient.connect(process.env.MONGO_CONNECTION, option, (err, db) => {
        if (err) throw err;
        console.log("Connected asd");
        pool_db = db;
        if (callback && typeof (callback) == "function")
            callback(pool_db);
    });
    return MongoPool;
}

MongoPool.initPool = initPool;

function getInstance(callback) {
    if (!pool_db) {
        initPool(callback);
    } else {
        if (callback && typeof (callback) == "function")
            callback(pool_db);
    }
}

MongoPool.getInstance = getInstance;


module.exports = MongoPool;