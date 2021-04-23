import { WrapPageElementBrowserArgs, WrapRootElementBrowserArgs } from "gatsby";
import "normalize.css";
import React from "react";
import Layout from "../src/components/layout";
import { OrderProvider } from "../src/components/order-context";

const wrapPageElement = ({ element, props }: WrapPageElementBrowserArgs) => {
  return <Layout {...props}>{element}</Layout>;
};

const wrapRootElement = ({ element }: WrapRootElementBrowserArgs) => {
  return <OrderProvider>{element}</OrderProvider>;
};

export { wrapPageElement, wrapRootElement };
