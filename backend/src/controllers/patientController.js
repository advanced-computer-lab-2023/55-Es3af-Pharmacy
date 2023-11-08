const medicine = require("../Models/Medicine.js");
const patient = require("../Models/patient.js");
const Order = require("../Models/order.js");
const getPatient = async (req, res) => {
  try {
    res.send(await patient.findById(req.params.id));
  } catch (e) {
    res.status(400).send(e);
  }
};

const getPatients = async (req, res) => {
  //retrieve all patients from the database
  const patients = await patient.find({});
  
  res.status(200).send(patients);
};

const viewCart = async (req, res) => {
  const p = await patient.find(req.query);
  res.send(p[0].cart);
};


const addToCart = async(req,res) =>{
  
  const med = await medicine.findById(req.body.id);
  const p = await patient.findById(req.query);
  var exists= false;
  var s= 0;
if(p.cart.length >0){


  for (let i = 0; i < p.cart.length; i++) {
   

    if (p.cart[i].medID.toString() === med._id.toString()) {
      
      exists = true;
      s=i;
      break;
    }
  }
  
  if(exists == false){
    
    p.cartTotal= p.cartTotal + med.Price;
    p.cart.push({medID: med._id , qty:1});
    p.save().catch((err) => console.log(err));
    res.status(200).send("Cart saved.");
  }else{
    
    
    existingInCart = p.cart[s];
    existingInCart.qty+=1;
    p.cartTotal+= med.Price;
    p.save().catch((err) => console.log(err));
    res.status(200).send("Cart saved.");
  }
  
 
  
}else{
    p.cartTotal = med.Price;
    p.cart.push({medID: med._id , qty:1 });
    p.save().catch((err) => console.log(err));
    res.status(200).send("Cart saved.");
  }

};



const removeItem = async (req, res) => {
  const med = await medicine.findById(req.body.id);
  const p = await patient.findById(req.query);
  var exists= false;
  var s= 0;
if(p.cart.length >0){


  for (let i = 0; i < p.cart.length; i++) {

    if (p.cart[i].medID.toString() === med._id.toString()) {
      
      exists = true;
      s=i;
      break;
    }
  }
  
  if(exists){
    
    
    existingInCart = p.cart[s];
    existingInCart.qty-=1;
    p.cartTotal-= med.Price;
    p.save().catch((err) => console.log(err));
    res.send("Cart saved.");
  }
  
 
  
}
};

const checkout = async (req, res) => {
  console.log("hi");
  const p = await patient.findById(req.query);
  newOrder= new Order({
    pID: p._id,
    status: "pending",
  });
  newOrder.save().catch((err) => console.log(err));
  res.send(newOrder);

};




module.exports = { getPatient, getPatients , viewCart, addToCart, removeItem, checkout};
