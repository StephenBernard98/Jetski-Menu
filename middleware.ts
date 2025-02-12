import { authMiddleware } from "@clerk/nextjs";

export default authMiddleware({
  publicRoutes: [
    "/",
    "/dashboard/food/:id",
    "/pages/food-menu",
    "/pages/food-menu/new-food",
    "/dashboard/drink/:id",
    "/pages/drink-menu",
    "/pages/drink-menu/new-drink",
    "/api/webhook/clerk",
    "/api/uploadthing",
  ],
  ignoredRoutes: ["/api/webhook/clerk", "/api/uploadthing"],
});

export const config = {
  matcher: ["/((?!.+\\.[\\w]+$|_next).*)", "/", "/(api|trpc)(.*)"],
};
