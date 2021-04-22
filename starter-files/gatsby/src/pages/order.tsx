import { graphql, PageProps } from "gatsby";
import Img from "gatsby-image";
import React from "react";
import SEO from "../components/seo";
import MenuItemStyles from "../styles/menu-item-styles";
import OrderStyles from "../styles/order-styles";
import { Pizza } from "../types/pizza";
import calculatePizzaPrice from "../utils/calculate-pizza-price";
import formatMoney from "../utils/format-money";
import useForm from "../utils/useform";

type OrderPageQuery = {
  pizzas: { nodes: Pizza[] };
};

export default function OrderPage({ data }: PageProps<OrderPageQuery>) {
  const { values, updateValue } = useForm({ name: "", email: "" });
  return (
    <>
      <SEO title="Order a Pizza!" />
      <OrderStyles>
        <fieldset>
          <legend>Your info</legend>
          <label htmlFor="name">
            Name
            <input
              type="text"
              name="name"
              id="name"
              value={values.name}
              onChange={updateValue}
            />
          </label>
          <label htmlFor="email">
            Email
            <input
              type="email"
              name="email"
              id="email"
              value={values.email}
              onChange={updateValue}
            />
          </label>
        </fieldset>
        <fieldset className="menu">
          <legend>Menu</legend>
          {data.pizzas.nodes.map((pizza) => {
            return (
              <MenuItemStyles key={pizza.id}>
                <Img fluid={pizza.image.asset.fluid} alt={pizza.name} />
                <div>
                  <h2>{pizza.name}</h2>
                </div>
                <div>
                  {["S", "M", "L"].map((size) => (
                    <button type="button">
                      {size}{" "}
                      {formatMoney(calculatePizzaPrice(pizza.price, size))}
                    </button>
                  ))}
                </div>
              </MenuItemStyles>
            );
          })}
        </fieldset>
        <fieldset className="order">
          <legend>Order</legend>
        </fieldset>
      </OrderStyles>
    </>
  );
}

export const query = graphql`
  query {
    pizzas: allSanityPizza {
      nodes {
        name
        id
        slug {
          current
        }
        price
        image {
          asset {
            fluid(maxWidth: 100) {
              ...GatsbySanityImageFluid
            }
          }
        }
      }
    }
  }
`;
