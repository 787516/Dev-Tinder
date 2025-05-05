//middleware to check if the user is authenticated


const User = require('../models/user');
const jwt = require("jsonwebtoken");

const AuthMiddleware = async (req, res, next) => { 
  const {token} = req.cookies; // Get the token from cookies
  if (!token) {
    return res.status(401).send("Unauthorized: No token provided");
  }
  // Verify the token
  try {
    const decodedObj = await jwt.verify(token, 'Smp346##');
    const { _id } = decodedObj; // Extract the user ID from the decoded token

    //find the user by ID
    const user = await User.findById(_id);
    if (!user) {
      throw new Error("omkar this User not found");
    }
    req.user = user; // Attach the user object to the request for later use
    next(); // Call the next middleware or route handler
  }
  catch (err) {
     res.status(401).send("Unauthorized:omkar this is Invalid token");
  }
}

module.exports = {AuthMiddleware};


// const AdminAuth =
//   ("/admin",
//   (req, res, next) => {
//     console.log("Admin Auth Middleware");
//     const Token = "xyz";
//     const adminToken = Token === "xyz";
//     if (!adminToken) {
//       return res.status(401).send("Unauthorized access");
//     } else {
//       next();
//     }
//   });

// const UserAuth =
//   ("/user",
//   (req, res, next) => {
//     console.log("User Auth Middleware");
//     const Token = "xyzq";
//     const userToken = Token === "xyz";
//     if (!userToken) {
//       return res.status(401).send("Unauthorized access");
//     } else {
//       next();
//     }
//   });

// module.exports = { UserAuth, AdminAuth };
