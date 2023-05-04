import { useCallback, useEffect, useState } from "react";

const useScrollResetButton = (
  targetRef: React.MutableRefObject<HTMLElement | null>
) => {
  const [showScrollReset, setShowScrollReset] = useState(false);

  useEffect(() => {
    const options = {
      root: null,
      rootMargin: "100px",
      threshold: 0.6,
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

  const handleScrollToTop = useCallback(() => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  }, []);

  return { showScrollReset, handleScrollToTop };
};

export default useScrollResetButton;
