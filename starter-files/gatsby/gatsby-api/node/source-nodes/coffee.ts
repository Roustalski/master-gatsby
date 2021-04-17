import { NodeInput, SourceNodesArgs } from "gatsby";
import fetch from "isomorphic-fetch";

type Coffee = {
  title: string;
  description: string;
  ingredients: string[];
  id: 19;
};

const fetchCoffeeList = async (): Promise<Coffee[]> => {
  const baseURL = "https://api.sampleapis.com/coffee/hot";
  const response: Response = await fetch(baseURL);
  return response.json();
};

const createMetadata = (
  { createContentDigest, createNodeId }: SourceNodesArgs,
  coffee: Coffee
): NodeInput => ({
  children: [],
  parent: undefined,
  id: createNodeId(`coffee-${coffee.id}`),
  internal: {
    contentDigest: createContentDigest(coffee),
    mediaType: "application/json",
    type: "Coffee",
  },
});

const sourceCoffee = async (args: SourceNodesArgs) => {
  const coffeeList = await fetchCoffeeList();
  const metadata = coffeeList.map((c) => createMetadata(args, c));
  for (let i: number = 0; i < coffeeList.length; i++) {
    args.actions.createNode({
      ...coffeeList[i],
      ...metadata[i],
    });
  }

  console.info("[source-coffee] Complete.");
};

export { sourceCoffee };
