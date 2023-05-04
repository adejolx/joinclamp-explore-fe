import "./Card.css";

type Props = {
  symbol: string;
  images: string[];
  priceChange: number;
  colors: string[];
};

const Card = ({ symbol, images, priceChange, colors }: Props) => {
  const svgStyles = {
    stroke: priceChange >= 0 ? "green" : "red",
    transform: priceChange >= 0 ? "rotate(-90deg)" : undefined,
  };

  return (
    <li className="card-wrapper">
      <article className="card">
        <div className="card-body stack-lg">
          <h2 className="fs-100">{symbol}</h2>
          <div className="card-info cluster">
            <p className="cluster fs--200 fw-300">
              Underlying tokens
              <span className="cluster images">
                {images &&
                  images.map((image, index) => (
                    <img
                      src={`${import.meta.env.BASE_URL}/images/${image}`}
                      key={index}
                    />
                  ))}
              </span>
            </p>
            <p className="cluster fs--200 fw-300">
              Price Change (in 24 hours)
              <span className="cluster price fs-100">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="24"
                  height="24"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  stroke-width="2"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  style={svgStyles}
                >
                  <line x1="7" y1="7" x2="17" y2="17"></line>
                  <polyline points="17 7 17 17 7 17"></polyline>
                </svg>
                <span>{priceChange.toFixed(1)}%</span>
              </span>
            </p>
          </div>
        </div>
        <div className="card-footer stack-sm">
          <div className="color-bar">
            {colors &&
              colors.map((color, index) => (
                <span style={{ backgroundColor: color }} key={index}></span>
              ))}
          </div>
          <button type="button" className="button">
            Buy
          </button>
        </div>
      </article>
    </li>
  );
};

export default Card;
