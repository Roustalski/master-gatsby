import { CreatePagesArgs } from "gatsby";
import path from "path";
import { Topping } from "../../../../src/types/toppings";

type ToppingQuery = {
  toppings: { nodes: Topping[] };
};

const turnToppingsIntoPages = async ({ graphql, actions }: CreatePagesArgs) => {
  // 1. Get a template for this page
  const toppingTemplate = path.resolve("./src/templates/topping-template.tsx");

  // 2. Query all toppings
  const { data } = await graphql<ToppingQuery>(`
    query {
      toppings: allSanityTopping {
        nodes {
          name
          id
        }
      }
    }
  `);

  // 3. Loop over each topping and create a page for that topping
  data!.toppings.nodes.forEach((topping) => {
    actions.createPage({
      path: `/topping/${topping.name}`,
      component: toppingTemplate,
      context: {
        topping: topping.name,
      },
    });
  });
};

export { turnToppingsIntoPages };
