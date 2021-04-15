import path from 'path';

const turnPizzasIntoPages = async ({ graphql, actions }) => {
  // 1. Get a template for this page;
  const pizzaTemplate = path.resolve('./src/templates/pizza-template.tsx');
  // 2. Query all pizzas
  const { data } = await graphql(`
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
  console.clear();
  console.log(JSON.stringify(data));
  // 3. Loop over each pizza and create a page for that pizza
  data.pizzas.nodes.forEach((pizza) => {
    actions.createPage({
      path: `/pizza/${pizza.slug.current}`,
      component: pizzaTemplate,
      context: {
        slug: pizza.slug.current,
      },
    });
  });
};

export const createPages = async (params) => {
  // Create pages dynamically
  // 1. Pizzas
  await turnPizzasIntoPages(params);
  // 2. Toppings
  // 3. Slice Masters
};
