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

// ====== FOOD PARAMS
export type CreateFoodParams = {
  userId: string;
  food: {
    foodName: string;
    description: string;
    imageUrl: string;
    categoryId: string;
    price: string;
    isNew: boolean;
  };
  path: string;
};

export type UpdateFoodParams = {
  userId: string;
  food: {
    _id: string;
    foodName: string;
    imageUrl: string;
    description: string;
    categoryId: string;
    price: string;
    isNew: boolean;
  };
  path: string;
};

export type DeleteFoodParams = {
  foodId: string;
  path: string;
};

export type GetAllFoodParams = {
  query: string;
  category: string;
  limit: number;
  page: number;
};


export type GetAllFoodCategories = {
  category: string;
};


export type GetFoodByUserParams = {
  userId: string;
  limit?: number;
  page: number;
};

export type GetRelatedFoodByCategoryParams = {
  categoryId: string;
  foodId: string;
  limit?: number;
  page: number | string;
};

export type GetFoodByCategoryParams = {
  categoryId: string;
  // query: string
};


export type Food = {
  _id: string;
  foodName: string;
  description: string;
  price: string;
  isNew: boolean;
  imageUrl: string;
  category: {
    _id: string;
    name: string;
  };
};

// ====== CATEGORY PARAMS
export type CreateCategoryParams = {
  categoryName: string;
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

export type GetOrdersByFoodParams = {
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
