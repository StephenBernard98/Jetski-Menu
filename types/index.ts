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
    location: string;
    imageUrl: string;
    createdAt: Date;
    startDateTime: Date;
    endDateTime: Date;
    categoryId: string;
    price: string;
    isFree: boolean;
    url: string;
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
    location: string;
    startDateTime: Date;
    endDateTime: Date;
    createdAt: Date;
    categoryId: string;
    price: string;
    isFree: boolean;
    url: string;
  };
  path: string;
};

export type DeleteFoodParams = {
  eventId: string;
  path: string;
};

export type GetAllFoodParams = {
  query: string;
  category: string;
  limit: number;
  page: number;
};

export type GetFoodByUserParams = {
  userId: string;
  limit?: number;
  page: number;
};

export type GetRelatedFoodByCategoryParams = {
  categoryId: string;
  eventId: string;
  limit?: number;
  page: number | string;
};

export type Food = {
  _id: string;
  foodName: string;
  description: string;
  price: string;
  isFree: boolean;
  imageUrl: string;
  location: string;
  startDateTime: Date;
  endDateTime: Date;
  createdAt: Date;
  url: string;
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
  eventId: string;
  price: string;
  isFree: boolean;
  buyerId: string;
};

export type CreateOrderParams = {
  stripeId: string;
  eventId: string;
  buyerId: string;
  totalAmount: string;
  createdAt: Date;
};

export type GetOrdersByFoodParams = {
  eventId: string;
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
