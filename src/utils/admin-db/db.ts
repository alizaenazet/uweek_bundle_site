import mongoose from "mongoose";

const uri = 'mongodb+srv://admin:Admin49D4237@cluster0.coy8ib1.mongodb.net/orders?retryWrites=true&w=majority'
// import mongoose from "mongoose";
// import 'dotenv/config'
export async function dbConnect() {
  try {
    await mongoose.connect(uri)
    console.log("db connected")
  } catch (error) {
    console.log(error);
    throw new Error("db connection fail")
  }
}

async function dbDisconnect() {
  try {
    await mongoose.disconnect()
    console.log("db disconnected")
  } catch (error) {
    console.log(error);
    throw new Error("db connection fail")
  }
}

// dbConnect()

module.exports = {dbConnect, dbDisconnect}


