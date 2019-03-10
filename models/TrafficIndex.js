const mongoose = require("mongoose");

const TrafficIndexSchema = new mongoose.Schema({
    traffic_index: Number,
    date: Date,
    hash: String
});

module.exports = mongoose.model("traffic-indexes", TrafficIndexSchema);
