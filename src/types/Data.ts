export type TokenData = {
  id: string;
  symbol: string;
  images: string[];
  priceChange: number;
  colors: string[];
};

export type Tokens = {
  pairs: TokenData[];
  trios: TokenData[];
};
