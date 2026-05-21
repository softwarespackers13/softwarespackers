import { useState, useEffect } from "react";
import { X } from "lucide-react";
import styles from "../css/MadeInIndiaModal.module.css";
import { cn } from "@/lib/utils";

interface MadeInIndiaModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const MadeInIndiaModal = ({ isOpen, onClose }: MadeInIndiaModalProps) => {
  const [shouldRender, setShouldRender] = useState(isOpen);
  const [animateOpen, setAnimateOpen] = useState(false);

  // Handle mounting/unmounting with transitions
  useEffect(() => {
    let timeoutId: NodeJS.Timeout;

    if (isOpen) {
      setShouldRender(true);
      // Wait a frame to trigger the entrance transition
      timeoutId = setTimeout(() => {
        setAnimateOpen(true);
      }, 20);
    } else {
      setAnimateOpen(false);
      // Wait for exit transition (matching CSS duration of 350ms) to unmount
      timeoutId = setTimeout(() => {
        setShouldRender(false);
      }, 350);
    }

    return () => clearTimeout(timeoutId);
  }, [isOpen]);

  // Handle ESC key press
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape" && isOpen) {
        onClose();
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [isOpen, onClose]);

  // Disable body scroll when modal is open and prevent layout shifting
  useEffect(() => {
    if (isOpen) {
      const scrollbarWidth = window.innerWidth - document.documentElement.clientWidth;
      document.body.style.overflow = "hidden";
      if (scrollbarWidth > 0) {
        document.body.style.paddingRight = `${scrollbarWidth}px`;
        document.documentElement.style.setProperty("--scrollbar-width", `${scrollbarWidth}px`);
      }
    } else {
      document.body.style.overflow = "";
      document.body.style.paddingRight = "";
      document.documentElement.style.setProperty("--scrollbar-width", "0px");
    }
    return () => {
      document.body.style.overflow = "";
      document.body.style.paddingRight = "";
      document.documentElement.style.setProperty("--scrollbar-width", "0px");
    };
  }, [isOpen]);

  if (!shouldRender) return null;

  return (
    <div
      className={cn(styles.backdrop, animateOpen && styles.isOpen)}
      onClick={onClose}
      role="dialog"
      aria-modal="true"
      aria-labelledby="india-modal-title"
    >
      <div
        className={styles.modalWrapper}
        onClick={(e) => e.stopPropagation()} // Prevent closing when clicking card itself
      >
        {/* Top Saffron/White/Green Accent Strip */}
        <div className={styles.accentStrip} />

        {/* Close Button */}
        <button
          className={styles.closeButton}
          onClick={onClose}
          aria-label="Close modal"
        >
          <X className="h-5 w-5" />
        </button>

        <div className={styles.modalContent}>
          {/* Logo Stack: SWP Logo and Made in India Logo side-by-side */}
          <div className={styles.logoStack}>
            <img
              src="/assets/logos/swp-logo.png"
              alt="Softwares Packers Logo"
              className={styles.swpLogo}
            />
            <div className={styles.logoDivider} />
            <img
              src="/assets/made-in-india.jpg"
              alt="Made in India Badge"
              className={styles.indiaLogo}
            />
          </div>

          <h2 id="india-modal-title" className={styles.title}>
            Built in India. Trusted Everywhere.
          </h2>

          <p className={styles.description}>
            Born in India, built for the world. Every container, every box, every unit that leaves our Ludhiana facility carries the mark of Indian engineering excellence — manufactured to the highest international standards of quality, safety, and durability.
          </p>

          {/* Action Button */}
          <button className={styles.actionButton} onClick={onClose}>
            Got it
          </button>
        </div>
      </div>
    </div>
  );
};

export default MadeInIndiaModal;
