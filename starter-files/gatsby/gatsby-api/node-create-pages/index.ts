import { CreatePagesArgs } from "gatsby";
import { turnPizzasIntoPages } from "./generators/pizza-generator";
import { turnToppingsIntoPages } from "./generators/topping-generator";

 export const createPages = async (params: CreatePagesArgs) => {
  await Promise.all([
    turnPizzasIntoPages(params),
    turnToppingsIntoPages(params),
  ]);
};
