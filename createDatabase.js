const mongoose = require("mongoose")
require("dotenv").config()
const connectToMongo = async () => {
  const db = process.env.DATABASE
    try {
      await mongoose.connect(db).then(() => {
        console.log("Connected To DB successfully...");
      });
    } catch (error) {
      console.log("Error connecting to DB" , error);
    }
  };
  
  
  connectToMongo();
module.exports = { connectToMongo}