import { lazy, Suspense } from "react";
import { Routes, Route } from "react-router-dom";
import LogoLoader from "@/components/common/LogoLoader";
import ErrorBoundary from "@/components/common/ErrorBoundary";

// Lazy load pages for code splitting
const Home = lazy(() => import("@/pages/Home"));
const ProductDetail = lazy(() => import("@/pages/ProductDetail"));
const Categories = lazy(() => import("@/pages/Categories"));
const Custom = lazy(() => import("@/pages/Custom"));
const About = lazy(() => import("@/pages/About"));
const Contact = lazy(() => import("@/pages/Contact"));
const Quote = lazy(() => import("@/pages/Quote"));
const NotFound = lazy(() => import("@/pages/NotFound"));

// Loading component - Professional logo-based loader
const PageLoader = () => (
  <div className="flex items-center justify-center min-h-screen bg-background">
    <LogoLoader size="lg" showText={true} />
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
 * AppRoutes - Application routing configuration
 * All route definitions are centralized here
 * Each route is wrapped with an ErrorBoundary for better error isolation
 */
const AppRoutes = () => (
  <Suspense fallback={<PageLoader />}>
    <Routes>
      <Route path="/" element={<RouteWithErrorBoundary><Home /></RouteWithErrorBoundary>} />
      <Route path="/products/:slug" element={<RouteWithErrorBoundary><ProductDetail /></RouteWithErrorBoundary>} />
      <Route path="/categories" element={<RouteWithErrorBoundary><Categories /></RouteWithErrorBoundary>} />
      <Route path="/custom" element={<RouteWithErrorBoundary><Custom /></RouteWithErrorBoundary>} />
      <Route path="/about" element={<RouteWithErrorBoundary><About /></RouteWithErrorBoundary>} />
      <Route path="/contact" element={<RouteWithErrorBoundary><Contact /></RouteWithErrorBoundary>} />
      <Route path="/quote" element={<RouteWithErrorBoundary><Quote /></RouteWithErrorBoundary>} />
      {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
      <Route path="*" element={<RouteWithErrorBoundary><NotFound /></RouteWithErrorBoundary>} />
    </Routes>
  </Suspense>
);

export default AppRoutes;

