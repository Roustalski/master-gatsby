import React from "react";
import Layout from './src/components/layout';
import 'normalize.css';
// import './src/styles/root.css';

export function wrapPageElement({ element, props }) {
  return <Layout {...props}>{element}</Layout>;
}
