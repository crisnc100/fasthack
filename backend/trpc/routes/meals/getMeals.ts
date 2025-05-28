import { publicProcedure } from "@/backend/trpc/create-context";
import { Meal } from "@/types";
import meals from "@/mocks/meals";

export default publicProcedure.query(async () => {
  // In a real app, this would fetch from a database
  // For now, we'll use our mock data
  return meals;
});