import { CreatePagesArgs } from "gatsby";
import { turnPizzasIntoPages } from "./generators/pizza-generator";
import { createSlicemasterIndividualPages } from "./generators/slicemaster-individual-generator";
import { createSlicemasterPaginationPages } from "./generators/slicemaster-pagination-generator";
import { turnToppingsIntoPages } from "./generators/topping-generator";

export const createPages = async (params: CreatePagesArgs) => {
  try {
    await Promise.all([
      turnPizzasIntoPages(params),
      turnToppingsIntoPages(params),
      createSlicemasterPaginationPages(params),
      createSlicemasterIndividualPages(params),
    ]);
  } catch (e) {
    console.error(e);
    throw e;
  }
};
