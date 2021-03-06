require('dotenv').config();
const path = require("path")
const express = require("express");
const logger = require("morgan");
const mongoose = require("mongoose");
const routes = require("./routes/index.js");

const db = require("./models/index.js");

const app = express();
const PORT = process.env.PORT || 27017;

app.use(logger("dev"));

app.use(express.urlencoded({extended: true}));
app.use(express.json());
app.use(express.static(path.join(__dirname, '/public')));

console.log(process.env.MONGODB_URI)
//Is it required in server and seeds file ?
mongoose.connect(
  process.env.MONGODB_URI || 'mongodb://localhost/workout',
  {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useCreateIndex: true,
    useFindAndModify: false
  }
);

app.use(routes);

app.listen(PORT, () => {
  console.log(`App running on port ${PORT}!`);
});