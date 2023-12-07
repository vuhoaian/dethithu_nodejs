const express = require("express");
const mongoose = require("mongoose");
const app = express();
app.use(express.json());
const PORT = 8000;
async function connect() {
  try {
    await mongoose.connect("mongodb://127.0.0.1:27017/thithu1");
    console.log("Connect successfully!!!");
  } catch (error) {
    console.log("Connect failure!!!");
  }
}
const routes = require("./routes");
routes(app);
connect();
app.listen(PORT, () =>
  console.log(`App listening at http://localhost:${PORT}`)
);
