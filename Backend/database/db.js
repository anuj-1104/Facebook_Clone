import mongoose from "mongoose";

const database_connect = async () => {
  try {
    await mongoose.connect(process.env.URL_MONGODB);
    console.log("database conneected");
  } catch (error) {
    console.log(error);
  }
};

export default database_connect;
