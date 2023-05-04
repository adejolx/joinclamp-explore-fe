import { useCallback, useEffect, useRef } from "react";

const useModal = (modalRef: React.RefObject<HTMLDialogElement>) => {
  const firstTabStopRef = useRef<HTMLElement | null>(null);
  const lastTabStopRef = useRef<HTMLElement | null>(null);

  useEffect(() => {
    const focusableElements = modalRef.current?.querySelectorAll(
      'a[href], button:not([disabled]), input:not([disabled]), select:not([disabled]), textarea:not([disabled]), [tabindex="0"]'
    );

    if (focusableElements && focusableElements?.length) {
      firstTabStopRef.current = focusableElements[0] as HTMLElement;
      lastTabStopRef.current = focusableElements[
        focusableElements.length - 1
      ] as HTMLElement;

      firstTabStopRef.current?.focus();
    }

    const handleClick = (e: MouseEvent) => {
      const dialogDimensions = modalRef.current?.getBoundingClientRect();
      if (
        e.clientX < dialogDimensions!.left ||
        e.clientX > dialogDimensions!.right ||
        e.clientY < dialogDimensions!.top ||
        e.clientY > dialogDimensions!.bottom
      ) {
        modalRef.current?.close();
      }
    };
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Tab") {
        if (!e.shiftKey && document.activeElement === lastTabStopRef.current) {
          e.preventDefault();
          firstTabStopRef.current?.focus();
        }
        if (e.shiftKey && document.activeElement === firstTabStopRef.current) {
          e.preventDefault();
          lastTabStopRef.current?.focus();
        }
      }
    };

    if (modalRef.current) {
      modalRef.current.addEventListener("click", handleClick);
      modalRef.current.addEventListener("keydown", handleKeyDown);

      return () => {
        modalRef.current?.removeEventListener("click", handleClick);
        modalRef.current?.removeEventListener("keydown", handleKeyDown);
      };
    }
  }, []);

  const handleModalOpen = useCallback(() => {
    modalRef.current?.showModal();
    document.body.style.overflow = "hidden";
  }, []);

  const handleModalClose = useCallback(() => {
    modalRef.current?.close();
    document.body.style.overflow = "auto";
  }, []);

  return { handleModalOpen, handleModalClose };
};

export default useModal;
