import { Tokens } from "../types/Data";
import Card from "./Card";

type Props<T> = {
  data: T;
};

const CardGrid = ({ data }: Props<Tokens>) => {
  return (
    <ul className="grid">
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
};

export default CardGrid;
