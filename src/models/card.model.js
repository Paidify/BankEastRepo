import mongoose from "mongoose";
import Counter from "./counter.model.js";

const { Schema, model } = mongoose;

const cardSchema = new Schema({
  card_id: { type: Number, unique: true },
  owner: { type: String },
  owner_id: { type: String },
  exp_month: { type: String },
  exp_year: { type: String },
  cvv: { type: String },
  card_franchise_id: { type: Number },
  card_type_id: { type: Number },
  amount: { type: Number },
  card_number: { type: Number, unique: true },
});

cardSchema.pre("save", async function (next) {
  this.card_id = await Counter.getNextSequence("card_id");
  next();
});

export default model("card", cardSchema);
