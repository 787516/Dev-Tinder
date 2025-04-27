const express = require("express");
const app = express();
const port = 7777;
const connectDB = require("./config/Database");

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
