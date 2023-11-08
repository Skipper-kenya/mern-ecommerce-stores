//libraries and dep's
import express from "express";
import cors from "cors";
import "dotenv/config.js";

//local imports
import connectDb from "./db.js";
import { dataRouter } from "./router/data.js";
import { AuthRoute } from "./router/users.js";
import { stripeRouter } from "./router/stripe.js";

//setting up the server
const server = express();

//middlewares
server.use(express.json());
server.use(
  cors({
    origin: process.env.CORS_ORIGIN,
    methods: "GET,POST,PUT,DELETE",
    allowedHeaders: "Content-Type,Authorization",
    credentials: true,
  })
);
server.use("/get_data", dataRouter);
server.use("/auth", AuthRoute);
server.use("/stripe", stripeRouter);
//port listening

const port = process.env.PORT_URL;

connectDb(() => {
  server.listen(port, console.log(`listening at port ${port}`));
});
