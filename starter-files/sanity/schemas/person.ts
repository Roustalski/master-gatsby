import { MdPerson as icon } from "react-icons/md";

export default {
  fields: [
    {
      name: "name",
      title: "Name",
      type: "string",
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
      name: "description",
      title: "Description",
      type: "text",
      description: 'Tell us a bit about this person'
    },
    {
      name: "image",
      title: "Image",
      type: "image",
      options: {
        hotspot: true,
      },
    },
  ],

  icon,

  // Computer name
  name: "person",

  // Visible to User
  title: "Slicemasters",

  type: "document",
};
