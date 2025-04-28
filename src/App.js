const express = require("express");
const app = express();
const port = 7777;
const connectDB = require("./config/Database");
const User = require("./models/user");

app.post("/signup", async (req, res) => {
  const user = new User({
    firstName: "Omkar",
    lastName: "Powar",
    emailId: "Omkar123@gmail.com",
    password: "1234567",
    age : 25,
  });

  try {
    await user.save();
    res.status(201).send("User created successfully!");
  } catch (error) {
    res.status(400).send("Error creating user: " + error.message);
  }
});

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
