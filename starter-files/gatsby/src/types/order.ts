export type PizzaOrder = {
  pizzaId: string;
  size: string;
};

export type BodyOrder = {
  pizzaId: string;
  size: string;
  name: string;
  thumbnail: string;
  price: string;
  [key: string]: string;
};
