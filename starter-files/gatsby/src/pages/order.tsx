import { graphql, PageProps } from "gatsby";
import Img from "gatsby-image";
import React from "react";
import OrderItemList from "../components/order-item-list";
import SEO from "../components/seo";
import MenuItemStyles from "../styles/menu-item-styles";
import OrderStyles from "../styles/order-styles";
import { Pizza } from "../types/pizza";
import getOrderTotal from "../utils/calculate-order-total";
import calculatePizzaPrice from "../utils/calculate-pizza-price";
import formatMoney from "../utils/format-money";
import useForm from "../utils/useform";
import useOrder from "../utils/useOrder";

type OrderPageQuery = {
  pizzas: { nodes: Pizza[] };
};

export default function OrderPage({ data }: PageProps<OrderPageQuery>) {
  const { values, updateValue } = useForm({ name: "", email: "", lastNameFek: "" });
  const {
    order,
    error,
    loading,
    message,
    addToOrder,
    removeFromOrder,
    submitOrder,
  } = useOrder({
    pizzaList: data.pizzas.nodes,
    formValues: values,
  });
  return (
    <>
      <SEO title="Order a Pizza!" />
      <OrderStyles>
        <fieldset disabled={loading}>
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
            <input
              type="text"
              name="lastNameFek"
              id="lastNameFek"
              value={values.lastNameFek}
              onChange={updateValue}
              className="lastNameFek"
            />
          </label>
        </fieldset>
        <fieldset className="menu" disabled={loading}>
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
                    <button
                      key={`sid-${size}`}
                      type="button"
                      onClick={() => addToOrder({ pizzaId: pizza.id, size })}
                    >
                      {size}{" "}
                      {formatMoney(calculatePizzaPrice(pizza.price, size))}
                    </button>
                  ))}
                </div>
              </MenuItemStyles>
            );
          })}
        </fieldset>
        <fieldset className="order" disabled={loading}>
          <legend>Order</legend>
          <OrderItemList
            orderItems={order}
            pizzas={data.pizzas.nodes}
            removeFromOrder={removeFromOrder}
          ></OrderItemList>
        </fieldset>
        <fieldset>
          <h3>
            Your total is{" "}
            {getOrderTotal({ items: order, pizzas: data.pizzas.nodes })}
          </h3>
          <button
            type="submit"
            disabled={loading}
            onClick={(e) => submitOrder(e)}
          >
            {loading ? "Placing Order..." : "Order Ahead"}
          </button>
          {error ?? (
            <div>
              <p>Error: {error}</p>
            </div>
          )}
          {message ?? (
            <div>
              <p>{message}</p>
            </div>
          )}
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
