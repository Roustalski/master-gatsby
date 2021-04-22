import React from "react";
import SEO from "../components/seo";

export default function OrderPage({ path }: any) {
  return (
    <>
      <SEO title="Order a Pizza!" />
      <h1>Path: WOOOT</h1>
      <p>{path}</p>
    </>
  );
}
