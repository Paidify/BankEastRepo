import mongoose from "mongoose";

const { Schema, model } = mongoose;

const counterSchema = new Schema(
  { _id: String, seq: Number },
  {
    statics: {
      async getNextSequence(id) {
        const count = await this.findByIdAndUpdate(
          id,
          { $inc: { seq: 1 } },
          { new: true, upsert: true, returnDocument: "after" } // return the updated document - upsert if not found
        );
        return count.seq;
      },
    },
  }
);

export default model("_counter", counterSchema);
