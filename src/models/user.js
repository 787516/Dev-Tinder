const mangoose = require("mongoose");
const validator = require("validator");

const userSchema = new mangoose.Schema(
  {
    firstName: {
      type: String,
    //  required: true,
      minlength: 2,
      maxlength: 20,
      trim: true,
    },
    lastName: {
      type: String,
      required: true,
      minlength: 3,
      maxlength: 20,
      trim: true,
    },
    emailId: {
      type: String,
      required: true,
      unique: false,
      lowercase: true,
      trim: true,
      immutable: true,
      validate: {
        validator: function (value) {
          return validator.isEmail(value);
        },
        message: props => `${props.value} is not a valid email address`
      },
     
    },
    password: {
      type: String,
      required: true,
      minlength: 4,
      maxlength: 100,
      trim: true,
      validate(value) {
        if (!validator.isStrongPassword(value)) {
          throw new Error(
            "Password is not strong enough. It should contain at least 8 characters, including uppercase, lowercase, numbers, and symbols."
          );
        }
      },
    },
    gender: {
      type: String,
      required: true,
      trim: true,
      lowercase: true,
      validate: {
        validator: function (value) {
          return ['male', 'female', 'other'].includes(value);
        },
        message: props => `${props.value} is not a valid gender value`
      }
    },
    
    age: {
      type: Number,
      required: true,
      min: 18,
      max: 80,
    },
    photoURL: {
      type: String,
      default: "https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-978409_960_720.png",
      validate: {
        validator: function (value) {
          return validator.isURL(value);
        },
        message: props => `${props.value} is not a valid URL`
      }
    },
    
  },
  {
    collection: "Dev-Tinder Data", // ✅ now it’s correctly placed
    timestamps: true, // ✅ (Optional) adds createdAt & updatedAt fields automatically
  }
);

const User = mangoose.model("User", userSchema);
module.exports = User;
