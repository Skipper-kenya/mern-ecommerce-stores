import express from "express";
import stripePackage from "stripe";


import dataModel from "../models/data.js";

const router = express.Router();

const key = process.env.STRIPE_KEY;

const stripe = stripePackage(key);

router.post("/stripe_items", async (req, res) => {
  const allData = await dataModel.find({});

  const items = await req.body.items;

  try {
    const line_items = await items.map((item) => {
      const storeItem = allData?.find((data) => data.id === item.id);

      return {
        price_data: {
          currency: "usd",
          product_data: {
            name: storeItem.title,
          },
          unit_amount: storeItem.price * 100,
        },
        quantity: item.quantity,
      };
    });
    const session = await stripe.checkout.sessions.create({
      payment_method_types: ["card"],
      mode: "payment",
      line_items,
      success_url: process.env.SUCCESS_URL,
      cancel_url: process.env.CANCEL_URL,
    });

    res.send({ url: session.url });
  } catch (error) {
    console.log(`error at stripe route:${error.message}`);
  }
});

export { router as stripeRouter };
