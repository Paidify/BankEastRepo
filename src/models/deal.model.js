import mongoose from "mongoose";
import Counter from "./counter.model.js";

const { Schema, model } = mongoose;

const dealSchema = new Schema({
  deal_id: { type: Number, unique: true },
  reference_number: { type: String, unique: true },
  successful: { type: Boolean },
  effective_date: { type: Date, default: new Date() },
  amount: { type: Number },
  balance: { type: Number },
  dues_number: { type: Number },
  fulfilled: { type: Boolean },
});

dealSchema.pre("save", async function (next) {
  this.deal_id = await Counter.getNextSequence("deal_id");
  next();
});

export default model("deal", dealSchema);
