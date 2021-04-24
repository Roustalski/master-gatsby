import { FluidObject } from "gatsby-image";
import { BodyOrder, PizzaOrder } from "../types/order";
import { Pizza } from "../types/pizza";
import calculatePizzaPrice from "./calculate-pizza-price";
import formatMoney from "./format-money";

export const mapPizzaToBody = (order: PizzaOrder[], pizzaList: Pizza[]) => {
  return order.map((item) => {
    const pizza = pizzaList.find((p) => p.id === item.pizzaId)!;
    return {
      pizzaId: pizza.id,
      name: pizza.name,
      price: formatMoney(calculatePizzaPrice(pizza.price, item.size)),
      size: item.size,
      thumbnail: (pizza.image.asset.fluid as FluidObject).src,
    } as BodyOrder;
  });
};
