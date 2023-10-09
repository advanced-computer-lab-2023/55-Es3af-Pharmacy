const user = require('../Models/user.js');
const { default: mongoose } = require("mongoose");

const addAdmin = async (req, res) => {
  try {
    const { username, password } = req.body;
    res.send(await user.create({ username, password, type: 'pharmacist' }));
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




module.exports = { addAdmin, deleteUser, listUsers};
