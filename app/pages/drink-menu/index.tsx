import { getDrinksByCategory } from "@/lib/actions/drink.actions";
import { SearchParamProps, Drink } from "@/types/drinktype";

export const DrinkMenuList = async ({ searchParams }: SearchParamProps) => {
  const category = (searchParams?.category as string) || "";

  try {
    console.log("Category:", category);
    const drinkData = await getDrinksByCategory({ category });

    if (!drinkData || !drinkData.data) {
      throw new Error("Drink data is undefined or null");
    }

    const drinks: Drink[] = drinkData.data;

    const uniqueCategories = Array.from(
      new Set(drinks.map((drink) => drink.category.name))
    );

    const items = uniqueCategories.map((cat, index) => ({
      key: String(index),
      label: cat,
      drinks: drinks.filter((drink) => drink.category.name === cat),
    }));

    return items;
  } catch (error) {
    console.error("Error fetching drink data:", error);
    return []; // Return an empty array in case of error
  }
};
