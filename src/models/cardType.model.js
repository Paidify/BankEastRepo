import mongoose from "mongoose";
import Counter from "./counter.model.js";

const { Schema, model } = mongoose;

const cardTypeSchema = new Schema({
  card_type_id: { type: Number, unique: true },
  type: { type: String },
});

cardTypeSchema.pre("save", async function (next) {
  this.card_type_id = await Counter.getNextSequence("card_type_id");
  next();
});

export default model("card_type", cardTypeSchema);
