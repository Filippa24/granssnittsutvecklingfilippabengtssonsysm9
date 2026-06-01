const mongoose = require("mongoose");

//connection till databasen
const connectDB = async () => {
  try {
    const con = await mongoose.connect(process.env.CONNECTION_STRING);
    //skriver ut database connected + hosten + namnet på database (mongodb)
    console.log("Database connected", con.connection.host, con.connection.name);
  } catch (error) {
    console.log("Error:", error.message);
    //hoppar ut ifall vi hamnar här
    process.exit(1);
  }
};

module.exports = connectDB;
