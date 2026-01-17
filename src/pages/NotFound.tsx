import { useLocation } from "react-router-dom";
import { useEffect } from "react";
import { logError } from "@/lib/errorHandler";
import { ErrorSeverity } from "@/lib/errorHandler";
import { IS_DEV, COMPANY_WHATSAPP } from "@/config/constants";
import WhatsAppButton from "@/components/common/WhatsAppButton";
import styles from "./css/NotFound.module.css";

const NotFound = () => {
  const location = useLocation();

  useEffect(() => {
    // Log 404 errors for analytics/monitoring
    logError(
      `404 Error: User attempted to access non-existent route: ${location.pathname}`,
      { component: 'NotFound', path: location.pathname },
      ErrorSeverity.WARNING
    );

    // Only log to console in development
    if (IS_DEV) {
      console.error("404 Error: User attempted to access non-existent route:", location.pathname);
    }
  }, [location.pathname]);

  return (
    <div className={styles.pageContainer}>
      <div className={styles.content}>
        <h1 className={styles.title}>404</h1>
        <p className={styles.message}>Oops! Page not found</p>
        <a href="/" className={styles.link}>
          Return to Home
        </a>
      </div>
      {/* Floating WhatsApp Button */}
      <WhatsAppButton
        phoneNumber={COMPANY_WHATSAPP}
        message="Hello, I'm interested in your plastic containers. Please share more details."
        variant="floating"
      />
    </div>
  );
};

export default NotFound;
