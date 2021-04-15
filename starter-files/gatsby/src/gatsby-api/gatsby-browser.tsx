import { WrapRootElementBrowserArgs } from "gatsby";
import "normalize.css";
import React from "react";
import Layout from "../components/layout";

const wrapPageElement = ({ element, props }: WrapRootElementBrowserArgs) => {
  return <Layout {...props}>{element}</Layout>;
};

export { wrapPageElement };
