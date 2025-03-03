import { graphql, PageProps } from "gatsby";
import Img from "gatsby-image";
import React from "react";
import styled from "styled-components";
import SEO from "../components/seo";
import { Person } from "../types/person";

type PersonQuery = {
  person: { nodes: Person[] };
};

type PersonContext = {
  slug: string;
};

const PersonStyles = styled.div`
  .gatsby-image-wrapper {
    height: 800px;
  }
  h2 {
    transform: rotate(-2deg);
    text-align: center;
    font-size: 4rem;
    margin-bottom: -2rem;
    position: relative;
    z-index: 2;
    span {
      padding: 5px;
      background: var(--yellow);
    }
  }
`;

const PersonTemplate = ({
  data: {
    person: { nodes },
  },
  pageContext: { slug },
}: PageProps<PersonQuery, PersonContext>) => {
  const person = nodes[0];
  return (
    <>
      <SEO title={person.name} image={person.image?.asset?.fluid?.src} />
      <PersonStyles>
        <p>{person.description}</p>
        <h2>
          <span>{person.name}</span>
        </h2>
        <Img alt={person.name} fluid={person.image.asset.fluid}>
          {person.name}
        </Img>
      </PersonStyles>
    </>
  );
};

export default PersonTemplate;

export const query = graphql`
  query($slug: String!) {
    person: allSanityPerson(filter: { slug: { current: { eq: $slug } } }) {
      nodes {
        name
        image {
          asset {
            fluid(maxWidth: 800) {
              ...GatsbySanityImageFluid
            }
          }
        }
        description
      }
    }
  }
`;
