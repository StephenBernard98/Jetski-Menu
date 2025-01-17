import { Schema, Document, models, model } from "mongoose";

export interface IDrinkCategory extends Document {
  _id: string;
  name: string;
}

const DrinkCategorySchema = new Schema({
  name: { type: String, unique: true, required: true },
});

const DrinkCategory = models.DrinkCategory || model("DrinkCategory", DrinkCategorySchema);

export default DrinkCategory;
