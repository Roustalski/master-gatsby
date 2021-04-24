import { useContext, useState } from "react";
import OrderContext from "../components/order-context";
import DynamicForm from "../types/dynamic-form";
import { PizzaOrder } from "../types/order";
import { Pizza } from "../types/pizza";
import getOrderTotal from "./calculate-order-total";
import { mapPizzaToBody } from "./map-pizza-to-body";

export type OrderProps = {
  pizzaList: Pizza[];
  formValues: DynamicForm;
};

export interface IRemoveFromOrder {
  (idx: number): void;
}

const useOrder = (props: OrderProps) => {
  // 1. Create some state to hold our order
  const [order, setOrder] = useContext(OrderContext);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");

  // 2. Function to add things to order
  function addToOrder(orderedPizza: PizzaOrder) {
    setOrder([...order, orderedPizza]);
  }
  // 3. Function to remove things from order
  function removeFromOrder(idx: number) {
    setOrder([...order.slice(0, idx), ...order.slice(idx + 1)]);
  }

  // 4. Send this data to a serverless function when they check out
  async function submitOrder(e: React.MouseEvent<HTMLButtonElement>) {
    e.preventDefault();
    setLoading(true);
    setError("");
    setMessage("");

    const body = {
      order: mapPizzaToBody(order, props.pizzaList),
      total: getOrderTotal({ items: order, pizzas: props.pizzaList }),
      name: props.formValues.name,
      email: props.formValues.email,
    };

    const res = await fetch(`${process.env.GATSBY_SERVERLESS_BASE}/order`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(body),
    });
    const text = JSON.parse(await res.text());
    setLoading(false);
    if (res.status >= 400 && res.status < 600) {
      setError(text.message);
    } else {
      setMessage("Success! Come on down for your pizza.");
    }
  }

  return {
    order,
    error,
    loading,
    message,
    addToOrder,
    removeFromOrder,
    submitOrder,
  };
};

export default useOrder;
