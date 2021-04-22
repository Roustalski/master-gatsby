import { graphql, PageProps } from "gatsby";
import React from "react";
import PizzaList from "../components/pizza-list";
import SEO from "../components/seo";
import ToppingsFilter from "../components/toppings-filter";
import { Pizza } from "../types/pizza";

type PizzasQuery = {
  pizzas: {
    nodes: Pizza[];
  };
};

type ToppingContext = {
  topping: string;
};

export default function ToppingPage({
  data,
  pageContext: { topping },
}: PageProps<PizzasQuery, ToppingContext>) {
  const pizzas = data.pizzas.nodes;
  return (
    <>
      <SEO title={`Pizzas With ${topping}`}/>
      <ToppingsFilter current={topping} />
      <PizzaList pizzas={pizzas}></PizzaList>
    </>
  );
}

export const query = graphql`
  query($topping: String!) {
    pizzas: allSanityPizza(
      filter: { toppings: { elemMatch: { name: { eq: $topping } } } }
    ) {
      nodes {
        id
        name
        price
        slug {
          current
        }
        toppings {
          id
          name
          vegetarian
        }
        image {
          asset {
            fluid(maxWidth: 800) {
              ...GatsbySanityImageFluid
            }
          }
        }
      }
    }
  }
`;
