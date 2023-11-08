const express = require("express");
const mongoose = require("mongoose");
//mongoose.set('strictQuery', false);
const cors = require("cors");
const { auth } = require("./utils/auth");
const cookieParser = require("cookie-parser");
require("dotenv").config();

const { router } = require("../src/routes/index");
const MongoURI =
  "mongodb+srv://ebadajr:XpSO6KrL08tpJ02f@pharmacyacl.yvpafqw.mongodb.net/?retryWrites=true&w=majority";
//App variables
const app = express();
const port = process.env.PORT || "8000";

const PharmacistRequestsController = require("./controllers/PharmacistRequestsController");
const userController = require("./controllers/userController");

mongoose
  .connect(MongoURI)
  .then(() => {
    console.log("MongoDB is now connected!");
  })
  .catch((err) => console.log(err));

app.get("/home", (req, res) => {
  console.log("You have everything installed!");
  res.status(200).send("You have everything installed!");
});

// #Routing to userController here
app.use(cors());
app.use(express.json());

app.use("/login", userController.login);

app.use(cookieParser());
app.use(auth);

app.use("/", router);

app.listen(port, () => {
  console.log(`Listening to requests on http://localhost:${port}`);
});

app.post("/requestPharmacist", PharmacistRequestsController.pharmacistReq);
app.get("/users", userController.getUsers);
app.get("/getPharmReq", PharmacistRequestsController.getPharmacistReq);
