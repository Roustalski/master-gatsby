import { CreatePagesArgs } from "gatsby";
import { Person } from "../../../../src/types/person";
import path from "path";

type SlicemasterQuery = {
  people: {
    totalCount: number;
    nodes: Person[];
  };
};

const createSlicemasterPaginationPages = async ({
  actions,
  graphql,
}: CreatePagesArgs) => {
  const pageSize = parseInt(process.env.GATSBY_PAGE_SIZE || "0");
  if (!pageSize || pageSize === 0) {
    throw Error(`Missing environment variable GATSBY_PAGE_SIZE`);
  }

  const { data } = await graphql<SlicemasterQuery>(`
    query MyQuery {
      people: allSanityPerson {
        totalCount
        nodes {
          id
          name
          slug {
            current
          }
        }
      }
    }
  `);

  const pageCount = Math.ceil(data!.people.totalCount / pageSize);
  Array.from({ length: pageCount }).forEach((_, idx) => {
    const context = {
      skip: idx * pageSize,
      currentPage: idx + 1,
      pageSize,
    };
    actions.createPage({
      path: `/slicemasters/${idx + 1}`,
      component: path.resolve("./src/pages/slicemasters.tsx"),
      context,
    });
  });
};

export { createSlicemasterPaginationPages };
