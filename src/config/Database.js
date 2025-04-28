const mangoose = require('mongoose');

const connectDB = async () => {
   await mangoose.connect("mongodb+srv://omkarpowarMangoDB:48HWD2tVeDxB1CcW@learningnodejs.4mqyrjv.mongodb.net/?retryWrites=true&w=majority&appName=LearningNodeJS",
      { dbName: "Dev-Tinder",}
   );
   
}

module.exports = connectDB;