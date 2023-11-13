const medicine = require("../Models/Medicine.js");
const patient = require("../Models/patient.js");
const Order = require("../Models/order.js");
const jwt = require("jsonwebtoken");
const { pid } = require("process");
const bcrypt = require("bcrypt");
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

  console.log(req.query.id + " mazen");
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
  const newOrder = await Order.create({
    pID: p._id,
    status: "pending",
    total: p.cartTotal,
  });
  newOrder.save().catch((err) => console.log(err));
  res.send(newOrder);
};

async function getPassword(id, password){
  var user = await patient.findById(id)

  const salt = await bcrypt.genSalt();
  const hashedPassword = await bcrypt.hash(password, salt);
  var newPassword = hashedPassword;

  console.log(`user password: ${user.password}`)
  console.log(`new password: ${newPassword}`)

  const isPasswordValid = await bcrypt.compare(newPassword, user.password);

  if(isPasswordValid) return true
  else return false
}

// const getPassword = async (req, res) => {

//   //getting id
//   const token = req.cookies.jwt;
//   var id = '6550ca7d9bb5cfdbc3cfa9c6'
//   // jwt.verify(token, "supersecret", (err, decodedToken) => {
//   //   if (err) {
//   //     console.log('You are not logged in.');
//   //     // res send status 401 you are not logged in
//   //     res.status(401).json({ message: "You are not logged in." });
//   //     // res.redirect('/login');
//   //   } else {
//   //     id = decodedToken.name;
//   //     console.log('got the id')
//   //   }
//   // });

//   //hashing input password
//   console.log(req.body)
//   const salt = await bcrypt.genSalt();
//   const hashedPassword = await bcrypt.hash(req.body, salt);

//   var newPassword = hashedPassword;

//   //getting user from db
//   var user = await patient.findById(id);
//   console.log(user)

//   //check if the typed current password is correct or not
//   if(newPassword === user.password) res.status(200).send(true)
//   else res.status(200).send(false)

//   //res.status(200).send(user.password);
// };

const changePassword = async (req, res) => {
  //const currPassword = req.body.password
  const token = req.cookies.jwt;
  var id = '6550ca7d9bb5cfdbc3cfa9c6'
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

  console.log(`current hashed password: ${newPassword}`)

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
        await patient.findByIdAndUpdate(id, { password: newPassword });
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


const addDelivery = async (req, res) => {
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
  p.delivery.push(req.body.delivery);
  p.save().catch((err) => console.log(err));
  res.send("patient saved");
};
const viewOrder = async (req, res) => {
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
  const p = await Order.find({ pID: id });

  res.send(p);
};

const cancelOrder = async (req, res) => {
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
  const order = await Order.findOne({ pID: id });
  order.deleteOne();
  res.status(200).send("Order cancelled succesfully");
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
  changePassword,
};
