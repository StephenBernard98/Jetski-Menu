// ====== USER PARAMS
export type CreateUserParams = {
  clerkId: string;
  firstName: string;
  lastName: string;
  username: string;
  email: string;
  photo: string;
};

export type UpdateUserParams = {
  firstName: string;
  lastName: string;
  username: string;
  photo: string;
};

// ====== DRINK PARAMS
export type CreateDrinkParams = {
  userId: string;
  drink: {
    drinkName: string;
    description: string;
    imageUrl: string;
    categoryId: string;
    price: string;
    isNew: boolean;
  };
  path: string;
};

export type UpdateDrinkParams = {
  userId: string;
  drink: {
    _id: string;
    drinkName: string;
    imageUrl: string;
    description: string;
    categoryId: string;
    price: string;
    isNew: boolean;
  };
  path: string;
};

export type NewDrinkParams = {
  drink: {
    _id?: string;
    drinkName: string;
    imageUrl: string;
    description: string;
    categoryId: string;
    price: string;
    isNew: boolean;
  };
  // isNew: boolean;
  path: string;
};

export type DeleteDrinkParams = {
  drinkId: string;
  path: string;
};

export type DeleteNewDrinkParams = {
  drinkId: string;
  path: string;
};

export type GetAllDrinkParams = {
  query: string;
  category: string;
  limit: number;
  page: number;
};

export type GetAllDrinkCategories = {
  category: string;
};

export type GetAllNewDrinkParams = {
  query: string;
  category: string;
  limit: number;
  page: number;
};

export type GetDrinkByUserParams = {
  userId: string;
  limit?: number;
  page: number;
};

export type GetRelatedDrinkByCategoryParams = {
  categoryId: string;
  drinkId: string;
  limit?: number;
  page: number | string;
};

export type GetDrinkByCategoryParams = {
  categoryId: string;
  // query: string
};

export type Drink = {
  _id: string;
  drinkName: string;
  description: string;
  price: string;
  isNew: boolean;
  imageUrl: string;
  category: {
    _id: string;
    name: string;
  };
};

// ====== DRINK CATEGORY PARAMS
export type CreateDrinkCategoryParams = {
  drinkCategoryName: string;
};

export type DeleteDrinkCategoryParams = {
  // categoryName: string;
  drinkCategoryId: string;
};

// ====== ORDER PARAMS
export type CheckoutOrderParams = {
  eventTitle: string;
  foodId: string;
  price: string;
  isNew: boolean;
  buyerId: string;
};

export type CreateOrderParams = {
  stripeId: string;
  foodId: string;
  buyerId: string;
  totalAmount: string;
};

export type GetOrdersByDrinkParams = {
  foodId: string;
  searchString: string;
};

export type GetOrdersByUserParams = {
  userId: string | null;
  limit?: number;
  page: string | number | null;
};

// ====== URL QUERY PARAMS
export type UrlQueryParams = {
  params: string;
  key: string;
  value: string | null;
};

export type RemoveUrlQueryParams = {
  params: string;
  keysToRemove: string[];
};

export type SearchParamProps = {
  params: { id: string };
  searchParams: { [key: string]: string | string[] | undefined };
};

export type SearchProps = {
  categoryId: string;
};
