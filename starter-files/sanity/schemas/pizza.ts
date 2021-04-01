import { MdLocalPizza as icon } from "react-icons/md";
import PriceInput from '../components/price-input';

export default {
  fields: [
    {
      name: "name",
      title: "Pizza Name",
      type: "string",
      description: "Name of the pizza",
    },
    {
      name: "slug",
      title: "Slug",
      type: "slug",
      options: {
        source: "name",
        maxLength: 100,
      },
    },
    {
      name: "image",
      title: "Pizza Image",
      type: "image",
      options: {
        hotspot: true,
      },
    },
    {
      name: "price",
      title: "Price",
      type: "number",
      description: "Price of the pizza in cents",
      // TODO: Find Sanity types
      validation: (rule: any) => rule.min(1000),
      inputComponent: PriceInput,
    },
    {
      name: "toppings",
      title: "Toppings",
      type: "array",
      of: [{ type: "reference", to: [{ type: "topping" }] }],
      description: "Which toppings are on the pizza?",
    },
  ],
  preview: {
    select: {
      title: "name",
      media: "image",
      topping0: "toppings.0.name",
      topping1: "toppings.1.name",
      topping2: "toppings.2.name",
      topping3: "toppings.3.name",
    },
    prepare: ({ title, media, ...toppings }: any) => {
      const tops = Object.values(toppings).filter(Boolean);
      return {
        title,
        media,
        subtitle: tops.join(", "),
      };
    },
  },

  icon,

  // Computer name
  name: "pizza",

  // Visible to User
  title: "Pizzas",

  type: "document",
};
