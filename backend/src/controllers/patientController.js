const medicine = require("../Models/Medicine.js");
const patient = require("../Models/patient.js");
const Order = require("../Models/order.js");
const jwt = require('jsonwebtoken');
const { pid } = require("process");
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
  const token = req.cookies.jwt;
  var id;
  jwt.verify(token, 'supersecret', (err, decodedToken) => {
      if (err) {
        // console.log('You are not logged in.');
        // res send status 401 you are not logged in
        res.status(401).json({message:"You are not logged in."})
        // res.redirect('/login');
      } else {
       
        id= decodedToken.name;
      }
    });
    const p = await patient.findById(id);

  res.send(p.cart);
};

const addToCart = async (req, res) => {
 
  const token = req.cookies.jwt;
  var id;
  jwt.verify(token, 'supersecret', (err, decodedToken) => {
      if (err) {
        // console.log('You are not logged in.');
        // res send status 401 you are not logged in
        res.status(401).json({message:"You are not logged in."})
        // res.redirect('/login');
      } else {
        
        id= decodedToken.name;
      }
    });
 
  const med = await medicine.findById(req.query.id);
  const p = await patient.findById(id);
  var exists = false;
  var s = 0;
  if (p.cart.length > 0) {
    for (let i = 0; i < p.cart.length; i++) {
      if (p.cart[i].medID.toString() === med._id.toString()) {
        exists = true;
        s = i;
        break;
      }
    }

    if (exists == false) {
      p.cartTotal = p.cartTotal + med.Price;
      p.cart.push({ medID: med._id, qty: 1 });
      p.save().catch((err) => res.send(err));
      res.status(200).send("Cart saved.");
    } else {
      existingInCart = p.cart[s];
      existingInCart.qty += 1;
      p.cartTotal += med.Price;
      p.save().catch((err) => res.send(err));
      res.status(200).send("Cart saved.");
    }
  } else {
    p.cartTotal = med.Price;
    p.cart.push({ medID: med._id, qty: 1 });
    p.save().catch((err) => res.send(err));
    res.status(200).send("Cart saved.");
  }
};

const removeItem = async (req, res) => {
  const token = req.cookies.jwt;
  var id;
  jwt.verify(token, 'supersecret', (err, decodedToken) => {
      if (err) {
        // console.log('You are not logged in.');
        // res send status 401 you are not logged in
        res.status(401).json({message:"You are not logged in."})
        // res.redirect('/login');
      } else {
        
        id= decodedToken.name;
      }
    });
    
    

  console.log(req.query.id+ " mazen");
  const med = await medicine.findById(req.query.id);
  const p = await patient.findById(id);
  var exists = false;
  var s = 0;
  if (p.cart.length > 0) {
    for (let i = 0; i < p.cart.length; i++) {
      if (p.cart[i].medID.toString() === med._id.toString()) {
        exists = true;
        s = i;
        break;
      }
    }

    if (exists) {
      existingInCart = p.cart[s];
      existingInCart.qty -= 1;
      if (existingInCart.qty === 0) {
        // If quantity becomes zero, remove the item from the cart array
        p.cart.splice(s, 1);
      }
      p.cartTotal -= med.Price;
      p.save().catch((err) => console.log(err));
      res.send("Cart saved.");
    }
  }
};

const removeMed = async (req, res) => {
  const token = req.cookies.jwt;
  var id;
  jwt.verify(token, 'supersecret', (err, decodedToken) => {
      if (err) {
        // console.log('You are not logged in.');
        // res send status 401 you are not logged in
        res.status(401).json({message:"You are not logged in."})
        // res.redirect('/login');
      } else {
        
        id= decodedToken.name;
      }
    });
    
    

  
  const med = await medicine.findById(req.query.id);
  const p = await patient.findById(id);
  var exists = false;
  var s = 0;
  if (p.cart.length > 0) {
    for (let i = 0; i < p.cart.length; i++) {
      if (p.cart[i].medID.toString() === med._id.toString()) {
        exists = true;
        s = i;
        break;
      }
    }

    if (exists) {
      existingInCart = p.cart[s];
      
      
        // If quantity becomes zero, remove the item from the cart array
        p.cart.splice(s, 1);
      
      p.cartTotal -= (med.Price * existingInCart.qty);
      p.save().catch((err) => console.log(err));
      res.send("Cart saved.");
    }
  }
};


const addItem = async (req, res) => {
  const token = req.cookies.jwt;
  var id;
  jwt.verify(token, 'supersecret', (err, decodedToken) => {
      if (err) {
        // console.log('You are not logged in.');
        // res send status 401 you are not logged in
        res.status(401).json({message:"You are not logged in."})
        // res.redirect('/login');
      } else {
        
        id= decodedToken.name;
      }
    });
    

 
  const med = await medicine.findById(req.query.id);
  const p = await patient.findById(id);
  var exists = false;
  var s = 0;
  if (p.cart.length > 0) {
    for (let i = 0; i < p.cart.length; i++) {
      if (p.cart[i].medID.toString() === med._id.toString()) {
        exists = true;
        s = i;
        break;
      }
    }

    if (exists) {
      existingInCart = p.cart[s];
      existingInCart.qty += 1;
      
      p.cartTotal += med.Price;
      p.save().catch((err) => console.log(err));
      res.send("Cart saved.");
    }
  }
};

const checkout = async (req, res) => {
  
  const token = req.cookies.jwt;
  var id;
  jwt.verify(token, 'supersecret', (err, decodedToken) => {
      if (err) {
        // console.log('You are not logged in.');
        // res send status 401 you are not logged in
        res.status(401).json({message:"You are not logged in."})
        // res.redirect('/login');
      } else {
        
        id= decodedToken.name;
      }

    });
    const p = await patient.findById(id);
  const newOrder = await Order.create({
    pID: p._id,
    status: "pending",
    total: p.cartTotal,

  });
  newOrder.save().catch((err) => console.log(err));
  res.send(newOrder);
};

const getPassword = async(req, res) => {
  const userID = req.params.id
  var user = await patient.findById(userID);
  res.status(200).send(user.password)
}



const addDelivery = async (req, res) => {
  const token = req.cookies.jwt;
  var id;
  jwt.verify(token, 'supersecret', (err, decodedToken) => {
      if (err) {
        // console.log('You are not logged in.');
        // res send status 401 you are not logged in
        res.status(401).json({message:"You are not logged in."})
        // res.redirect('/login');
      } else {
        
        id= decodedToken.name;
      }

    });
    const p = await patient.findById(id);
    p.delivery.push(req.body.delivery);
    p.save().catch((err) => console.log(err));
    res.send("patient saved");

  }
  const viewOrder = async (req, res) => {
    const token = req.cookies.jwt;
    var id;
    jwt.verify(token, 'supersecret', (err, decodedToken) => {
        if (err) {
          // console.log('You are not logged in.');
          // res send status 401 you are not logged in
          res.status(401).json({message:"You are not logged in."})
          // res.redirect('/login');
        } else {
         
          id= decodedToken.name;
        }
      });
      const p = await Order.find({pID : id});
      
    res.send(p);
  };

  const cancelOrder = async (req, res) => {
    const token = req.cookies.jwt;
    var id;
    jwt.verify(token, 'supersecret', (err, decodedToken) => {
        if (err) {
          // console.log('You are not logged in.');
          // res send status 401 you are not logged in
          res.status(401).json({message:"You are not logged in."})
          // res.redirect('/login');
        } else {
          
          id= decodedToken.name;
        }
      });
    const p = await patient.findById(id);
    const order= await Order.findOne({pID: id});
    order.deleteOne();
    res.status(200).send("Order cancelled succesfully");
  };


  const dropdown = async (req, res) => {
 
    const token = req.cookies.jwt;
    var id;
    jwt.verify(token, 'supersecret', (err, decodedToken) => {
        if (err) {
          // console.log('You are not logged in.');
          // res send status 401 you are not logged in
          res.status(401).json({message:"You are not logged in."})
          // res.redirect('/login');
        } else {
          
          id= decodedToken.name;
        }
      });
      const p = await patient.findById(id);
      res.status(200).send(p.delivery);
    }

module.exports = {
  getPatient,
  getPatients,
  viewCart,
  addToCart,
  removeItem,
  checkout,
  getPassword,
  addItem,
  addDelivery,
  viewOrder,
  cancelOrder,
  dropdown,
  removeMed,
};
