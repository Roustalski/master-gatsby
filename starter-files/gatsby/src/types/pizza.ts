import { FixedObject, FluidObject } from "gatsby-image";
import { Topping } from "./toppings";

export type Pizza = {
  id: string;
  image: {
    asset: {
      fluid: FluidObject | FluidObject[];
      fixed: FixedObject | FixedObject[];
    };
  };
  name: string;
  price: number;
  slug?: {
    current?: string;
  };
  toppings?: Topping[];
};
