"use server";
import { revalidatePath } from "next/cache";
import { connectToDatabase } from "@/lib/database";
import Food from "@/lib/database/models/food.model";
import NewFood from "@/lib/database/models/newFood.model";
import User from "@/lib/database/models/user.model";
import Category from "@/lib/database/models/category.model";
import { handleError } from "@/lib/utils";
import {
  CreateFoodParams,
  UpdateFoodParams,
  DeleteFoodParams,
  DeleteNewFoodParams,
  GetAllFoodParams,
  GetRelatedFoodByCategoryParams,
  GetAllFoodCategories,
  NewFoodParams,
  GetAllNewFoodParams,
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

// CREATE NEW FOOD DATABASE
export async function createNewFood({ food, path }: NewFoodParams) { 
  try { 
    await connectToDatabase();
    const findFoodById = await Food.findById(food._id)
    if (!findFoodById) {
      throw new Error("Unauthorized or food not found");
    }
    const newFood = await NewFood.create({
      ...food,
      category: food.categoryId,
    });
     revalidatePath(path);
     return JSON.parse(JSON.stringify(newFood));
  } catch (error) {
     handleError(error);
  }
}


// GET ALL NEW FOOD
export async function getAllNewFood({
  query,
  limit = 6,
  page,
  category,
}: GetAllNewFoodParams) {
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
    const foodQuery = NewFood.find(conditions)
      .sort({ createdAt: "desc" })
      .skip(skipAmount)
      .limit(limit);

    const food = await populateFood(foodQuery);
    const foodCount = await NewFood.countDocuments(conditions);

    return {
      data: JSON.parse(JSON.stringify(food)),
      totalPages: Math.ceil(foodCount / limit),
    };
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

//GET ONE NEW FOOD BY ID
export async function getNewFoodById(foodId: string) {
  try {
    await connectToDatabase();

    const food = await populateFood(NewFood.findById(foodId));

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
    if (!foodToUpdate) {
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


// DELETE NEW FOOD
export async function deleteNewFood({ foodId, path }: DeleteNewFoodParams) {
  try {
    await connectToDatabase();

    const deletedNewFood = await NewFood.findByIdAndDelete(foodId);
    if (deletedNewFood) revalidatePath(path);
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

// GET RELATED FOOD: FOOD WITH THE SAME CATEGORY
export async function getRelatedFoodByCategory({
  categoryId,
  foodId,
  limit = 3,
  page,
}: GetRelatedFoodByCategoryParams) {
  try {
    await connectToDatabase();
    const conditions = {
      $and: [{ category: categoryId }, { _id: { $ne: foodId } }],
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


export async function getFoodsByCategory({
  category,
}: GetAllFoodCategories) {
  try {
    connectToDatabase();

    const categoryCondition = category
      ? await getCategoryByName(category)
      : null;
    const conditions = {
      $and: [categoryCondition ? { category: categoryCondition._id } : {}],
    };

    const foodQuery = Food.find(conditions).sort({ createdAt: "desc" });
    const food = await populateFood(foodQuery);

    return {
      data: JSON.parse(JSON.stringify(food)),
    };
  } catch (error) {}
}

