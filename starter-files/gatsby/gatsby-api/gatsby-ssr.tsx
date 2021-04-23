import { WrapPageElementNodeArgs } from "gatsby";
import React from "react";
import Layout from "../src/components/layout";
import { OrderProvider } from "../src/components/order-context";

const wrapPageElement = ({ element, props }: WrapPageElementNodeArgs) => {
  return <Layout {...props}>{element}</Layout>;
};

const wrapRootElement = ({ element }: WrapRootElementBrowserArgs) => {
  return <OrderProvider>{element}</OrderProvider>;
};

export { wrapPageElement };
