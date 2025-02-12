import { Document, Schema, models, model, SchemaTypes } from "mongoose";

export interface IDRINK extends Document {
  _id: string;
  drinkName: string;
  description?: string;
  imageUrl: string;
  price: string;
  isNew: boolean;
  category?: { _id: string; name: string };
  organizer?: { _id: string; firstName: string; lastName: string };
}

const NewDrinkSchema = new Schema({
  drinkName: { type: String, required: true },
  description: { type: String },
  imageUrl: { type: String, required: true },
  price: { type: String },
  isNew: { type: Boolean, default: false },
  category: { type: Schema.Types.ObjectId, ref: "Category" },
  organizer: { type: Schema.Types.ObjectId, ref: "User" },
});

const NewDrink = models.NewDrink || model("NewDrink", NewDrinkSchema);

export default NewDrink;
