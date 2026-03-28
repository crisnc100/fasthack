import { publicProcedure } from "@/backend/trpc/create-context";
import { Restaurant } from "@/types";
import restaurants from "@/mocks/restaurants";

export default publicProcedure.query(async () => {
  // In a real app, this would fetch from a database
  // For now, we'll use our mock data
  return restaurants;
});