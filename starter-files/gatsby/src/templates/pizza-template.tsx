import { graphql } from "gatsby";
import Img from "gatsby-image";
import { GatsbyFluidImageProps } from "gatsby-source-sanity";
import React from "react";
import styled from "styled-components";
import SEO from "../components/seo";
import { Pizza } from "../types/pizza";

type SinglePizzaPageProps = {
  data: {
    pizza: Pizza;
  };
};

const PizzaGrid = styled.div`
  display: grid;
  gap: 2rem;
  grid-template-columns: repeat(auto-fill, minmax(400px, 1fr));
`;

const SinglePizzaPage = ({ data: { pizza } }: SinglePizzaPageProps) => {
  const img = pizza.image?.asset?.fluid as GatsbyFluidImageProps;
  return (
    <>
      <SEO title={pizza.name} image={img?.src} />
      <PizzaGrid>
        <Img fluid={img}></Img>
        <div>
          <h2 className="mark">{pizza.name}</h2>
          <ul>
            {pizza.toppings?.map((topping) => (
              <li key={topping.id}>{topping.name}</li>
            ))}
          </ul>
        </div>
      </PizzaGrid>
    </>
  );
};

export default SinglePizzaPage;

export const query = graphql`
  query($slug: String!) {
    pizza: sanityPizza(slug: { current: { eq: $slug } }) {
      name
      id
      image {
        asset {
          fluid(maxWidth: 800) {
            ...GatsbySanityImageFluid
          }
        }
      }
      toppings {
        name
        id
        vegetarian
      }
    }
  }
`;
