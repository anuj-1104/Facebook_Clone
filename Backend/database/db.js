import mongoose from "mongoose";

//check the url find or not
const database_connect = async () => {

  if (!process.env.URL_MONGODB) {
    throw new Error("MONGO_URI missing");
  }

  return await mongoose.connect(process.env.URL_MONGODB);
};

export default database_connect;
