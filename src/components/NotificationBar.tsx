import ReactDOM from "react-dom";
import "./NotificationBar.css";
import { useLayoutEffect, useRef } from "react";

type Props = {
  message: JSX.Element | string;
  type?: "sticky" | "fixed";
  isVisible: Boolean;
  onClick: () => void;
};

const NotificationBar = ({
  message,
  type = "fixed",
  isVisible,
  onClick,
}: Props) => {
  const NotificationBarRef = useRef<HTMLDivElement>(null);
  const style = {
    position: type,
    top: 0,
    left: 0,
    right: 0,
  };

  useLayoutEffect(() => {
    if (isVisible && NotificationBarRef.current) {
      document.body.style.paddingBlockStart = `${NotificationBarRef.current.clientHeight}px`;
    } else {
      document.body.style.paddingBlockStart = "";
    }
  }, [isVisible]);

  if (!isVisible) return null;
  return ReactDOM.createPortal(
    <div style={style} className="bg-orange" ref={NotificationBarRef}>
      <div className="notification container cluster fs--100 fw-300 text-white text-centered">
        {message}
        <button type="button" className="button" onClick={onClick}>
          ×
        </button>
      </div>
    </div>,
    document.body
  );
};

export default NotificationBar;
