import { PizzaOrder } from "../types/order";
import { Pizza } from "../types/pizza";
import calculatePizzaPrice from "./calculate-pizza-price";
import formatMoney from "./format-money";

export type Order = {
  items: PizzaOrder[];
  pizzas: Pizza[];
};

const calculateOrderTotal = ({ items, pizzas }: Order) => {
  return items
    .map((item) => {
      const pizza = pizzas.find((p) => p.id === item.pizzaId);
      return calculatePizzaPrice(pizza?.price!, item.size);
    })
    .reduce((pv, cv) => {
      return pv + cv;
    }, 0);
};

const getOrderTotal = (order: Order) => {
  return formatMoney(calculateOrderTotal(order));
};

export default getOrderTotal;
