import { lazy, Suspense, useEffect } from "react";
import { Routes, Route, useLocation } from "react-router-dom";
import LoadingAnimation from "@/components/common/LoadingAnimation";
import ErrorBoundary from "@/components/common/ErrorBoundary";

// Lazy load pages for code splitting
const Home = lazy(() => import("@/pages/Home"));
const ProductDetail = lazy(() => import("@/pages/ProductDetail"));
const Categories = lazy(() => import("@/pages/Categories"));
const About = lazy(() => import("@/pages/About"));
const Contact = lazy(() => import("@/pages/Contact"));
const Quote = lazy(() => import("@/pages/Quote"));
const Catalogue = lazy(() => import("@/pages/Catalogue"));
const NotFound = lazy(() => import("@/pages/NotFound"));

// Loading component - Professional logo-based loader
const PageLoader = () => (
  <div className="flex items-center justify-center min-h-screen bg-background">
    <LoadingAnimation size="lg" showText={true} />
  </div>
);

/**
 * Wrapper component to add error boundary to each route
 */
const RouteWithErrorBoundary = ({ children }: { children: React.ReactNode }) => (
  <ErrorBoundary>
    {children}
  </ErrorBoundary>
);

/**
 * ScrollToTopHandler - Scrolls to top on route change
 * Integrated directly into AppRoutes to avoid separate component
 */
const ScrollToTopHandler = () => {
  const { pathname } = useLocation();

  useEffect(() => {
    // Immediate scroll for instant feedback
    window.scrollTo({
      top: 0,
      left: 0,
      behavior: "instant",
    });

    // Also scroll after a brief delay to handle lazy-loaded content
    const timeoutId = setTimeout(() => {
      window.scrollTo({
        top: 0,
        left: 0,
        behavior: "instant",
      });
    }, 100);

    return () => clearTimeout(timeoutId);
  }, [pathname]);

  return null;
};

/**
 * AppRoutes - Application routing configuration
 * All route definitions are centralized here
 * Each route is wrapped with an ErrorBoundary for better error isolation
 */
const AppRoutesContent = () => (
  <>
    <ScrollToTopHandler />
    <Suspense fallback={<PageLoader />}>
      <Routes>
        <Route path="/" element={<RouteWithErrorBoundary><Home /></RouteWithErrorBoundary>} />
        <Route path="/products/:slug" element={<RouteWithErrorBoundary><ProductDetail /></RouteWithErrorBoundary>} />
        <Route path="/categories" element={<RouteWithErrorBoundary><Categories /></RouteWithErrorBoundary>} />
        <Route path="/about" element={<RouteWithErrorBoundary><About /></RouteWithErrorBoundary>} />
        <Route path="/contact" element={<RouteWithErrorBoundary><Contact /></RouteWithErrorBoundary>} />
        <Route path="/quote" element={<RouteWithErrorBoundary><Quote /></RouteWithErrorBoundary>} />
        <Route path="/catalogue" element={<RouteWithErrorBoundary><Catalogue /></RouteWithErrorBoundary>} />
        {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
        <Route path="*" element={<RouteWithErrorBoundary><NotFound /></RouteWithErrorBoundary>} />
      </Routes>
    </Suspense>
  </>
);

const AppRoutes = () => <AppRoutesContent />;

export default AppRoutes;

