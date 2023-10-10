const pharmacist = require("../Models/pharmacist.js");

const getPharmacist = async (req, res) => {
  try {
    res.send(await pharmacist.findById(req.params.id));
  } catch (e) {
    res.status(400).send(e);
  }
};

module.exports = { getPharmacist };
