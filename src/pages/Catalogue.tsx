import React, { useState, useEffect, useRef } from "react";
import { Link } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import { ArrowLeft, ChevronLeft, ChevronRight, FileDown } from "lucide-react";
import * as pdfjsLib from "pdfjs-dist";
import FlipBookViewer from "@/components/catalogue/FlipBookViewer";
import ToolbarControls from "@/components/catalogue/ToolbarControls";
import GridViewOverlay from "@/components/catalogue/GridViewOverlay";
import { toast } from "sonner";

// Set pdf.js worker to standard CDN path for Vite bundle stability
pdfjsLib.GlobalWorkerOptions.workerSrc = `https://cdnjs.cloudflare.com/ajax/libs/pdf.js/${pdfjsLib.version}/pdf.worker.min.js`;

const Catalogue: React.FC = () => {
  const [pdfDoc, setPdfDoc] = useState<pdfjsLib.PDFDocumentProxy | null>(null);
  const [totalPages, setTotalPages] = useState(0);
  const [currentPage, setCurrentPage] = useState(1);
  const [zoom, setZoom] = useState(1.0);
  const [isPlaying, setIsPlaying] = useState(false);
  const [isFullscreen, setIsFullscreen] = useState(false);
  const [isSoundOn, setIsSoundOn] = useState(true);
  const [isGridOpen, setIsGridOpen] = useState(false);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const viewerContainerRef = useRef<HTMLDivElement | null>(null);
  const flipBookRef = useRef<any>(null);

  const pdfUrl = "/catalogue.pdf";

  // Load PDF Document
  useEffect(() => {
    const loadPdf = async () => {
      try {
        setLoading(true);
        setError(null);
        const loadingTask = pdfjsLib.getDocument(pdfUrl);
        const pdf = await loadingTask.promise;
        setPdfDoc(pdf);
        setTotalPages(pdf.numPages);
        setLoading(false);
      } catch (err: any) {
        console.error("Error loading PDF document:", err);
        setError("Unable to load the catalogue document. Please try again later.");
        setLoading(false);
        toast.error("Failed to load PDF catalogue");
      }
    };

    loadPdf();
  }, []);

  // Keyboard navigation
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (!flipBookRef.current || isGridOpen) return;
      const pageFlip = flipBookRef.current.pageFlip();
      if (!pageFlip) return;

      if (e.key === "ArrowRight") {
        pageFlip.flipNext();
      } else if (e.key === "ArrowLeft") {
        pageFlip.flipPrev();
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [isGridOpen]);

  // Autoplay slideshow timer
  useEffect(() => {
    if (!isPlaying || !flipBookRef.current) return;

    const interval = setInterval(() => {
      const pageFlip = flipBookRef.current.pageFlip();
      if (pageFlip) {
        if (currentPage >= totalPages) {
          pageFlip.flip(0); // Wrap around
        } else {
          pageFlip.flipNext();
        }
      }
    }, 4500); // Flip page every 4.5 seconds

    return () => clearInterval(interval);
  }, [isPlaying, currentPage, totalPages]);

  // Sync fullscreen state
  useEffect(() => {
    const handleFullscreenChange = () => {
      setIsFullscreen(!!document.fullscreenElement);
    };
    document.addEventListener("fullscreenchange", handleFullscreenChange);
    return () => document.removeEventListener("fullscreenchange", handleFullscreenChange);
  }, []);

  // Viewport action handlers
  const handleZoomIn = () => setZoom((prev) => Math.min(prev + 0.25, 2.5));
  const handleZoomOut = () => setZoom((prev) => Math.max(prev - 0.25, 0.8));
  
  const handleTogglePlay = () => {
    setIsPlaying((prev) => !prev);
    toast.info(isPlaying ? "Autoplay paused" : "Autoplay started");
  };

  const handleToggleSound = () => {
    setIsSoundOn((prev) => !prev);
    toast.info(isSoundOn ? "Page turn sound muted" : "Page turn sound enabled");
  };

  const handleToggleFullscreen = async () => {
    if (!viewerContainerRef.current) return;
    try {
      if (!document.fullscreenElement) {
        await viewerContainerRef.current.requestFullscreen();
      } else {
        await document.exitFullscreen();
      }
    } catch (err) {
      toast.error("Fullscreen mode is not supported by your browser");
    }
  };

  const handlePageSelect = (pageNumber: number) => {
    if (flipBookRef.current) {
      // react-pageflip uses 0-based page index
      flipBookRef.current.pageFlip().flip(pageNumber - 1);
    }
  };

  const handlePrevPage = () => {
    if (flipBookRef.current) {
      flipBookRef.current.pageFlip().flipPrev();
    }
  };

  const handleNextPage = () => {
    if (flipBookRef.current) {
      flipBookRef.current.pageFlip().flipNext();
    }
  };

  // Seamless high-quality vector printing using a hidden iframe
  const handlePrint = () => {
    toast.info("Preparing document for printing...");
    const iframe = document.createElement("iframe");
    iframe.style.display = "none";
    iframe.src = pdfUrl;
    document.body.appendChild(iframe);
    iframe.onload = () => {
      setTimeout(() => {
        try {
          iframe.contentWindow?.focus();
          iframe.contentWindow?.print();
        } catch (e) {
          toast.error("Printing failed. Please try downloading the PDF instead.");
        } finally {
          document.body.removeChild(iframe);
        }
      }, 500);
    };
  };

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col font-sans antialiased">
      {/* 1. Header Section */}
      <section className="bg-gradient-to-b from-[#fbf9f9] to-[#efeded] border-b border-gray-200/80 pt-28 pb-12">
        <div className="max-w-7xl mx-auto px-6 relative flex flex-col items-center">
          {/* Back button */}
          <Link
            to="/categories"
            className="absolute left-6 top-28 flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-gray-600 hover:text-[#b91c1c] transition-colors"
          >
            <ArrowLeft className="w-4 h-4" />
            Back
          </Link>

          <span className="text-[11px] font-sans font-bold uppercase tracking-[0.3em] text-[#b91c1c] mb-2 block">
            Digital Flipbook
          </span>
          <h1 className="text-3xl sm:text-4xl font-display font-bold text-[#1b1c1c] tracking-tight uppercase">
            Catalogue
          </h1>
        </div>
      </section>

      {/* 2. Interactive Viewer Section */}
      <section className="flex-1 bg-gray-100 py-12 px-4 flex flex-col items-center justify-center">
        <div className="w-full max-w-6xl flex flex-col items-center">
          
          {/* Main Viewer Wrapper */}
          <div
            ref={viewerContainerRef}
            className={`w-full bg-[#18181b] rounded-2xl shadow-2xl border border-gray-800 p-6 sm:p-8 flex flex-col justify-between items-center relative overflow-hidden ${
              isFullscreen ? "h-screen w-screen rounded-none border-none p-4" : "min-h-[500px]"
            }`}
          >
            {/* Absolute loading overlay */}
            <AnimatePresence>
              {loading && (
                <motion.div
                  initial={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  className="absolute inset-0 bg-[#18181b] z-40 flex flex-col items-center justify-center space-y-4"
                >
                  <div className="w-14 h-14 rounded-full border-4 border-white/15 border-t-[#b91c1c] animate-spin" />
                  <span className="text-sm font-sans tracking-widest text-gray-400 uppercase">
                    Loading PDF Catalogue...
                  </span>
                </motion.div>
              )}
            </AnimatePresence>

            {/* Error State */}
            {error && (
              <div className="flex-1 flex flex-col items-center justify-center text-center p-8 space-y-4">
                <p className="text-red-400 font-sans text-sm">{error}</p>
                <Link to="/" className="text-white hover:text-[#b91c1c] transition-colors underline font-sans text-xs">
                  Return to Home
                </Link>
              </div>
            )}

            {!error && !loading && (
              <>
                {/* Header Row: Page Counter */}
                <div className="w-full flex justify-between items-center mb-6">
                  <div className="bg-black/40 border border-white/5 rounded px-4 py-1.5 backdrop-blur-md">
                    <span className="text-xs font-mono tracking-widest text-gray-300">
                      PAGE {currentPage} / {totalPages}
                    </span>
                  </div>
                  {isPlaying && (
                    <span className="flex h-2 w-2 relative">
                      <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[#b91c1c] opacity-75"></span>
                      <span className="relative inline-flex rounded-full h-2 w-2 bg-[#b91c1c]"></span>
                    </span>
                  )}
                </div>

                {/* Flipbook Layout with Navigation Arrows */}
                <div className="flex-1 w-full flex items-center justify-between gap-4">
                  {/* Left Arrow */}
                  <button
                    onClick={handlePrevPage}
                    disabled={currentPage <= 1}
                    className="hidden md:flex p-3 rounded-full bg-white/5 hover:bg-white/10 text-white disabled:opacity-10 disabled:cursor-not-allowed hover:text-[#b91c1c] transition-all duration-300 border border-white/5 disabled:hover:text-white"
                    aria-label="Previous Page"
                  >
                    <ChevronLeft className="w-6 h-6" />
                  </button>

                  {/* Centered FlipBook */}
                  <div className="flex-1 flex justify-center items-center">
                    <FlipBookViewer
                      pdfDoc={pdfDoc}
                      totalPages={totalPages}
                      currentPage={currentPage}
                      zoom={zoom}
                      isSoundOn={isSoundOn}
                      onPageChange={setCurrentPage}
                      innerRef={flipBookRef}
                    />
                  </div>

                  {/* Right Arrow */}
                  <button
                    onClick={handleNextPage}
                    disabled={currentPage >= totalPages}
                    className="hidden md:flex p-3 rounded-full bg-white/5 hover:bg-white/10 text-white disabled:opacity-10 disabled:cursor-not-allowed hover:text-[#b91c1c] transition-all duration-300 border border-white/5 disabled:hover:text-white"
                    aria-label="Next Page"
                  >
                    <ChevronRight className="w-6 h-6" />
                  </button>
                </div>

                {/* Mobile manual page navigation buttons */}
                <div className="flex md:hidden justify-center gap-6 mt-4 w-full">
                  <button
                    onClick={handlePrevPage}
                    disabled={currentPage <= 1}
                    className="px-4 py-2 rounded-lg bg-white/5 text-white disabled:opacity-20 text-xs font-bold uppercase tracking-wider flex items-center gap-1"
                  >
                    <ChevronLeft className="w-4 h-4" /> Prev
                  </button>
                  <button
                    onClick={handleNextPage}
                    disabled={currentPage >= totalPages}
                    className="px-4 py-2 rounded-lg bg-white/5 text-white disabled:opacity-20 text-xs font-bold uppercase tracking-wider flex items-center gap-1"
                  >
                    Next <ChevronRight className="w-4 h-4" />
                  </button>
                </div>

                {/* Controls Bar */}
                <div className="w-full flex justify-center mt-8">
                  <ToolbarControls
                    zoom={zoom}
                    onZoomIn={handleZoomIn}
                    onZoomOut={handleZoomOut}
                    onToggleGrid={() => setIsGridOpen(true)}
                    isPlaying={isPlaying}
                    onTogglePlay={handleTogglePlay}
                    isFullscreen={isFullscreen}
                    onToggleFullscreen={handleToggleFullscreen}
                    isSoundOn={isSoundOn}
                    onToggleSound={handleToggleSound}
                    onPrint={handlePrint}
                    pdfUrl={pdfUrl}
                  />
                </div>
              </>
            )}
          </div>
        </div>
      </section>

      {/* 3. Bottom CTA Section */}
      <section className="bg-[#f5f2ed] border-t border-gray-200/50 py-16 text-center">
        <div className="max-w-4xl mx-auto px-6 space-y-6">
          <h2 className="text-2xl sm:text-3xl font-display font-semibold text-foreground">
            Get Offline Access
          </h2>
          <p className="text-sm font-sans text-muted-foreground max-w-lg mx-auto leading-relaxed">
            Download our complete products catalogue in high-definition PDF format to view all our specifications, dimensions, and custom solutions offline.
          </p>
          <div>
            <a
              href={pdfUrl}
              download="catalogue.pdf"
              className="inline-flex items-center gap-3 bg-[#b91c1c] text-white font-sans font-semibold px-8 py-4 rounded-lg hover:bg-[#a11818] transition-colors shadow-lg hover:shadow-xl transition-all duration-300"
            >
              <FileDown className="w-5 h-5" />
              Download Now
            </a>
          </div>
        </div>
      </section>

      {/* Overlays / Modals */}
      <GridViewOverlay
        isOpen={isGridOpen}
        onClose={() => setIsGridOpen(false)}
        totalPages={totalPages}
        currentPage={currentPage}
        onPageSelect={handlePageSelect}
      />
    </div>
  );
};

export default Catalogue;
