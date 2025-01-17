"use server";

import { CreateDrinkCategoryParams, DeleteDrinkCategoryParams } from "@/types/drinktype";
import { handleError } from "../utils";
import { connectToDatabase } from "../database";
import DrinkCategory from "../database/models/drinkcategory.model";
import Drink from "../database/models/drink.model"; 

export const createDrinkCategory = async ({
  drinkCategoryName,
}: CreateDrinkCategoryParams) => {
  try {
    await connectToDatabase();
    const newDrinkCategory = await DrinkCategory.create({ name: drinkCategoryName });
    return JSON.parse(JSON.stringify(newDrinkCategory));
  } catch (error) {
    handleError(error);
  }
};

export const getAllDrinkCategories = async () => {
  try {
    await connectToDatabase();
    const drinkCategories = await DrinkCategory.find();
    return JSON.parse(JSON.stringify(drinkCategories));
  } catch (error) {
    handleError(error);
  }
};

export const deleteDrinkCategory = async ({ drinkCategoryId }: DeleteDrinkCategoryParams) => {
  try {
    await connectToDatabase();
    const dependentItems = await Drink.find({ drinkCategory: drinkCategoryId });
    if (dependentItems.length > 0) {
      alert("Cannot delete category because it has dependent drink items.");
    }
    const result = await DrinkCategory.deleteOne({ _id: drinkCategoryId });
    if (result.deletedCount === 0) {
      return { success: false, message: "Category not found" };
    }
    return { success: true, message: "Category deleted successfully" };
  } catch (error) {
    handleError(error);
    alert("Error deleting category");
    return { success: false, message: "Error deleting category" };
  }
};
