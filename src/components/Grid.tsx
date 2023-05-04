import { forwardRef } from "react";
import { Tokens } from "../types/Data";
import Card from "./Card";

type Props<T> = {
  data: T;
};

const CardGrid = forwardRef<HTMLUListElement, Props<Tokens>>(
  ({ data }, ref) => {
    return (
      <ul className="grid" ref={ref}>
        {data &&
          data.pairs.map((pair) => (
            <Card
              images={pair.images}
              symbol={pair.symbol}
              colors={pair.colors}
              priceChange={pair.priceChange}
              key={pair.id}
            />
          ))}
        {data &&
          data.trios.map((pair) => (
            <Card
              images={pair.images}
              symbol={pair.symbol}
              colors={pair.colors}
              priceChange={pair.priceChange}
              key={pair.id}
            />
          ))}
      </ul>
    );
  }
);

export default CardGrid;
