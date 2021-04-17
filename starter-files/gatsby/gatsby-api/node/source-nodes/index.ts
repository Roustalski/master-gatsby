import { SourceNodesArgs } from "gatsby";
import { sourceCoffee } from "./coffee";

const sourceNodes = async (args: SourceNodesArgs) => {
  console.info("[source-nodes]");
  await Promise.all([sourceCoffee(args)]);
  console.info("[source-nodes] Complete.");
};

export { sourceNodes };
