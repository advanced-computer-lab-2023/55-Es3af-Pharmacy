const express = require("express");
const mongoose = require("mongoose");
//mongoose.set('strictQuery', false);
require("dotenv").config();

const { router } = require("../src/routes/index");
const MongoURI =
  process.env.MONGO_URI ||
  "mongodb+srv://ebadajr:XpSO6KrL08tpJ02f@pharmacyacl.yvpafqw.mongodb.net/?retryWrites=true&w=majority";

//App variables
const app = express();
const port = process.env.PORT || "8000";

mongoose
  .connect(MongoURI)
  .then(() => {
    console.log("MongoDB is now connected!");
    // Starting server
    app.listen(port, () => {
      console.log(`Listening to requests on http://localhost:${port}`);
    });
  })
  .catch((err) => console.log(err));

app.get("/home", (req, res) => {
  console.log("You have everything installed!");
  res.status(200).send("You have everything installed!");
});

// #Routing to userController here

app.use(express.json());

app.use("/", router);
