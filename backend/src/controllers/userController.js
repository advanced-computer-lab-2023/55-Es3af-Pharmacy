const User = require("../Models/user.js");
const bcrypt = require("bcrypt");
const { createToken } = require("../utils/auth.js");
const nodemailer = require("nodemailer");

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
  res.status(200).send('test')

  // const transporter = nodemailer.createTransport({
  //   service: "gmail",
  //   auth: {
  //     user: "55es3afclinicpharmacy@gmail.com",
  //     pass: "55Es3afACL",
  //   },
  // });

  // const mailOptions = {
  //   from: "55es3afclinicpharmacy@gmail.com",
  //   to: "zeinaayman666@gmail.com",
  //   subject: "Password restoration",
  //   text: "Your new password is: 55Es3afACL",
  // };

  // transporter.sendMail(mailOptions, (error, info) => {
  //   if (error) {
  //     console.error(error);
  //   } else {
  //     console.log("Email sent: " + info.response);
  //     res.status.send("done");
  //   }
  // });

  // User.findOne({username: username, email: email})
  // .exec()
  // .then((result) => {
  //   if(!result) {res.status.send('username or email is wrong')}
  //   else{

  //   }
  // })
  // .catch((err) => {console.error(err)})
};

module.exports = {
  addAdmin,
  deleteUser,
  listUsers,
  getUsers,
  login,
  logout,
  forgetPassword,
};
