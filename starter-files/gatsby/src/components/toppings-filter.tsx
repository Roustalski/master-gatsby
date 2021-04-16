import { graphql, Link, useStaticQuery } from "gatsby";
import React from "react";
import styled from "styled-components";
import { countToppingsOnPizzas } from "../rules/pizzas-by-topping";
import { Pizza } from "../types/pizza";

type ToppingsFilterProps = {
  current?: string;
};

type PizzaQuery = {
  pizzas: { nodes: Pizza[] };
};

const ToppingsStyles = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 1rem;
  margin-bottom: 4rem;
  a {
    display: grid;
    padding: 5px;
    grid-template-columns: auto 1fr;
    gap: 0 1rem;
    align-items: center;
    background: var(--grey);
    border-radius: 2px;
    .count {
      background: white;
      padding: 2px 5px;
    }
    &[aria-current="page"] {
      background: var(--yellow);
    }
  }
`;

const ToppingsFilter = ({ current }: ToppingsFilterProps) => {
  const result = useStaticQuery<PizzaQuery>(graphql`
    query {
      pizzas: allSanityPizza {
        nodes {
          toppings {
            name
            id
          }
        }
      }
    }
  `);

  const pizzas = result.pizzas.nodes;
  const toppingsWithCounts = countToppingsOnPizzas(pizzas);
  return (
    <ToppingsStyles>
      <Link to="/pizzas">
        <span className="name">All</span>
        <span className="count">{pizzas.length}</span>
      </Link>
      {toppingsWithCounts.map((twc) => (
        <Link to={`/topping/${twc.name}`} key={twc.id}>
          <span className="name">{twc.name}</span>
          <span className="count">{twc.onNumPizzas}</span>
        </Link>
      ))}
    </ToppingsStyles>
  );
};

export default ToppingsFilter;
