import { CreatePagesArgs } from "gatsby";
import { Person } from "../../../../src/types/person";
import path from "path";

type SlicemasterQuery = {
  people: {
    nodes: Person[];
  };
};

const createSlicemasterIndividualPages = async ({
  actions,
  graphql,
}: CreatePagesArgs) => {
  const { data } = await graphql<SlicemasterQuery>(`
    query MyQuery {
      people: allSanityPerson {
        nodes {
          slug {
            current
          }
        }
      }
    }
  `);

  data?.people.nodes.forEach((person) => {
    actions.createPage({
      path: `/slicemaster/${person.slug.current}`,
      component: path.resolve("./src/templates/person-template.tsx"),
      context: {
        slug: person.slug.current,
      },
    });
  });
};

export { createSlicemasterIndividualPages };
