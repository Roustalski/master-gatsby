import React from "react";
import { Person } from "../types/person";
import { Pizza } from "../types/pizza";
import useHomeData from "../utils/use-home-data";

const CasePizzas = (pizzas: Pizza[]) => {
  return (
    <div>
      <p>Blob1: {JSON.stringify(pizzas)}</p>
    </div>
  );
};

const OnShift = (people: Person[]) => {
  return (
    <div>
      <p>Blob1: {JSON.stringify(people)}</p>
    </div>
  );
};

export default function HomePage() {
  const data = useHomeData();
  return (
    <>
      <div className="center">
        <h1>The Best Pizza Downtown!</h1>
        <p>Open 11am to 11pm Every Single Day</p>
        <div>
          <OnShift people={data.onShift} />
          <CasePizzas pizzas={data.casePizzas} />
        </div>
      </div>
    </>
  );
}
