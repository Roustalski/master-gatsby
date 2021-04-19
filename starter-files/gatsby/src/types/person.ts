import { FluidObject } from "gatsby-image";

export type Person = {
  id: string;
  name: string;
  description: string;
  slug: {
    current: string;
  };
  image: {
    asset: {
      fluid: FluidObject;
    };
  };
};
