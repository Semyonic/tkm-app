const mongoose = require("mongoose");

const TrafficEventsSchema = new mongoose.Schema({
    title: String,
    body: String,
    location: {
        latitude: Number,
        longitude: Number
    },
    date: Date,
    hash: String
});

module.exports = mongoose.model("traffic-events", TrafficEventsSchema);
