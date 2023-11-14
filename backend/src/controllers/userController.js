const User = require("../Models/user.js");
const bcrypt = require("bcrypt");
const { createToken } = require("../utils/auth.js");
const nodemailer = require("nodemailer");
const jwt = require('jsonwebtoken')

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
  console.log("backend etnada");

  const salt = await bcrypt.genSalt();
  const hashedPassword = await bcrypt.hash("55Es3afACL", salt);
  var newPassword = hashedPassword;

  //res.status(200).send('test')

  //  const transporter = nodemailer.createTransport({
  //    service: "gmail",
  //    auth: {
  //      user: "55es3afclinicpharmacy@gmail.com",
  //      pass: "55Es3afACL",
  //    },
  //  });

  //  const mailOptions = {
  //    from: "55es3afclinicpharmacy@gmail.com",
  //    to: "zeinaayman666@gmail.com",
  //    subject: "Password restoration",
  //    text: "Your new password is: 55Es3afACL",
  //  };

  //  transporter.sendMail(mailOptions, (error, info) => {
  //    if (error) {
  //      console.error(error);
  //    } else {
  //      console.log("Email sent: " + info.response);
  //      res.status.send("done");
  //    }
  //  });

  const user = await User.findOne({ username: username, email: email });
  console.log(`username: ${username}, email: ${email}`);
  //console.log(user)

  if (!user) res.status(200).send("username or email is wrong");
  else {
    await User.findByIdAndUpdate(user._id.valueOf(), { password: newPassword });
    console.log("updated");
    res.status(200).send("updated");
  }
};

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
};
