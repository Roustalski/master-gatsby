import { Pizza } from "../types/pizza";
import { Topping } from "../types/toppings";

export type ToppingCounts = {
  id: string;
  name: string;
  onNumPizzas: number;
};

const createNewToppingCount = ({ id, name }: Topping): ToppingCounts => {
  return {
    onNumPizzas: 0,
    id,
    name,
  };
};

export const countToppingsOnPizzas = (pizzas: Pizza[]): ToppingCounts[] => {
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
