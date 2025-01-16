// "use server";

// import { CreateCategoryParams, DeleteCategoryParams } from "@/types";
// import { handleError } from "../utils";
// import { connectToDatabase } from "../database";
// import Category from "../database/models/category.model";

// export const createCategory = async ({
//   categoryName,
// }: CreateCategoryParams) => {
//   try {
//     await connectToDatabase();

//     const newCategory = await Category.create({ name: categoryName });

//     return JSON.parse(JSON.stringify(newCategory));
//   } catch (error) {
//     handleError(error);
//   }
// };

// export const getAllCategories = async () => {
//   try {
//     await connectToDatabase();

//     const categories = await Category.find();

//     return JSON.parse(JSON.stringify(categories));
//   } catch (error) {
//     handleError(error);
//   }
// };

// export const deleteCategory = async ({
//   categoryName,
// }: DeleteCategoryParams) => {
//   try {
//     await connectToDatabase();

//     const deleteCategory = await Category.deleteOne({ name: categoryName });

//     return JSON.parse(JSON.stringify(deleteCategory));
//   } catch (error) {
//     handleError(error);
//   }
// };

"use server";

import { CreateCategoryParams, DeleteCategoryParams } from "@/types";
import { handleError } from "../utils";
import { connectToDatabase } from "../database";
import Category from "../database/models/category.model";
import Food from "../database/models/food.model"; // Assuming Food is the collection referencing Category

export const createCategory = async ({
  categoryName,
}: CreateCategoryParams) => {
  try {
    await connectToDatabase();
    const newCategory = await Category.create({ name: categoryName });
    return JSON.parse(JSON.stringify(newCategory));
  } catch (error) {
    handleError(error);
  }
};

export const getAllCategories = async () => {
  try {
    await connectToDatabase();
    const categories = await Category.find();
    return JSON.parse(JSON.stringify(categories));
  } catch (error) {
    handleError(error);
  }
};

export const deleteCategory = async ({
  categoryId,
}: DeleteCategoryParams) => {
  try {
    await connectToDatabase();
    const dependentItems = await Food.find({ category: categoryId });
    if (dependentItems.length > 0) {
      alert("Cannot delete category because it has dependent food items.");
    }
    const result = await Category.deleteOne({ _id: categoryId });
    if (result.deletedCount === 0) {
      return { success: false, message: "Category not found" };
    }
    return { success: true, message: "Category deleted successfully" };
  } catch (error) {
    handleError(error);
    alert("Error deleting category")
    return { success: false, message: "Error deleting category" };
  }
};
