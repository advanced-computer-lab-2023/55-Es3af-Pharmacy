const User = require("../Models/user.js");
const bcrypt = require("bcrypt");
const { createToken } = require("../utils/auth.js");
const nodemailer = require("nodemailer");
const jwt = require('jsonwebtoken')
//const pharmacistReq = require("../Models/PharmacistRequests.js")
const pharmacist = require("../Models/pharmacist.js");
const pharmacistReq = require("../Models/PharmacistRequests.js");


const addAdmin = async (req, res) => {
  try {
    const { username, password } = req.body;
    const salt = await bcrypt.genSalt();
    const hashedPassword = await bcrypt.hash(password, salt);

    const user = await User.create({
      username,
      password: hashedPassword,
    });

    const token = createToken(user.name);

    res.cookie("jwt", token, { httpOnly: true, maxAge: maxAge * 1000 });
    res.status(200).send("admin added");
  } catch (e) {
    res.status(400).send(e);
  }
};
const rejectPharmacist = async (req, res) => {
  
  try {
    const reqID = req.body.id;
   await pharmacistReq.findByIdAndDelete(reqID);
    res
      .status(200)
      .json({ status: "success", message: "Doctor request rejected" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ status: "error", message: "Internal server error" });
  }

};
const acceptPharmacist = async (req, res) => {
  try {
    const reqID = req.body.id;
    const request = await pharmacistReq.findById(reqID);

    if (!request) {
      return res.status(404).json({ message: "pharmacist request not found" });
    }
    console.log(request.amountInWallet);
    const newPharm = new pharmacist({
      username: request.username,
      password: request.password,
      name: request.name,
      email: request.email,
      dateOfBirth: request.dateOfBirth,
      hourlyRate: request.hourlyRate,
      affiliation: request.affiliation,
      educationBackground: request.educationBackground,
      speciality: request.speciality,
      amountInWallet : 100,
    });

    await newPharm.save();
    request.deleteOne();

    res
      .status(200)
      .json({ status: "success", message: "Doctor request accepted" });
  } catch (error) {
    console.error(error);
    res
      .status(500)
      .json({
        status: "error",
        message: "Internal server error",
        error: error.message,
      });
  }
};


const listUsers = async (req, res) => {
  try {
    res.send(await User.find());
  } catch (e) {
    res.status(400).send(e);
  }
};

const deleteUser = async (req, res) => {
  try {
    res.send(await User.findByIdAndDelete(req.params.id));
  } catch (e) {
    res.status(400).send(e);
  }
};

const getUsers = async (req, res) => {
  //retrieve all users from the database
  const users = await User.find({});
  //console.log(users);
  res.status(200).send(users);
};


const login = async (req, res) => {
  const { username, password } = req.body;
  
  try {
    const user = await User.findOne({ username });

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }
    const isPasswordValid = await bcrypt.compare(password, user.password);

    if (!isPasswordValid) {
      return res.status(401).json({ message: "Invalid password" });
    }

    const token = createToken(user._id);
    const maxAge = 3 * 24 * 60 * 60;

    res.cookie("jwt", token, { httpOnly: true, maxAge: maxAge * 1000 });

    res.status(200).json(user);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};






const logout = (req, res) => {
  // Clear the JWT cookie to log the user out
  res.clearCookie("jwt");

  res.status(200).json({ message: "Logged out successfully" });
};

const forgetPassword = async (req, res) => {
  const { username, email } = req.body;

  const transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
      user: "55es3afclinicpharmacy@gmail.com",
      pass: "itqq jnfy kirk druf",
    },
  });

  const user = await User.findOne({ username: username, email: email });

  if (!user) res.status(200).send("username or email is wrong");
  else {
    const info = await transporter.sendMail({
      from: '"Pharmacy" <55es3afclinicpharmacy@gmail.com>', // sender address
      to: email, // list of receivers
      subject: "Password Reset", // Subject line
      text: "Click on this link to reset your password", // plain text body
      html: `<b>Click on this <a href = "http://localhost:3000/resetPassword/${user._id.valueOf()}">link</a> to reset your password</b>`, // html body
    });
    res.status(200).send("an email has been sent");
  }
};

const resetPassword = async(req, res) => {
  const { password } = req.body;
  const id = req.params.id

  const salt = await bcrypt.genSalt();
  const hashedPassword = await bcrypt.hash(password, salt);
  var newPassword = hashedPassword;

  //const user = await User.findOne({ username: username });
  const user = await User.findById(id);

  if(!user) res.status(200).send('Username is incorrect')
  else{
    await User.findByIdAndUpdate(id, {
      password: newPassword,
    });
    res.status(200).send("Password updated successfully!");
  }
}



async function getPassword(id, password){
  var user = await User.findById(id)

  // const salt = await bcrypt.genSalt();
  // const hashedPassword = await bcrypt.hash(password, salt);
  // var newPassword = hashedPassword;

  console.log(`user password: ${user.password}`)
  console.log(`old password: ${password}`)

  const isPasswordValid = await bcrypt.compare(password, user.password);

  if(isPasswordValid) return true
  else return false
}

const changePassword = async (req, res) => {
  //const currPassword = req.body.password
  const token = req.cookies.jwt;
  var id = ''
  jwt.verify(token, "supersecret", (err, decodedToken) => {
    if (err) {
      console.log('You are not logged in.');
      // res send status 401 you are not logged in
      res.status(401).json({ message: "You are not logged in." });
      // res.redirect('/login');
    } else {
      id = decodedToken.name;
      console.log('got the id')
    }
  });

  const salt = await bcrypt.genSalt();
  const hashedPassword = await bcrypt.hash(req.body.newPassword, salt);
  var newPassword = hashedPassword;

  console.log(`current password: ${req.body.oldPassword}`)

  var message = ''

  var correct = await getPassword(id, req.body.oldPassword)

  if(correct) {
    console.log('correct current password')
    const isPasswordValid = await bcrypt.compare(req.body.oldPassword, req.body.newPassword);
    if(isPasswordValid) {
      console.log('same same')
      message = 'new password is the same as the current'
    }
    else{
      try {
        await User.findByIdAndUpdate(id, { password: newPassword });
        message = "Password updated successfully"
      } catch (err) {
        console.error(err);
      }
    }
  }
  else {
    console.log('wrong current password')
    message = 'wrong current password'
  }

  res.status(200).send(message)
};

module.exports = {
  addAdmin,
  deleteUser,
  listUsers,
  getUsers,
  login,
  logout,
  forgetPassword,
  changePassword,
  acceptPharmacist,
  rejectPharmacist,
  resetPassword,
};
