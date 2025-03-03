import { graphql, Link, PageProps } from "gatsby";
import Img from "gatsby-image";
import React from "react";
import styled from "styled-components";
import Pagination from "../components/pagination";
import SEO from "../components/seo";
import { Person } from "../types/person";

type SlicemastersQuery = {
  people: { nodes: Person[]; totalCount: number };
};

type SlicemastersContext = {
  skip: number;
  currentPage: number;
  pageSize: number;
};

const SlicemasterGrid = styled.div`
  display: grid;
  gap: 2rem;
  grid-template-columns: repeat(auto-fill, minmax(250px, 1fr));
`;

const SlicemasterStyles = styled.div`
  a {
    text-decoration: none;
  }
  .gatsby-image-wrapper {
    height: 400px;
  }
  h2 {
    transform: rotate(-2deg);
    text-align: center;
    font-size: 4rem;
    margin-bottom: -2rem;
    position: relative;
    z-index: 2;
  }
  .description {
    background: var(--yellow);
    padding: 1rem;
    margin: 2rem;
    margin-top: -6rem;
    position: relative;
    z-index: 2;
    transform: rotate(1deg);
    text-align: center;
  }
`;

export default function SlicemastersPage({
  data: { people },
  pageContext: ctx,
}: PageProps<SlicemastersQuery, SlicemastersContext>) {
  return (
    <>
      <SEO title={`Slicemasters - Page ${ctx.currentPage || 1}`}/>
      <Pagination
        base="slicemasters"
        totalCount={people.totalCount}
        pageSize={ctx.pageSize || parseInt(process.env.GATSBY_PAGE_SIZE || '2')}
        currentPage={ctx.currentPage}
        skip={ctx.skip}
      />
      <SlicemasterGrid>
        {people.nodes.map((person) => (
          <SlicemasterStyles key={person.id}>
            <Link to={`/slicemaster/${person.slug.current}`}>
              <h2>
                <span className="mark">{person.name}</span>
              </h2>
            </Link>
            <Img fluid={person.image.asset.fluid}></Img>
            <p className="description">{person.description}</p>
          </SlicemasterStyles>
        ))}
      </SlicemasterGrid>
    </>
  );
}

export const query = graphql`
  query($skip: Int = 0, $pageSize: Int = 2) {
    people: allSanityPerson(skip: $skip, limit: $pageSize) {
      totalCount
      nodes {
        name
        id
        slug {
          current
        }
        description
        image {
          asset {
            fluid(maxWidth: 410) {
              ...GatsbySanityImageFluid
            }
          }
        }
      }
    }
  }
`;
