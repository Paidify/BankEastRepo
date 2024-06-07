import mongoose from "mongoose";
import Counter from "./counter.model.js";

const { Schema, model } = mongoose;

const ownerSchema = new Schema({
  owner_id: { type: Number, unique: true },
  name: { type: String },
  email: { type: String, unique: true },
  DNI: { type: String, unique: true },
});

ownerSchema.pre("save", async function (next) {
  if (this.owner_id === undefined)
    this.owner_id = await Counter.getNextSequence("owner_id");
  next();
});

export default model("owner", ownerSchema);
