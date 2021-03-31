import { PageProps } from "gatsby";
import React from "react";
import Layout from "../components/layout";

export default function PizzasPage(props: PageProps) {
  return (
    <>
      <h1>Path: WOOOT</h1>
      <p>{props.path}</p>
    </>
  );
}
