import { PageProps, PageRendererProps } from "gatsby";
import React from "react";
import Footer from "./footer";
import Nav from "./nav";

export default function Layout(props: any) {
  console.log(props);
  return (
    <>
      <Nav />
      {props.children}
      <Footer />
    </>
  );
}
