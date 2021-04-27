import React from "react";
import ItemGrid from "../components/item-grid";
import LoadingGrid from "../components/loading-grid";
import { HomePageGrid } from "../styles/grids";
import { Person } from "../types/person";
import { Pizza } from "../types/pizza";
import useHomeData from "../utils/use-home-data";

type CasePizzasProps = {
  pizzas: Pizza[] | undefined;
};

const CasePizzas = ({ pizzas }: CasePizzasProps) => {
  return (
    <div>
      <h2 className="center">
        <span className="mark tilt">Hot Slices</span>
      </h2>
      <p>Come on by, buy the slice </p>
      {!pizzas && <LoadingGrid count={4} />}
      {pizzas?.length === 0 && <p>Nothin' in the case!</p>}
      {pizzas && pizzas.length && <ItemGrid items={pizzas} />}
    </div>
  );
};

type OnShiftProps = {
  people: Person[] | undefined;
};

const OnShift = ({ people }: OnShiftProps) => {
  return (
    <div>
      <h2 className="center">
        <span className="mark tilt">Slicemasters On</span>
      </h2>
      <p>Standing by, ready to slice you up!</p>
      {!people && <LoadingGrid count={4} />}
      {people?.length === 0 && <p>AINT NOBODY HERE</p>}
      {people && people.length && <ItemGrid items={people} />}
    </div>
  );
};

export default function HomePage() {
  const data = useHomeData();
  return (
    <div className="center">
      <h1>The Best Pizza Downtown!</h1>
      <p>Open 11am to 11pm Every Single Day</p>
      <HomePageGrid>
        <OnShift people={data.onShift} />
        <CasePizzas pizzas={data.casePizzas} />
      </HomePageGrid>
    </div>
  );
}
