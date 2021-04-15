import { CreatePagesArgs } from "gatsby";
import path from "path";
import { Pizza } from "../../../types/pizza";

const newRoot = path.resolve("./src/gatsby-api/node-create-pages/");

type PizzaQuery = {
  pizzas: { nodes: Pizza[] };
};

const turnPizzasIntoPages = async ({ graphql, actions }: CreatePagesArgs) => {
  // 1. Get a template for this page;
  const pizzaTemplate = path.resolve(newRoot, "./templates/pizza-template.tsx");
  console.log(pizzaTemplate);

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
  // console.log(JSON.stringify(data));

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
