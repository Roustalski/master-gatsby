import Img from "gatsby-image";
import React from "react";
import MenuItemStyles from "../styles/menu-item-styles";
import { Pizza } from "../types/pizza";
import calculatePizzaPrice from "../utils/calculate-pizza-price";
import formatMoney from "../utils/format-money";
import { IRemoveFromOrder, PizzaOrder } from "../utils/useOrder";

export type OrderItemListProps = {
  orderItems: PizzaOrder[];
  pizzas: Pizza[];
  removeFromOrder: IRemoveFromOrder;
};

const orderItemList = (props: OrderItemListProps) => {
  return (
    <>
      {props.orderItems.map((orderItem, idx) => {
        const pizza = props.pizzas.find((p) => p.id === orderItem.pizzaId);
        return (
          <MenuItemStyles>
            <Img fluid={pizza?.image.asset.fluid!}></Img>
            <h2>{pizza?.name}</h2>
            <p>
              <span>Size: {orderItem.size}</span>
              <p>
                {formatMoney(
                  calculatePizzaPrice(pizza?.price!, orderItem.size)
                )}
              </p>
            </p>
            <button
              type="button"
              className="remove"
              title={`Remove ${orderItem.size} ${pizza?.name} from Order`}
              onClick={() => props.removeFromOrder(idx)}
            >
              &times;
            </button>
          </MenuItemStyles>
        );
      })}
    </>
  );
};

export default orderItemList;
