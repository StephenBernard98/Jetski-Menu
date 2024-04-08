"use server";

import { revalidatePath } from "next/cache";

import { connectToDatabase } from "@/lib/database";
import Food from "@/lib/database/models/food.model";
import User from "@/lib/database/models/user.model";
import Category from "@/lib/database/models/category.model";
import { handleError } from "@/lib/utils";

import {
  CreateFoodParams,
  UpdateFoodParams,
  DeleteFoodParams,
  GetAllFoodParams,
  GetFoodByUserParams,
  GetRelatedFoodByCategoryParams,
} from "@/types";

const getCategoryByName = async (name: string) => {
  return Category.findOne({ name: { $regex: name, $options: "i" } });
};

const populateFood = (query: any) => {
  return query
    .populate({
      path: "organizer",
      model: User,
      select: "_id firstName lastName",
    })
    .populate({ path: "category", model: Category, select: "_id name" });
};

// ADD
export async function createFood({ userId, food, path }: CreateFoodParams) {
  try {
    await connectToDatabase();



    const newFood = await Food.create({
      ...food,
      category: food.categoryId,
      organizer: userId,
    });
    revalidatePath(path);

    return JSON.parse(JSON.stringify(newFood));
  } catch (error) {
    handleError(error);
  }
}

// GET ONE FOOD BY ID
export async function getFoodById(foodId: string) {
  try {
    await connectToDatabase();

    const food = await populateFood(Food.findById(foodId));

    if (!food) throw new Error("Food not found");

    return JSON.parse(JSON.stringify(food));
  } catch (error) {
    handleError(error);
  }
}

// UPDATE
export async function updateFood({ userId, food, path }: UpdateFoodParams) {
  try {
    await connectToDatabase();

    const foodToUpdate = await Food.findById(food._id);
    if (!foodToUpdate || foodToUpdate.organizer.toHexString() !== userId) {
      throw new Error("Unauthorized or food not found");
    }

    const updatedFood = await Food.findByIdAndUpdate(
      food._id,
      { ...food, category: food.categoryId },
      { new: true }
    );
    revalidatePath(path);

    return JSON.parse(JSON.stringify(updatedFood));
  } catch (error) {
    handleError(error);
  }
}

// DELETE
export async function deleteFood({ foodId, path }: DeleteFoodParams) {
  try {
    await connectToDatabase();

    const deletedFood = await Food.findByIdAndDelete(foodId);
    if (deletedFood) revalidatePath(path);
  } catch (error) {
    handleError(error);
  }
}

// GET ALL FOODS
export async function getAllFood({
  query,
  limit = 6,
  page,
  category,
}: GetAllFoodParams) {
  try {
    await connectToDatabase();

    const nameCondition = query
      ? { foodName: { $regex: query, $options: "i" } }
      : {};
    const categoryCondition = category
      ? await getCategoryByName(category)
      : null;
    const conditions = {
      $and: [
        nameCondition,
        categoryCondition ? { category: categoryCondition._id } : {},
      ],
    };

    const skipAmount = (Number(page) - 1) * limit;
    const foodQuery = Food.find(conditions)
      .sort({ createdAt: "desc" })
      .skip(skipAmount)
      .limit(limit);

    const food = await populateFood(foodQuery);
    const foodCount = await Food.countDocuments(conditions);

    return {
      data: JSON.parse(JSON.stringify(food)),
      totalPages: Math.ceil(foodCount / limit),
    };
  } catch (error) {
    handleError(error);
  }
}

// // GET EVENTS BY ORGANIZER
// export async function getEventsByUser({
//   userId,
//   limit = 6,
//   page,
// }: GetFoodByUserParams) {
//   try {
//     await connectToDatabase();

//     const conditions = { organizer: userId };
//     const skipAmount = (page - 1) * limit;

//     const foodQuery = Food.find(conditions)
//       .sort({ createdAt: "desc" })
//       .skip(skipAmount)
//       .limit(limit);

//     const food = await populateFood(foodQuery);
//     const foodCount = await Food.countDocuments(conditions);

//     return {
//       data: JSON.parse(JSON.stringify(food)),
//       totalPages: Math.ceil(foodCount / limit),
//     };
//   } catch (error) {
//     handleError(error);
//   }
// }

// GET RELATED FOOD: FOOD WITH THE SAME CATEGORY
export async function getRelatedFoodByCategory({
  categoryId,
  foodId,
  limit = 3,
  page = 1,
}: GetRelatedFoodByCategoryParams) {
  try {
    await connectToDatabase();

    const skipAmount = (Number(page) - 1) * limit;
    const conditions = {
      $and: [{ category: categoryId }, { _id: { $ne: foodId } }],
    };

    const foodQuery = Food.find(conditions)
      .sort({ createdAt: "desc" })
      .skip(skipAmount)
      .limit(limit);

    const food = await populateFood(foodQuery);
    const foodCount = await Food.countDocuments(conditions);

    return {
      data: JSON.parse(JSON.stringify(food)),
      totalPages: Math.ceil(foodCount / limit),
    };
  } catch (error) {
    handleError(error);
  }
}