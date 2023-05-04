import { useEffect, useRef, useState } from "react";
import "./App.css";
import CardGrid from "./components/Grid";
import useFetch from "./hooks/useFetch";
import { Tokens } from "./types/Data";
import NotificationBar from "./components/NotificationBar";
import Modal from "./components/Modal";
import ScrollResetButton from "./components/ScrollResetButton";

function App() {
  const { data, loading, error } = useFetch<Tokens>({ url: "data.json" });
  const [showNotification, setShowNotification] = useState(false);
  const [message, setMessage] = useState<JSX.Element | string>("");
  const [showScrollReset, setShowScrollReset] = useState(false);
  const modalRef = useRef<HTMLDialogElement>(null);
  const targetRef = useRef(null);

  useEffect(() => {
    const options = {
      root: null,
      rootMargin: "500px",
      threshold: 0.8,
    };

    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (!entry.isIntersecting) {
          setShowScrollReset(true);
        } else {
          setShowScrollReset(false);
        }
      });
    }, options);

    if (targetRef.current) {
      observer.observe(targetRef.current);
    }

    return () => observer.disconnect();
  }, []);

  const handleNotificationClose = () => {
    setShowNotification(false);
  };

  const handleModalOpen = () => {
    modalRef.current?.showModal();
    document.body.style.overflow = "hidden";
  };
  const handleModalClose = () => {
    modalRef.current?.close();
    document.body.style.overflow = "auto";
  };

  const handleScrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
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
      <main className="main container stack-md" ref={targetRef}>
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
      <Modal ref={modalRef} onClose={handleModalClose} />
      {showScrollReset && <ScrollResetButton onClick={handleScrollToTop} />}
    </>
  );
}

export default App;
