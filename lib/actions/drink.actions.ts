"use server";
import { revalidatePath } from "next/cache";
import { connectToDatabase } from "@/lib/database";
import Drink from "@/lib/database/models/drink.model";
import NewDrink from "@/lib/database/models/newDrink.model";
import User from "@/lib/database/models/user.model";
import DrinkCategory from "@/lib/database/models/drinkcategory.model";
import { handleError } from "@/lib/utils";
import {
  CreateDrinkParams,
  UpdateDrinkParams,
  DeleteDrinkParams,
  DeleteNewDrinkParams,
  GetAllDrinkParams,
  GetRelatedDrinkByCategoryParams,
  GetAllDrinkCategories,
  NewDrinkParams,
  GetAllNewDrinkParams,
} from "@/types/drinktype";

const getCategoryByName = async (name: string) => {
  return DrinkCategory.findOne({ name: { $regex: name, $options: "i" } });
};

const populateDrink = (query: any) => {
  return query
    .populate({
      path: "organizer",
      model: User,
      select: "_id firstName lastName",
    })
    .populate({ path: "category", model: DrinkCategory, select: "_id name" });
};

// ADD
export async function createDrink({ userId, drink, path }: CreateDrinkParams) {
  try {
    await connectToDatabase();

    const newDrink = await Drink.create({
      ...drink,
      category: drink.categoryId,
      organizer: userId,
    });
    revalidatePath(path);

    return JSON.parse(JSON.stringify(newDrink));
  } catch (error) {
    handleError(error);
  }
}

// CREATE NEW DRINK DATABASE
export async function createNewDrink({ drink, path }: NewDrinkParams) {
  try {
    await connectToDatabase();
    const findDrinkById = await Drink.findById(drink._id);
    if (!findDrinkById) {
      throw new Error("Unauthorized or drink not found");
    }
    const newDrink = await NewDrink.create({
      ...drink,
      category: drink.categoryId,
    });
    revalidatePath(path);
    return JSON.parse(JSON.stringify(newDrink));
  } catch (error) {
    handleError(error);
  }
}

// GET ALL NEW DRINK
export async function getAllNewDrink({
  query,
  limit = 6,
  page,
  category,
}: GetAllNewDrinkParams) {
  try {
    await connectToDatabase();

    const nameCondition = query
      ? { drinkName: { $regex: query, $options: "i" } }
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
    const drinkQuery = NewDrink.find(conditions)
      .sort({ createdAt: "desc" })
      .skip(skipAmount)
      .limit(limit);

    const drink = await populateDrink(drinkQuery);
    const drinkount = await NewDrink.countDocuments(conditions);

    return {
      data: JSON.parse(JSON.stringify(drink)),
      totalPages: Math.ceil(drinkount / limit),
    };
  } catch (error) {
    handleError(error);
  }
}

// GET ONE DRINK BY ID
export async function getDrinkById(drinkId: string) {
  try {
    await connectToDatabase();

    const drink = await populateDrink(Drink.findById(drinkId));

    if (!drink) throw new Error("Drink not found");

    return JSON.parse(JSON.stringify(drink));
  } catch (error) {
    handleError(error);
  }
}

//GET ONE NEW DRINK BY ID
export async function getNewDrinkById(drinkId: string) {
  try {
    await connectToDatabase();

    const drink = await populateDrink(NewDrink.findById(drinkId));

    if (!drink) throw new Error("Drink not found");

    return JSON.parse(JSON.stringify(drink));
  } catch (error) {
    handleError(error);
  }
}

// UPDATE
export async function updateDrink({ userId, drink, path }: UpdateDrinkParams) {
  try {
    await connectToDatabase();

    const drinkToUpdate = await Drink.findById(drink._id);
    if (!drinkToUpdate) {
      throw new Error("Unauthorized or drink not found");
    }

    const updatedDrink = await Drink.findByIdAndUpdate(
      drink._id,
      { ...drink, category: drink.categoryId },
      { new: true }
    );
    revalidatePath(path);

    return JSON.parse(JSON.stringify(updatedDrink));
  } catch (error) {
    handleError(error);
  }
}

// DELETE
export async function deleteDrink({ drinkId, path }: DeleteDrinkParams) {
  try {
    await connectToDatabase();

    const deletedDrink = await Drink.findByIdAndDelete(drinkId);
    if (deletedDrink) revalidatePath(path);
  } catch (error) {
    handleError(error);
  }
}

// DELETE NEW DRINK
export async function deleteNewDrink({ drinkId, path }: DeleteNewDrinkParams) {
  try {
    await connectToDatabase();

    const deletedNewDrink = await NewDrink.findByIdAndDelete(drinkId);
    if (deletedNewDrink) revalidatePath(path);
  } catch (error) {
    handleError(error);
  }
}

// GET ALL DRINKS
export async function getAllDrinks({
  query,
  limit = 6,
  page,
  category,
}: GetAllDrinkParams) {
  try {
    await connectToDatabase();

    const nameCondition = query
      ? { drinkName: { $regex: query, $options: "i" } }
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
    const drinkQuery = Drink.find(conditions)
      .sort({ createdAt: "desc" })
      .skip(skipAmount)
      .limit(limit);

    const drink = await populateDrink(drinkQuery);
    const drinkCount = await Drink.countDocuments(conditions);

    return {
      data: JSON.parse(JSON.stringify(drink)),
      totalPages: Math.ceil(drinkCount / limit),
    };
  } catch (error) {
    handleError(error);
  }
}

// GET RELATED DRINK: DRINK WITH THE SAME CATEGORY
export async function getRelatedDrinkByCategory({
  categoryId,
  drinkId,
  limit = 3,
  page,
}: GetRelatedDrinkByCategoryParams) {
  try {
    await connectToDatabase();
    const conditions = {
      $and: [{ category: categoryId }, { _id: { $ne: drinkId } }],
    };

    const skipAmount = (Number(page) - 1) * limit;
    const drinkQuery = Drink.find(conditions)
      .sort({ createdAt: "desc" })
      .skip(skipAmount)
      .limit(limit);

    const drink = await populateDrink(drinkQuery);
    const drinkCount = await Drink.countDocuments(conditions);

    return {
      data: JSON.parse(JSON.stringify(drink)),
      totalPages: Math.ceil(drinkCount / limit),
    };
  } catch (error) {
    handleError(error);
  }
}

export async function getDrinksByCategory({ category }: GetAllDrinkCategories) {
  try {
    connectToDatabase();

    const categoryCondition = category
      ? await getCategoryByName(category)
      : null;
    const conditions = {
      $and: [categoryCondition ? { category: categoryCondition._id } : {}],
    };

    const drinkQuery = Drink.find(conditions).sort({ createdAt: "desc" });
    const drink = await populateDrink(drinkQuery);

    return {
      data: JSON.parse(JSON.stringify(drink)),
    };
  } catch (error) {}
}
