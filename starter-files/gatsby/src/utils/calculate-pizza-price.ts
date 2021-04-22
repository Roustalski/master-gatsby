type PizzaSizes = {
  [key: string]: number;
};

const sizes: PizzaSizes = {
  S: 0.75,
  M: 1,
  L: 1.25,
};

const calculatePizzaPrice = (cents: number, size: string) => {
  return cents * sizes[size];
};

export default calculatePizzaPrice;
