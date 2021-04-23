import React, { useState } from "react";
import { PizzaOrder } from "../utils/useOrder";

const OrderContext = React.createContext<
  [PizzaOrder[], React.Dispatch<React.SetStateAction<PizzaOrder[]>>]
>([[], undefined as any]);
export const OrderProvider = ({ children }: any) => {
  const [order, setOrder] = useState<PizzaOrder[]>([]);
  return (
    <OrderContext.Provider value={[order, setOrder]}>
      {children}
    </OrderContext.Provider>
  );
};

export default OrderContext;
