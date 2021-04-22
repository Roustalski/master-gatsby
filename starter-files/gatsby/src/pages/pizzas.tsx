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

export default function PizzasPage({ data }: PageProps<PizzasQuery>) {
  const pizzas = data.pizzas.nodes;
  return (
    <>
      <SEO title="All Pizzas"/>
      <ToppingsFilter />
      <PizzaList pizzas={pizzas}></PizzaList>
    </>
  );
}

export const query = graphql`
  query {
    pizzas: allSanityPizza {
      nodes {
        name
        id
        price
        slug {
          current
        }
        toppings {
          id
          name
        }
        image {
          asset {
            fixed(width: 200, height: 200) {
              ...GatsbySanityImageFixed
            }
            fluid(maxWidth: 400) {
              ...GatsbySanityImageFluid
            }
          }
        }
      }
    }
  }
`;
