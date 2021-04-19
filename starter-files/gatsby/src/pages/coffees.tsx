import { graphql, PageProps } from "gatsby";
import React from "react";
import styled from "styled-components";
import { Coffee } from "../types/coffee";

type CoffeesQuery = {
  coffee: { nodes: Coffee[] };
};

const CoffeStyles = styled.div`
  display: grid;
  grid-template-rows: auto 1fr auto;
  & h2 {
    background: var(--yellow);
  }
`;

const CoffeeListStyles = styled.div`
  display: grid;
  grid-template-columns: auto auto;
  gap: 1rem;
`;

export default function CoffeesPage({
  data: {
    coffee: { nodes: coffeeList },
  },
}: PageProps<CoffeesQuery>) {
  console.log(coffeeList);
  return (
    <>
      <h1>Coffee selection</h1>
      <CoffeeListStyles>
        {coffeeList.map((coffee) => (
          <CoffeStyles key={coffee.id}>
            <h2>{coffee.title}</h2>
            <p>{coffee.description}</p>
            <p>{coffee.ingredients.join(", ")}</p>
          </CoffeStyles>
        ))}
      </CoffeeListStyles>
    </>
  );
}

export const query = graphql`
  query MyQuery {
    coffee: allCoffee {
      nodes {
        id
        title
        description
        ingredients
      }
    }
  }
`;
