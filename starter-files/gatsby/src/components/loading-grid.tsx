import React from "react";
import { ItemsGrid, ItemStyles } from "../styles/grids";

export type LoadingGridProps = {
  count: number;
};

const LoadingGrid = ({ count }: LoadingGridProps) => {
  return (
    <ItemsGrid>
      {Array.from({ length: count }, (_, idx) => (
        <ItemStyles key={`${Math.random()}-idx`}>
          <p>
            <span className="mark">Loading...</span>
          </p>
          <img
            src="data:image/png;base64, iVBORw0KGgoAAAANSUhEUgAAAAUAAAAECAQAAADsOj3LAAAADklEQVR42mNkgANGQkwAAJoABWH6GPAAAAAASUVORK5CYII="
            className="loading"
            alt="Loading"
            width="500"
            height="400"
          />
        </ItemStyles>
      ))}
    </ItemsGrid>
  );
};

export default LoadingGrid;
