import { graphql, Link, useStaticQuery } from "gatsby";
import React from "react";
import styled from "styled-components";
import { Pizza } from "../types/pizza";
import { Topping } from "../types/toppings";

type PizzaQuery = {
  pizzas: { nodes: Pizza[] };
};

type ToppingCounts = {
  id: string;
  name: string;
  onNumPizzas: number;
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
    .active {
      background: var(--yellow);
    }
  }
`;

const createNewToppingCount = ({ id, name }: Topping): ToppingCounts => {
  return {
    onNumPizzas: 0,
    id,
    name,
  };
};

const countToppingsOnPizzas = (pizzas: Pizza[]): ToppingCounts[] => {
  const pizzaMap = pizzas
    .map((pizza) => pizza.toppings!)
    .flat()
    .reduce((map, { id, name, vegetarian }) => {
      const tcop =
        map.get(id) || createNewToppingCount({ id, name, vegetarian });
      tcop.onNumPizzas++;
      map.set(id, tcop);
      return map;
    }, new Map<string, ToppingCounts>());
  return [...pizzaMap.values()].sort((a, b) => b.onNumPizzas - a.onNumPizzas);
};

export default () => {
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
      {toppingsWithCounts.map((twc) => (
        <Link to={`/topping/${twc.name}`} key={twc.id}>
          <span className="name">{twc.name}</span>
          <span className="count">{twc.onNumPizzas}</span>
        </Link>
      ))}
    </ToppingsStyles>
  );
};
