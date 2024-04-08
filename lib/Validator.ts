import * as z from "zod";

export const foodFormSchema = z.object({
  foodName: z.string().min(3, {
    message: "Food Name must be at least 3 characters.",
  }),
  description: z
    .string()
    .min(10, {
      message: "description must be at least 5 characters.",
    })
    .max(400, {
      message: "description must be less than 400 characters.",
    }),
  imageUrl: z.string(),
  categoryId: z.string(),
  price: z.string(),
  isSpicy: z.boolean(),
});
