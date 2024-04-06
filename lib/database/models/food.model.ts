import { Document, Schema, models, model, SchemaTypes } from "mongoose";

export interface IFood extends Document {
  _id: string;
  foodName: string;
  description?: string;
  location?: string;
  createdAt: Date;
  imageUrl: string;
  startDateTime: Date;
  endDateTime: Date;
  price: string;
  isFree: boolean;
  url?: string;
  category?: { _id: string; name: string };
}

const FoodSchema = new Schema({
  foodName: { type: String, required: true },
  description: { type: String },
  location: { type: String },
  createdAt: { type: Date, default: Date.now },
  imageUrl: { type: String, required: true },
  startDateTime: { type: Date, default: Date.now },
  endDateTime: { type: Date },
  price: { type: String },
  isFree: { type: Boolean, default: false },
  url: { type: String },
  category: { type: Schema.Types.ObjectId, ref: "Category" },
});

const Food = models.Food || model("Food", FoodSchema);

export default Food;
