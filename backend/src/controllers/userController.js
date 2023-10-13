const user = require("../Models/user.js");

const addAdmin = async (req, res) => {
  try {
    const { username, password } = req.body;
    res.send(await user.create({ username, password, type: "administrator" }));
  } catch (e) {
    res.status(400).send(e);
  }
};

const listUsers = async (req, res) => {
  try {
    res.send(await user.find());
  } catch (e) {
    res.status(400).send(e);
  }
};

const deleteUser = async (req, res) => {
  try {
    res.send(await user.findByIdAndDelete(req.params.id));
  } catch (e) {
    res.status(400).send(e);
  }
};

const getUsers = async (req, res) => {
  //retrieve all users from the database
  const users= await user.find({});
  //console.log(users);
  res.status(200).send(users);
 }

module.exports = { addAdmin, deleteUser, listUsers, getUsers };
