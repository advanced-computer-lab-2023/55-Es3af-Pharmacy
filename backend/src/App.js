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
const multer = require('multer');
const upload =multer();

const PharmacistRequestsController = require("./controllers/PharmacistRequestsController");
const userController = require("./controllers/userController");
const patientController = require("./controllers/patientController");
const RegisterPatientController= require("./controllers/RegisterPatientController");
const medicineController = require('./controllers/medicineController');

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
app.use(express.urlencoded({ extended: true }));
app.use(upload.any());
app.use("/login", userController.login);
app.post("/requestPharmacist", PharmacistRequestsController.pharmacistReq);
app.post("/patient/createSession",patientController.checkoutSession)
app.post('/forgetPassword', userController.forgetPassword)
app.put('/resetPassword/:id', userController.resetPassword)
app.post("/patient/registerPatient", RegisterPatientController.registerPatient)
app.put("/user/accept",userController.acceptPharmacist);
app.delete("/user/reject",userController.rejectPharmacist)
//app.delete("/user/reject",userController.rejectPharmacist);

//app.post('/AcceptRequest/:id' , userController.acceptDoctorRequest);
//app.post('/testRoute', patientController.getPassword)

//medicineController.medicineOutOfStock()

app.use(cookieParser());

app.use(auth);
app.use("/", router);


app.listen(port, () => {
  console.log(`Listening to requests on http://localhost:${port}`);
});


app.get("/users", userController.getUsers);
app.get("/getPharmReq" , PharmacistRequestsController.getPharmacistReq);
