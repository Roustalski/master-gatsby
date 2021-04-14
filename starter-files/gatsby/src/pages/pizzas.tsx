import { graphql, PageProps } from "gatsby";
import React from "react";
import PizzaList, { Pizza } from "../components/pizza-list";

type PizzasQuery = {
  pizzas: {
    nodes: Pizza[];
  };
};

export default function PizzasPage({ data }: PageProps<PizzasQuery>) {
  const pizzas = data.pizzas.nodes;
  return (
    <>
      {/* <p>{props.path}</p> */}
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
