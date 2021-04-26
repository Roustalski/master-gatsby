import React, { useEffect, useState } from "react";
import { Person } from "../types/person";
import { Pizza } from "../types/pizza";
import fetchGqlJson from "./fetchGqlJson";

type HomeData = {
  pizzas: Pizza[];
  people: Person[];
};

const arrToIndices = (arr: any[]) => {
  return arr.map((_, i) => i);
};

const getRandomInt = (max: number) => {
  return Math.floor(Math.random() * max);
};

function* shuffle(nums: number[]) {
  let i = nums.length;
  while (i--) {
    yield nums.splice(getRandomInt(i + 1), 1)[0];
  }
}

const getFourUniquePizzas = (pizzaList: Pizza[]) => {
  return [...shuffle(arrToIndices(pizzaList))]
    .slice(0, 4)
    .map((val) => pizzaList[val]);
};

const getFourUniquePeople = (people: Person[]) => {
  return [...shuffle(arrToIndices(people))]
    .slice(0, 4)
    .map((val) => people[val]);
};

const fetchHomeData = async (
  setCasePizzas: React.Dispatch<React.SetStateAction<Pizza[]>>,
  setPeople: React.Dispatch<React.SetStateAction<Person[]>>
) => {
  const { data } = await fetchGqlJson<HomeData>(
    process.env.GATSBY_SANITY_GQL_URL!,
    `
      query {
        pizzas: allPizza {
          name
        }
        people: allPerson {
          name
        }
      }
    `
  );
  setCasePizzas(getFourUniquePizzas(data.pizzas));
  setPeople(getFourUniquePeople(data.people));
};

const useHomeData = () => {
  const [casePizzas, setCasePizzas] = useState<Pizza[]>([]);
  const [onShift, setOnShift] = useState<Person[]>([]);

  useEffect(() => {
    console.log("[use-home-data] useEffect - Running");

    // When the component loads, fetch the data
    fetchHomeData(setCasePizzas, setOnShift);
  }, []);

  return {
    casePizzas,
    onShift,
  };
};

export default useHomeData;
