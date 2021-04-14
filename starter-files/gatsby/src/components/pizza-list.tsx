import { Link } from "gatsby";
import Img, { FixedObject, FluidObject } from "gatsby-image";
import React from "react";

type Props = {
  pizzas: Pizza[];
};

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

type Topping = {
  id: string;
  name: string;
  vegetarian: boolean;
};

type SinglePizzaProps = {
  pizza: Pizza;
};

const SinglePizza = ({ pizza }: SinglePizzaProps) => {
  console.log(pizza.name, pizza.image);
  return (
    <div>
      <Link to={`pizza/${pizza.slug?.current}`}>
        <h2>
          <span className="mark">{pizza.name}</span>
        </h2>
        <p>{pizza.toppings?.map((topping) => topping.name).join(", ")}</p>
        <Img fluid={pizza.image.asset.fluid} alt={pizza.name}></Img>
      </Link>
    </div>
  );
};

export default ({ pizzas }: Props) => {
  return (
    <>
      {pizzas.map((pizza) => (
        <SinglePizza key={pizza.id} pizza={pizza} />
      ))}
    </>
  );
};
