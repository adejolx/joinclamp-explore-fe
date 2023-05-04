import { useEffect, useRef, useState } from "react";
import { Tokens } from "./types/Data";
import useFetch from "./hooks/useFetch";
import useModal from "./hooks/useModal";
import CardGrid from "./components/Grid";
import NotificationBar from "./components/NotificationBar";
import Modal from "./components/Modal";
import ScrollResetButton from "./components/ScrollResetButton";
import "./App.css";

function App() {
  const modalRef = useRef<HTMLDialogElement>(null);
  const { data, loading, error } = useFetch<Tokens>({ url: "data.json" });
  const [showNotification, setShowNotification] = useState(false);
  const [message, setMessage] = useState<JSX.Element | string>("");
  const { handleModalClose, handleModalOpen } = useModal(modalRef);

  const handleNotificationClose = () => {
    setShowNotification(false);
  };

  useEffect(() => {
    if (message) return;
    const timerId = setTimeout(() => {
      setShowNotification(true);
      setMessage(
        <p className="fw-300">
          Clamp is deployed on the Polygon mainnet but still undergoing testing.
          There is a risk of losing your funds and cryptocurrency. To go back to
          Clamp's main page{" "}
          <a style={{ textDecoration: "underline" }} href="#">
            click here
          </a>
        </p>
      );
    }, 1500);
    return () => clearTimeout(timerId);
  }, [message, showNotification]);

  return (
    <>
      <NotificationBar
        message={message}
        isVisible={showNotification}
        onClick={handleNotificationClose}
      />

      <header className="border-b">
        <nav className="primary-nav container cluster">
          <a href="#" className="fw-300">
            clamp
          </a>
          <button
            type="button"
            className="button rounded-md"
            onClick={handleModalOpen}
          >
            Connect Wallet
          </button>
        </nav>
      </header>
      <main className="main container stack-md">
        <h1 className="fs--100 title--explore border-b">
          <a>Explore</a>
        </h1>
        <section
          className="border-trbl rounded-md stack-lg section--explore"
          data-overflow-x="scroll"
        >
          <h2 className="text-grey">Buy any crypto index anytime, anywhere.</h2>
          {loading && <p>Loading Data...</p>}
          {error && <p>{error}</p>}
          <CardGrid data={data as Tokens} />
        </section>
      </main>
      <Modal
        ref={modalRef}
        onClose={handleModalClose}
        headerContent={<h2 className="text-centered">Connect a Wallet</h2>}
        bodyContent={
          <div className="modal-body stack-md">
            <h3 className="text-grey fs--100">Recommended</h3>
            <ul className="wallets cluster">
              <li>
                <button
                  className="button wallet-option fs--100 rounded-md cluster"
                  data-state="inverted"
                  onClick={handleModalClose}
                >
                  <img />
                  <span>MetaMask</span>
                </button>
              </li>
              <li>
                <button
                  className="button wallet-option fs--100 rounded-md cluster"
                  data-state="inverted"
                  onClick={handleModalClose}
                >
                  <img />
                  <span>Rainbow</span>
                </button>
              </li>
              <li>
                <button
                  className="button wallet-option fs--100 rounded-md cluster"
                  data-state="inverted"
                  onClick={handleModalClose}
                >
                  <img />
                  <span>WalletConnect</span>
                </button>
              </li>
              <li>
                <button
                  className="button wallet-option fs--100 rounded-md cluster"
                  data-state="inverted"
                  onClick={handleModalClose}
                >
                  <img />
                  <span>Coinbase Wallet</span>
                </button>
              </li>
            </ul>
          </div>
        }
        footerContent={
          <p className="cluster fs--200">
            <span className="text-grey">New to Ethereum wallets?</span>
            <a className="fw-300" onClick={handleModalClose} href="#">
              Learn More
            </a>
          </p>
        }
      />
      {<ScrollResetButton />}
    </>
  );
}

export default App;
