const express = require("express");
const app = express();
const port = 7777;
const connectDB = require("./config/Database");
const User = require("./models/user");
const { validateSignUpdata } = require("./utils/Validation");
const bcrypt = require("bcrypt");
const cookieParser = require("cookie-parser");
const jwt = require("jsonwebtoken");
const { AuthMiddleware } = require("./middlewares/Auth");

// Middleware to parse URL-encoded data
app.use(express.json());
app.use(cookieParser());

//POST-API Middleware to parse JSON data SIGNUP
app.post("/signup", async (req, res) => {
  //validate the request body using the validation function
  const validation = validateSignUpdata(req);
  if (validation?.error) {
    return res.status(400).send(validation.error); // ✅ handle validation error early
  }
  //encrypt the password using bcrypt
  const HashPassword = await bcrypt.hash(req.body.password, 10);
  console.log("HashPassword", HashPassword);
  const user = new User(req.body);
  console.log("data", user);

  try {
    validateSignUpdata(req);
    const user = new User({
      firstName: req.body.firstName,
      lastName: req.body.lastName,
      emailId: req.body.emailId,
      age: req.body.age,
      gender: req.body.gender,
      photoURL: req.body.photoURL,
      password: HashPassword, // Use the hashed password
    });

    await user.save();
    res.status(201).send("User created successfully!");
  } catch (error) {
    res.status(400).send("Error creating user: " + error.message);
  }
});

//POST-API Middleware to parse JSON data LOGIN
app.post("/login", async (req, res) => {
  const { emailId, password } = req.body;
  try {
    const user = await User.findOne({ emailId });
    if (!user) {
      return res.status(404).send("User not found!");
    }
    const isPassIsValid = await bcrypt.compare(password, user.password);
    if (isPassIsValid) {
      // Set a cookie with the random token
      // res.cookie("Token", "lkjhgfxcvhjbknmlnbcdrtfgbnjkmkjhvgcfdr");
      // create a Token for the user
      var token = jwt.sign({ _id: user._id }, "Smp346##", {expiresIn: "1d"}); // Set expiration time to 1 hour
      res.cookie("token", token);
      console.log("Token", token);
      res.status(200).send("Login successful!");
    } else {
      res.status(401).send("Invalid password!");
    }
  } catch (error) {
    res.status(500).send("Error logging in: " + error.message);
  }
});

//GET-API for getting profile data
app.get("/profile", async (req, res) => {
  const { token } = req.cookies;
  if (!token) {
    return res.status(401).send("Unauthorized: No token provided");
  }
  try {
    const decoded = jwt.verify(token, "Smp346##");
    const { _id } = decoded;
    console.log("decodeMessages", decoded);
    const user = await User.findById(_id);
    res.send(user);
    console.log("User found:", user);
    res.status(200).send("Profile access granted");
  } catch (err) {
    res.status(401).send("Unauthorized: Invalid token");
  }
});

// POST-API Middleware to send Connection Request
app.post("/sendConnectionRequest", AuthMiddleware, async (req, res) => {
  const user = req.user;
  console.log("sendConnectionRequest : ", req.user.firstName);
  res.send("Connection request sent successfully!");
});

//GET-API Middleware to get user by emailId
app.get("/user", async (req, res) => {
  const userEmail = req.body.emailId;
  try {
    const user = await User.findOne({ emailId: userEmail });
    if (!user) {
      res.status(404).send("User not found!");
    } else {
      res.status(200).send(user);
      console.log("User found:", user);
    }
  } catch (error) {
    res.status(500).send("Error fetching user: " + error.message);
  }
});

//GET-API Middleware to get all users
app.get("/feed", async (req, res) => {
  const AllUsers = await User.find({});
  try {
    if (!AllUsers) {
      res.status(404).send("No users found!");
    } else {
      res.status(200).send(AllUsers);
      console.log("All users found:", AllUsers);
    }
  } catch (error) {
    res.status(500).send("Error fetching users: " + error.message);
  }
});

//GET-API Middleware to get user by id
app.get("/userID", async (req, res) => {
  const userID = req.body._id;
  try {
    const user = await User.findById(userID);
    if (!user) {
      res.status(404).send("User not found!");
    } else {
      res.status(200).send(user);
      console.log("User found:", user);
    }
  } catch (error) {
    res.status(500).send("Error fetching user: " + error.message);
  }
});

//delete-API Middleware to delete user by emailId
app.delete("/user", async (req, res) => {
  const userEmail = req.body.emailId;
  try {
    const user = await User.findOneAndDelete({ emailId: userEmail });
    if (!user) {
      res.status(404).send("User not found!");
    } else {
      res.status(200).send("User deleted successfully!");
      console.log("User deleted:", user);
    }
  } catch (error) {
    res.status(500).send("Error deleting user: " + error.message);
  }
});

//delete-API Middleware to delete user by UserName
// app.delete("/user", async (req, res) => {
//   const userName = req.body.userName;
//   try {
//     const user = await User.deleteMany({ firstName: userName });
//     if (!user) {
//       res.status(404).send("User not found!");
//     } else {
//       res.status(200).send("User deleted successfully!");
//       console.log("User deleted:", user);
//     }
//   } catch (error) {
//     res.status(500).send("Error deleting user: " + error.message);
//   }
// });

// PATCH-API Middleware to update user
app.patch("/user", async (req, res) => {
  const { UserID, ...userData } = req.body;

  try {
    const allowedUpdates = [
      "firstName",
      "lastName",
      "password",
      "gender",
      "age",
      "photoURL",
    ];
    const updateData = {};

    for (const key of allowedUpdates) {
      if (userData[key] !== undefined) {
        updateData[key] = userData[key];
      }
    }
    const user = await User.findOneAndUpdate(
      { _id: UserID },
      updateData, // ✅ only allowed fields are passed
      { new: true, runValidators: true }
    );

    if (!user) {
      res.status(404).send("User not found!");
    } else {
      res.status(200).send("User updated successfully!");
    }
  } catch (error) {
    res.status(500).send("Error updating user: " + error.message);
  }
});

// app.patch("/user", async (req, res) => {
//   const { userId, updateData } = req.body;
//   try {
//     const user = await User.findOneAndUpdate(
//       { _id: userId },updateData, );
//     console.log("User updated:", user);
//     if (!user) {
//       res.status(404).send("User not found!");
//     } else {
//       res.status(200).send("User updated successfully!");
//     }
//   } catch (error) {
//     res.status(500).send("Error updating user: " + error.message);
//   }
// });

connectDB()
  .then(() => {
    app.listen(port, () => {
      console.log(`Server is running on http://localhost:${port}`);
    });
    console.log("Connected to MongoDB successfully!");
  })
  .catch((err) => {
    console.log("Error connecting to MongoDB:", err);
  });
