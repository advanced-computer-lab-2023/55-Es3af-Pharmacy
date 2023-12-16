const medicine = require("../Models/Medicine.js");
const patient = require("../Models/patient.js");
const Order = require("../Models/order.js");
const jwt = require("jsonwebtoken");
const { pid } = require("process");
const stripe= require('stripe')("sk_test_51NxqUnLoGRs62ex4Yxz9G8uKeNFYxSs27BlQznMivk0eBNxx7eZzj6X1Q2ZCYEhOmLOhbGwVLNMzLwMsV1Xf4fZv00ert3YhEW");
const bcrypt = require("bcrypt");
const sales = require("../Models/sales.js");
const { medicineOutOfStock } = require("./medicineController.js");

const prescription = require("../Models/Prescriptions.js");
//const Prescriptions = require('C:/Users/asus/OneDrive/Desktop/JR/55-Es3af-Clinic/src/Models/Prescriptions');
//const prescription = require("C:/Users/asus/OneDrive/Desktop/JR/55-Es3af-Clinic/src/Models/Prescriptions");




const getPatient = async (req, res) => {
  try {
    res.send(await patient.findById(req.params.id));
  } catch (e) {
    res.status(400).send(e);
  }
};

const getWallet = async (req, res) => {
 
  const token = req.cookies.jwt;
  var id;
  jwt.verify(token, "supersecret", (err, decodedToken) => {
    if (err) {
      // console.log('You are not logged in.');
      // res send status 401 you are not logged in
      res.status(401).json({ message: "You are not logged in." });
      // res.redirect('/login');
    } else {
      id = decodedToken.name;
    }
  });
  const p = await patient.findById(id);
  res.status(200).json(p.amountInWallet);
};
const addtoWallet = async (req, res) => {
 
  const token = req.cookies.jwt;
  var id;
  jwt.verify(token, "supersecret", (err, decodedToken) => {
    if (err) {
      // console.log('You are not logged in.');
      // res send status 401 you are not logged in
      res.status(401).json({ message: "You are not logged in." });
      // res.redirect('/login');
    } else {
      id = decodedToken.name;
    }
  });
  const p = await patient.findById(id);
  p.amountInWallet+=100;
  p.save().catch((err) => res.send(err));
  res.status(200).json(p.amountInWallet);
};

const getPatients = async (req, res) => {
  //retrieve all patients from the database
  const patients = await patient.find({});

  res.status(200).send(patients);
};

const viewCart = async (req, res) => {
  const token = req.cookies.jwt;
  var id;
  jwt.verify(token, "supersecret", (err, decodedToken) => {
    if (err) {
      // console.log('You are not logged in.');
      // res send status 401 you are not logged in
      res.status(401).json({ message: "You are not logged in." });
      // res.redirect('/login');
    } else {
      id = decodedToken.name;
    }
  });
  const p = await patient.findById(id);

  res.send(p.cart);
};

const addToCart = async (req, res) => {
  const token = req.cookies.jwt;
  var canBeAdded= false;
  var allfilled=true;
  var id;
  jwt.verify(token, "supersecret", (err, decodedToken) => {
    if (err) {
      // console.log('You are not logged in.');
      // res send status 401 you are not logged in
      res.status(401).json({ message: "You are not logged in." });
      // res.redirect('/login');
    } else {
      id = decodedToken.name;
    }
  });


  var newpers;
  const med = await medicine.findById(req.query.id);
  const p = await patient.findById(id);
  if(med.overTheCounter==false){
        const pid = p._id.toString();
        var pers = await prescription.find({});
        for(let i = 0 ; i<pers.length ; i++){
          if(pers[i].patient.toString() === pid && pers[i].status === "unfilled"  ){
            for(let j= 0 ; j<pers[i].medicine.length ; j++){
              if(pers[i].medicine[j].medID.toString() === med._id.toString()){
                canBeAdded= true;
                pers[i].medicine[j].filled= true;
              }
            }
          }
        }
        for(let i = 0 ; i<pers.length ; i++){

          if(pers[i].patient.toString() === pid ){
            
          for(let j= 0 ; j<pers[i].medicine.length ; j++){
            if(pers[i].medicine.filled == false){
              allfilled=false;
            }
          }
        
        if(allfilled){
          pers[i].status= "filled";
          newpers= pers[i];
        }
      }
        }
        

  }
  var exists = false;
  var s = 0;
  if((med.overTheCounter==false && canBeAdded == true) || med.overTheCounter ){
   
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
      p.cart.push({ medID: med._id, qty: 1, medName:med.Name, medPrice:med.Price });
      p.save().catch((err) => res.send(err));
      res.status(200).send("Medicine added.");
    } else {
      existingInCart = p.cart[s];
      existingInCart.qty += 1;
      p.cartTotal += med.Price;
      p.save().catch((err) => res.send(err));
      //newpers.save()
      res.status(200).send("Medicine added.");
    }
  } else {
    p.cartTotal = med.Price;
    p.cart.push({ medID: med._id, qty: 1, medName:med.Name, medPrice:med.Price });
    p.save().catch((err) => res.send(err));
    res.status(200).send("Medicine added.");
  }
  }else{
    res.status(200).send("You can't add this medicine to your cart without a prescription");
   
  }
};

const removeItem = async (req, res) => {
  const token = req.cookies.jwt;
  var id;
  jwt.verify(token, "supersecret", (err, decodedToken) => {
    if (err) {
      // console.log('You are not logged in.');
      // res send status 401 you are not logged in
      res.status(401).json({ message: "You are not logged in." });
      // res.redirect('/login');
    } else {
      id = decodedToken.name;
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
  jwt.verify(token, "supersecret", (err, decodedToken) => {
    if (err) {
      // console.log('You are not logged in.');
      // res send status 401 you are not logged in
      res.status(401).json({ message: "You are not logged in." });
      // res.redirect('/login');
    } else {
      id = decodedToken.name;
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

      p.cartTotal -= med.Price * existingInCart.qty;
      p.save().catch((err) => console.log(err));
      res.send("Cart saved.");
    }
  }
};

const addItem = async (req, res) => {
  const token = req.cookies.jwt;
  var id;
  jwt.verify(token, "supersecret", (err, decodedToken) => {
    if (err) {
      // console.log('You are not logged in.');
      // res send status 401 you are not logged in
      res.status(401).json({ message: "You are not logged in." });
      // res.redirect('/login');
    } else {
      id = decodedToken.name;
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
  var i = false;
  var id;
  jwt.verify(token, "supersecret", (err, decodedToken) => {
    if (err) {
      // console.log('You are not logged in.');
      // res send status 401 you are not logged in
      res.status(401).json({ message: "You are not logged in." });
      // res.redirect('/login');
    } else {
      id = decodedToken.name;
    }
  });
  const p = await patient.findById(id);
  if(req.query.string === "wallet"){
      i = true;
  }
  const newOrder = await Order.create({
    
    pID: p._id,
    status: "pending",
    total: p.cartTotal,
    address:" ",
    wallet:i,

  });
  newOrder.save().catch((err) => console.log(err));
  
  for (const cartItem of p.cart) {
    var m = cartItem.medID.toString();
    const med = await medicine.findById(m);
    console.log(med);
    console.log(cartItem);
    //med.Quantity = med.Quantity - cartItem.qty;
    med.Quantity = med.Quantity - cartItem.qty;
    console.log(med.Quantity+ " new quantity");
   med.save().catch((err) => console.log(err));

   newSale = await sales.create({

    medid: med._id,
    medicineName: med.Name,
    Quantity: cartItem.qty,
    boughtBy: p._id,
    patientName: p.name,

   });
   newSale.save().catch((err) => console.log(err));
  }


  p.cart=[];
  p.cartTotal=0;
  await p.save();
  medicineOutOfStock()
  res.send(newOrder);


};

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

    const order= await Order.findById(req.query.id);

    order.status = "CANCELLED";
    if(order.wallet == true){
    p.amountInWallet += order.total; 
    }
    order.save().catch((err) => console.log(err));
    res.status(200).send("Order cancelled succesfully");
  };



  const orderAddress = async (req, res) => {
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
    const order= await Order.findOne({pID: id, status:"pending"});
    //console.log(order);
    order.address = req.body.address;
    order.status = "on the way"
    order.save().catch((err) => console.log(err));
    res.send(order);
  };


const dropdown = async (req, res) => {
  const token = req.cookies.jwt;
  var id;
  jwt.verify(token, "supersecret", (err, decodedToken) => {
    if (err) {
      // console.log('You are not logged in.');
      // res send status 401 you are not logged in
      res.status(401).json({ message: "You are not logged in." });
      // res.redirect('/login');
    } else {
      id = decodedToken.name;
    }
  });
  const p = await patient.findById(id);
  res.status(200).send(p.delivery);
};

const getSales = async (req, res) => {
  
  const meds = await sales.find();
  res.send(meds);
};


const listReports = async (req, res) => {
  const meds = await sales.find({medicineName: req.body.name});
  res.send(meds);
};



    const withdrawFromWallet = async (req, res) => {
      const token = req.cookies.jwt;
      var patientID;
      jwt.verify(token, 'supersecret', (err, decodedToken) => {
          if (err) {
            // console.log('You are not logged in.');
            // res send status 401 you are not logged in
            res.status(401).json({message:"You are not logged in."})
            // res.redirect('/login');
          } else {
            
            patientID= decodedToken.name;
          }
        });
      const amountToWithdraw = req.body.amount;
      try {
        const patientt = await patient.findById(patientID).exec();
        if (patientt.amountInWallet < amountToWithdraw) {
          return res.status(200).send("Not suffecient funds in wallet");
        } else {
          patientt.amountInWallet -= amountToWithdraw;
          await patientt.save();
          return res.status(200).send("Amount deducted successfully");
        }
      } catch (error) {
        console.error(error);
        res.status(500).send("An error occurred while withdrawing");
      }
    };
    const checkoutSession = async (req,res)=>{
      try{
        
        const  lineItems  = req.body.lineItems;
        const success_url=req.body.success_url;
        const cancel_url= req.body.cancel_url;
        const session = await stripe.checkout.sessions.create({
          payment_method_types: ['card'],
          mode:'payment',
          line_items: lineItems,
          success_url:success_url,
          cancel_url:cancel_url,
        })
        res.json({url:session.url})
      }
      catch (error){
        console.error(error);
        res.status(500).send('Internal Server Error');
      }
    }

module.exports = {
  getPatient,
  getPatients,
  viewCart,
  addToCart,
  removeItem,
  checkout,
  addItem,
  addDelivery,
  viewOrder,
  cancelOrder,
  dropdown,
  removeMed,
  checkoutSession,
  withdrawFromWallet,
  orderAddress,
  getWallet,
  addtoWallet,
  getSales,
  listReports,
};
