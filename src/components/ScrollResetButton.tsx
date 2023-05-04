import "./ScrollResetButton.css";

const ScrollResetButton = ({ onClick }: { onClick: () => void }) => {
  return (
    <button className="scroll-reset button bg-orange" onClick={onClick}>
      ↑
    </button>
  );
};

export default ScrollResetButton;
