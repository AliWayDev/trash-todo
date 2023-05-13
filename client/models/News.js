const { Schema, model } = require("mongoose");

const News = new Schema({
    title: String,
    isDone: Boolean,
    imageId: String,
    description: String
});

module.exports = model("News", News);