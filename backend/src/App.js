const express = require("express");
const bodyParser = require('body-parser');
const mongoose = require("mongoose");
//mongoose.set('strictQuery', false);
const cors = require("cors");

const cookieParser = require("cookie-parser");
require("dotenv").config();
const { auth, reg} = require("./utils/auth");

const { router } = require("../src/routes/index");
const MongoURI =
"mongodb+srv://55Es3af:SVH8v8XKZSxU1J6p@cluster0.zqasadb.mongodb.net/Clinic?retryWrites=true&w=majority";
//App variables
const app = express();

const port = process.env.PORT || "7000";
const multer = require('multer');
const upload =multer();
const http = require("http");
const { Server } = require("socket.io");

const PharmacistRequestsController = require("./controllers/PharmacistRequestsController");
const userController = require("./controllers/userController");
const patientController = require("./controllers/patientController");
const RegisterPatientController= require("./controllers/RegisterPatientController");
const medicineController = require('./controllers/medicineController');
const pharmacistController= require("./controllers/pharmacistController");
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
    origin: ['http://localhost:4000', 'http://localhost:3000'], // Replace with the actual origin of your React app
    credentials: true,
  })
);



app.use(express.json());
app.use(bodyParser.json());
app.use(cookieParser());
app.use(express.urlencoded({ extended: true }));

app.use("/login", userController.login);
app.post("/requestPharmacist", PharmacistRequestsController.pharmacistReq);
app.post("/patient/createSession",patientController.checkoutSession)
app.post('/forgetPassword', userController.forgetPassword)
app.put('/resetPassword/:id', userController.resetPassword)
app.post("/patient/registerPatient", RegisterPatientController.registerPatient)
app.put("/user/accept",userController.acceptPharmacist);
app.delete("/user/reject",userController.rejectPharmacist)



medicineController.medicineOutOfStock()



//app.use(auth);
app.use("/", router);


const server = app.listen(port, () => {
  console.log(`Listening to requests on http://localhost:${port}`);
});

const socketIO = new Server(server, {
  cors: {
    origin: "http://localhost:4000"
}
});


socketIO.on("connection", (socket) => {
  console.log(`User Connected:  ${socket.id}`);


  socket.on("join", async (senderId, receiverId) => {
    // Join a room with a unique identifier for the conversation
    const room = `${senderId}-${receiverId}`;
    console.log(room)
    await socket.join(room);
    console.log(`User ${senderId} joined the chat with ${receiverId}`);
  });
  

  socket.on("send_message", data => {
    console.log(data.senderId, data.receiverId, data.inputMessage, data.room , "in backend");
    console.log(data.room, "in send")
    // Emit the message to the specific room
    socket.to(data.room).emit("receive_message", { senderId: data.senderId, receiverId: data.receiverId, message: data.inputMessage });
  });
});


app.get("/users", userController.getUsers);
app.get("/getPharmReq" , PharmacistRequestsController.getPharmacistReq);
