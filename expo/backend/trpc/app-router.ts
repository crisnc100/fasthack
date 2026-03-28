import { createTRPCRouter } from "./create-context";
import hiRoute from "./routes/example/hi/route";
import getMeals from "./routes/meals/getMeals";
import getRestaurants from "./routes/restaurants/getRestaurants";

export const appRouter = createTRPCRouter({
  example: createTRPCRouter({
    hi: hiRoute,
  }),
  meals: createTRPCRouter({
    getAll: getMeals,
  }),
  restaurants: createTRPCRouter({
    getAll: getRestaurants,
  }),
});

export type AppRouter = typeof appRouter;