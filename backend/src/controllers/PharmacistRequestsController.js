const pharmacistModel = require('../Models/PharmacistRequests.js');
const pharmacistModel = require('../Models/pharmacist.js')
const { default: mongoose } = require('mongoose');

const requestPharmacist = async(req,res) => {
    pharmacistModel.findOne({username: req.body.username})
    .exec()
    .then((result) => {
        if(Object.keys(result).length === 0){
            pharmacistModel.findOne({email: req.body.email})
            .exec()
            .then((result2)=>{
                if(Object.keys(result2).length === 0){
                    const newUser= new pharmacistModel({
                        username: req.body.username,
                        name: req.body.name,
                        email: req.body.email,
                        password: req.body.password,
                        dateOfBirth: req.body.dateOfBirth,
                        type:req.body.type,
                       });
                       newUser.save().catch(err => console.log(err));
                       pharmacistModel.findOne({username: req.body.username})
                           .exec()
                           .then((result))
                           .catch((err) => {console.error(err)})
                       const newPharmacist= new pharmacistModel({
                           user : result._id,
                           hourlyRate: req.body.hourlyRate,
                           affiliation: req.body.affiliation,
                           educationBackground: req.body.educationBackground
                       });
                       newPharmacist.save().catch(err => console.log(err));
                       res.status(200).send("Request sent.");
                }
                else{
                    res.status(200).send("Email already exists.");
                    return;
                }
            })
            .catch((err) => {console.error(err)})
        }
        else{
            res.status(200).send("Username already exists.");
            return;
        }
    })
    .catch((err) => {console.error(err)})
 }
 
const listRequests = async (req, res) => {
    try {
      res.send(await pharmacistModel.find());
    } catch (e) {
      res.status(400).send(e);
    }
  };

module.exports = {requestPharmacist, listRequests};