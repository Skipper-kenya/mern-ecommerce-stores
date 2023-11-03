import express from "express";
import dataModel from "../models/data.js";

const router = express.Router();

router.get("/", async (req, res) => {
  try {
    const storeItems = await dataModel.find({});

    res.send({ storeItems });
  } catch (error) {
    console.log(error.message);
  }
});

export { router as dataRouter };
