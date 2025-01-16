import { Document, Schema, models, model, SchemaTypes } from "mongoose";

export interface IFood extends Document {
  _id: string;
  foodName: string;
  description?: string;
  imageUrl: string;
  price: string;
  isNew: boolean;
  category?: { _id: string; name: string };
  organizer?: { _id: string; firstName: string; lastName: string };
}

const NewFoodSchema = new Schema({
  foodName: { type: String, required: true },
  description: { type: String },
  imageUrl: { type: String, required: true },
  price: { type: String },
  isNew: { type: Boolean, default: false },
  category: { type: Schema.Types.ObjectId, ref: "Category" },
  organizer: { type: Schema.Types.ObjectId, ref: "User" },
});

const NewFood = models.NewFood || model("NewFood", NewFoodSchema);

export default NewFood;
