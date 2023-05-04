import ReactDOM from "react-dom";
import "./Modal.css";
import { forwardRef } from "react";
type Props = {
  onClose: () => void;
  headerContent?: string | JSX.Element;
  footerContent?: string | JSX.Element;
  bodyContent?: string | JSX.Element;
  children?: React.ReactNode;
};
const Modal = forwardRef<HTMLDialogElement, Props>(
  ({ children, headerContent, footerContent, bodyContent, onClose }, ref) => {
    return ReactDOM.createPortal(
      <dialog className="modal rounded-md" ref={ref}>
        <header className="modal-header cluster">
          {headerContent}
          <button type="button" className="button cluster" onClick={onClose}>
            <span className="hamburger"></span>
          </button>
        </header>
        {children || bodyContent}
        <footer className="border-t">{footerContent}</footer>
      </dialog>,
      document.body
    );
  }
);

export default Modal;
