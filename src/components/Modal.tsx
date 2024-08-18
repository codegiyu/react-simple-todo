import { MouseEvent, ReactNode, useRef } from "react";

interface IModal {
  show: boolean;
  onClose: () => void;
  children: ReactNode;
}

export const Modal = ({show, onClose, children}: IModal) => {
  const contentRef = useRef<HTMLDivElement>(null);

  const handleBackgroundClick = (e: MouseEvent<HTMLElement>) => {
    const content = contentRef.current;
    const target = e.target as Node;

    if (content) {
      if (!content.contains(target)) {
        onClose();
      }
    }
  };

  if (!show) {
    return null;
  }

  return (
    <section className="modal-container" onClick={handleBackgroundClick}>
      <div className="modal-content" ref={contentRef}>
        {children}
      </div>
    </section>
  );
};