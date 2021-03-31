import { PageProps } from "gatsby";
import React from "react";

export default function SlicemastersPage(props: PageProps) {
  return (
    <>
      <h1>Path: WOOOT</h1>
      <p>{props.path}</p>
    </>
  );
}
