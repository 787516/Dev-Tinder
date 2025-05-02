const express = require("express");
const app = express();
const port = 7777;
const connectDB = require("./config/Database");
const User = require("./models/user");

// Middleware to parse URL-encoded data
app.use(express.json());

//POST-API Middleware to parse JSON data
app.post("/signup", async (req, res) => {
  const user = new User(req.body);
  console.log("data", user);

  try {
    await user.save();
    res.status(201).send("User created successfully!");
  } catch (error) {
    res.status(400).send("Error creating user: " + error.message);
  }
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
})


 app.patch("/user", async (req, res) => {
  const UserID = req.body.UserID;
  const userData = req.body;
  try {
    const user = await User.findOneAndUpdate({ _id: UserID}, userData);
    console.log("User updated:", user);
    if (!user) {
      res.status(404).send("User not found!");
    } else {
      res.status(200).send("User updated successfully!");
    }
  }
  catch (error) {
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
