import mongoose from "mongoose";

const dataSchema = new mongoose.Schema({
  id: {
    type: Number,
    required: true,
  },
  title: {
    type: String,
    required: true,
  },
  price: {
    type: Number,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
  category: {
    type: String,
    required: true,
  },
  image: {
    type: String,
    required: true,
  },
  rating: {
    type: [
      {
        rate: { type: Number, required: true },
        count: { type: Number, required: true },
      },
    ],
  },
});

const dataModel = mongoose.model("data", dataSchema);

export default dataModel;
