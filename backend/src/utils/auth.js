const jwt = require("jsonwebtoken");



const auth = (req, res, next) => {
  
  console.log("ana hena");
  const token = req.cookies.jwt;
  
  // check json web token exists & is verified
  
  if (token) {
    jwt.verify(token, "supersecret", (err, decodedToken) => {
      if (err) {
        res.status(401).json({ message: "You are not logged in." });
        // res.redirect('/login');
      } else {
        console.log(req.body);
        
        next();
        
      }
    });
  } else {
    res.status(401).json({ message: "You are not logged in." });
  }
};



const maxAge = 3 * 24 * 60 * 60;
const createToken = (name) => {
  return jwt.sign({ name }, "supersecret", {
    expiresIn: maxAge,
  });
};

module.exports = { auth, createToken };
