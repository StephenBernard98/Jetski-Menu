import { getFoodsByCategory } from "@/lib/actions/food.actions";
import { SearchParamProps, Food } from "@/types";

export const FoodMenuList = async ({ searchParams }: SearchParamProps) => {
  const category = (searchParams?.category as string) || "";
  const foodData = await getFoodsByCategory({ category });
  const foods: Food[] = foodData?.data || [];

  // Initialize an array to store the unique category names
  const uniqueCategories = Array.from(
    new Set(foods.map((food) => food.category.name))
  );

  // Initialize an object to store food items under their respective categories
  const items = uniqueCategories.map((cat, index) => ({
    key: String(index),
    label: cat,
    foods: foods.filter((food) => food.category.name === cat),
  }));
  return items;
};
