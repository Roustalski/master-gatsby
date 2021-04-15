import { CreatePagesArgs } from "gatsby";
import { turnPizzasIntoPages } from "./generators/pizza-generator";

export const createPages = async (params: CreatePagesArgs) => {
  // Create pages dynamically
  // 1. Pizzas
  await turnPizzasIntoPages(params);
  // 2. Toppings
  // 3. Slice Masters
};
