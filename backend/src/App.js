const express = require("express");
const mongoose = require("mongoose");
//mongoose.set('strictQuery', false);
const cors = require("cors");

const cookieParser = require("cookie-parser");
require("dotenv").config();
const { auth, reg} = require("./utils/auth");

const { router } = require("../src/routes/index");
const MongoURI =
"mongodb+srv://55Es3af_Pharmacy:H2Wk2njprBuDdho2@55es3afpharmacy.ustsrxb.mongodb.net/";
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
app.use(
  cors({
    origin: 'http://localhost:3000', // Replace with the actual origin of your React app
    credentials: true,
  })
);

app.use(express.json());

app.use("/login", userController.login);
app.post("/requestPharmacist", PharmacistRequestsController.pharmacistReq);
app.use(cookieParser());
app.use(auth);
app.use("/", router);

app.listen(port, () => {
  console.log(`Listening to requests on http://localhost:${port}`);
});


app.get("/users", userController.getUsers);
app.get("/getPharmReq" , PharmacistRequestsController.getPharmacistReq);
