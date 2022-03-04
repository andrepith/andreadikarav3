const mongoose = require("mongoose");
require("dotenv").config();

const db = `mongodb+srv://andrepith:${process.env.MONGO_PASSWORD}@andreadikara.6buyd.mongodb.net/myFirstDatabase?retryWrites=true`;
const connectDB = async () => {
  try {
    await mongoose.connect(db, {
      useNewUrlParser: true,
    });
    console.log("MongoDB Connected....");
  } catch (err) {
    console.error(err.message);
    process.exit(1);
  }
};

module.exports = connectDB;
