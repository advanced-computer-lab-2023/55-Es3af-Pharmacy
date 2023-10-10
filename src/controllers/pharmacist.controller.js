const pharmacist = require("../Models/pharmacist.js");

const getPharmacist = async (req, res) => {
  try {
   
    res.send(await pharmacist.findById(req.params.id));
  } catch (e) {
    res.status(400).send(e);
  }
};
const addPharm = async (req, res) => {
  try {
    const { hourlyRate, affiliation, educationBackground } = req.body;

    res.send(await pharmacist.create({ hourlyRate, affiliation, educationBackground}));
  } catch (e) {
    res.status(400).send(e);
  }
};

module.exports = { getPharmacist, addPharm };
