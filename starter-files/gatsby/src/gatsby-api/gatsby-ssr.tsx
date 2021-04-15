import { WrapPageElementNodeArgs } from "gatsby";
import React from "react";
import Layout from "../components/layout";

const wrapPageElement = ({ element, props }: WrapPageElementNodeArgs) => {
  return <Layout {...props}>{element}</Layout>;
};

export { wrapPageElement };
