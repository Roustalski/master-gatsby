import { graphql, Link, useStaticQuery } from "gatsby";
import React from "react";
import styled from "styled-components";
import { Topping } from "../types/toppings";
import { Pizza } from "./pizza-list";

type ToppingQuery = {
  toppings: { nodes: Topping[] };
  pizzas: { nodes: Pizza[] };
};

type ToppingCountOnPizzas = {
  id: string;
  name: string;
  count: number;
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

const createNewToppingCount = ({ id, name }: Topping): ToppingCountOnPizzas => {
  return {
    count: 0,
    id,
    name,
  };
};

const countToppingsOnPizzas = (pizzas: Pizza[]): ToppingCountOnPizzas[] => {
  const map = pizzas
    .map((pizza) => pizza.toppings!)
    .flat()
    .reduce((map, { id, name, vegetarian }) => {
      const tcop =
        map.get(id) || createNewToppingCount({ id, name, vegetarian });
      tcop.count++;
      map.set(id, tcop);
      return map;
    }, new Map<string, ToppingCountOnPizzas>());
  return [...map.values()].sort((a, b) => b.count - a.count);
};

export default () => {
  const result = useStaticQuery<ToppingQuery>(graphql`
    query {
      toppings: allSanityTopping {
        nodes {
          name
          id
          vegetarian
        }
      }
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
  const toppings = result.toppings.nodes;
  console.clear();
  const toppingsWithCounts = countToppingsOnPizzas(pizzas);
  console.log(toppingsWithCounts);
  return (
    <ToppingsStyles>
      {toppingsWithCounts.map((twc) => 
        <Link to={`/topping/${twc.name}`} key={twc.id}>
          <span className="name">{twc.name}</span>
          <span className="count">{twc.count}</span>
        </Link>
      )}
    </ToppingsStyles>
  );
};
