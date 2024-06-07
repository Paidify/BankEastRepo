import mongoose from "mongoose";
import Counter from "./counter.model.js";

const { Schema, model } = mongoose;

const cardFranchiseSchema = new Schema({
  card_franchise_id: { type: Number, unique: true },
  franchise: { type: String },
});

cardFranchiseSchema.pre("save", async function (next) {
  if (this.card_franchise_id === undefined)
    this.card_franchise_id = await Counter.getNextSequence("card_franchise_id");
  next();
});

export default model("card_franchise", cardFranchiseSchema);
