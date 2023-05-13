const express = require("express");
const mongoose = require("mongoose");
const router = require("./routers/index");
const fileUpload = require("express-fileupload");
const path = require('path')
const cors = require('cors')

const PORT = process.env.PORT || 5000;

const app = express();

app.use(cors())
app.use(express.json());
app.use(fileUpload({}))
app.use(express.static(__dirname + '/public'));

app.use(router);

const server = async () => {
  try {
    await mongoose.connect(
      "mongodb+srv://xmxm:xmxm@cluster0.kn2mgzt.mongodb.net/?retryWrites=true&w=majority"
    );
    app.listen(PORT, () => console.log("Server started" + PORT));
  } catch (e) {
    console.log(e);
  }
};

server();
