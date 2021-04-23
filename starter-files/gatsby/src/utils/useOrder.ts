import { useState } from "react";
import DynamicForm from "../types/dynamic-form";
import { Pizza } from "../types/pizza";

export type OrderProps = {
  pizzaList: Pizza[];
  formValues: DynamicForm;
};

export type PizzaOrder = {
  pizzaId: string;
  size: string;
};

export interface IRemoveFromOrder {
  (idx: number): void;
}

const useOrder = (props: OrderProps) => {
  // 1. Create some state to hold our order
  const [order, setOrder] = useState<PizzaOrder[]>([]);

  // 2. Function to add things to order
  function addToOrder(orderedPizza: PizzaOrder) {
    setOrder([...order, orderedPizza]);
  }
  // 3. Function to remove things from order
  function removeFromOrder(idx: number) {
    setOrder([...order.slice(0, idx), ...order.slice(idx + 1)]);
  }

  // 4. Send this data to a serverless function when they check out
  // TODO:

  return {
    order,
    addToOrder,
    removeFromOrder,
  };
};

export default useOrder;
