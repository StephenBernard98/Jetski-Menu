import { getFoodsByCategory } from "@/lib/actions/food.actions";
import { SearchParamProps, Food } from "@/types";

export const FoodMenuList = async ({ searchParams }: SearchParamProps) => {
  const category = (searchParams?.category as string) || "";

  try {
    const foodData = await getFoodsByCategory({ category });

    if (!foodData || !foodData.data) {
      throw new Error("Food data is undefined or null");
    }

    const foods: Food[] = foodData.data;

    const uniqueCategories = Array.from(
      new Set(foods.map((food) => food.category.name))
    );

    const items = uniqueCategories.map((cat, index) => ({
      key: String(index),
      label: cat,
      foods: foods.filter((food) => food.category.name === cat),
    }));

    return items;
  } catch (error) {
    console.error("Error fetching food data:", error);
    return []; // Return an empty array in case of error
  }
};
