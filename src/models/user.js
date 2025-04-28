const mangoose = require("mongoose");

const userSchema = new mangoose.Schema(
  {
    firstName: {
      type: String,
      required: true,
    },
    lastName: {
      type: String,
      required: true,
    },
    emailId: {
      type: String,
      required: true,
      unique: true,
    },
    password: {
      type: String,
      required: true,
    },
    age: {
      type: Number,
      required: true,
    },
  },
  {
    collection: "Dev-Tinder Data", // ✅ now it’s correctly placed
    timestamps: true, // ✅ (Optional) adds createdAt & updatedAt fields automatically
  }
);

const User = mangoose.model("User", userSchema);
module.exports = User;
