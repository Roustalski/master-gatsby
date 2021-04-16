import { CreatePagesArgs } from "gatsby";
import path from "path";
import { Pizza } from "../../../src/types/pizza";

type PizzaQuery = {
  pizzas: { nodes: Pizza[] };
};

const turnPizzasIntoPages = async ({ graphql, actions }: CreatePagesArgs) => {
  // 1. Get a template for this page;
  const pizzaTemplate = path.resolve("./src/templates/pizza-template.tsx");
  
  // 2. Query all pizzas
  const { data } = await graphql<PizzaQuery>(`
    query {
      pizzas: allSanityPizza {
        nodes {
          name
          slug {
            current
          }
        }
      }
    }
  `);

  // 3. Loop over each pizza and create a page for that pizza
  data!.pizzas.nodes.forEach((pizza) => {
    actions.createPage({
      path: `/pizza/${pizza.slug!.current}`,
      component: pizzaTemplate,
      context: {
        slug: pizza.slug!.current,
      },
    });
  });
};

export { turnPizzasIntoPages };
