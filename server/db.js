import mongoose from "mongoose";

const connectDb = async (cb) => {
  try {
    await mongoose.connect(process.env.MONGO_URI).then(() => {
      return cb();
    });
  } catch (e) {
    //
    console.log(`error connecting to db:${e.message}`);
  }
};

export default connectDb;
