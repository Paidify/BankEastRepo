import express from "express";
import cors from "cors";
import "dotenv/config";
import { connect } from "./src/configs/db.config.js";

const app = express();

import paymentRoute from "./src/routes/payment.route.js";
import defaRoute from "./src/routes/default.route.js";
import balanceRoute from "./src/routes/balance.route.js";
import validCardRoute from "./src/routes/validCard.route.js";

import createRoute from "./src/routes/create.route.js";
import cardRoute from "./src/routes/card.route.js";

if (process.env.TERMINAL_TITLE) {
  process.title = process.env.TERMINAL_TITLE;
}

//Middlewares
app.use(cors());
app.use(express.json());
app.set("json spaces", 2);

app.use("/", defaRoute);
app.use("/makepay", paymentRoute);
app.use("/checkbalance", balanceRoute);
app.use("/checkvalidcard", validCardRoute);

app.use("/createUserBank", createRoute);
app.use("/createCard", cardRoute);

connect();

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log("Server on port", PORT);
});
