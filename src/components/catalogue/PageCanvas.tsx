import React, { useEffect, useRef, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import * as pdfjsLib from "pdfjs-dist";

interface PageCanvasProps {
  pdfDoc: pdfjsLib.PDFDocumentProxy | null;
  pageNumber: number;
  zoom: number;
  shouldRender: boolean;
}

const PageCanvas: React.FC<PageCanvasProps> = ({
  pdfDoc,
  pageNumber,
  zoom,
  shouldRender,
}) => {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const renderTaskRef = useRef<any>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [pageDimensions, setPageDimensions] = useState({ width: 0, height: 0 });

  useEffect(() => {
    if (!pdfDoc) return;

    // Fetch page dimensions first to set proper aspect ratio even before full render
    pdfDoc.getPage(pageNumber).then((page) => {
      const viewport = page.getViewport({ scale: 1 });
      setPageDimensions({ width: viewport.width, height: viewport.height });
    }).catch((err) => {
      console.error("Error getting page info:", err);
    });
  }, [pdfDoc, pageNumber]);

  useEffect(() => {
    let active = true;

    const renderPage = async () => {
      if (!pdfDoc || !shouldRender) return;

      try {
        setLoading(true);
        setError(null);

        // Cancel previous render task if it exists
        if (renderTaskRef.current) {
          renderTaskRef.current.cancel();
          renderTaskRef.current = null;
        }

        const page = await pdfDoc.getPage(pageNumber);
        if (!active) return;

        const canvas = canvasRef.current;
        if (!canvas) return;

        const context = canvas.getContext("2d");
        if (!context) return;

        // Scale factor: render at 1.5x zoom baseline * current zoom multiplier for sharp quality
        const scale = 1.5 * zoom;
        const viewport = page.getViewport({ scale });

        // Set high-DPI canvas dimensions
        canvas.width = viewport.width;
        canvas.height = viewport.height;

        const renderContext = {
          canvasContext: context,
          viewport: viewport,
        };

        const renderTask = page.render(renderContext);
        renderTaskRef.current = renderTask;

        await renderTask.promise;
        renderTaskRef.current = null;

        if (active) {
          setLoading(false);
        }
      } catch (err: any) {
        if (err.name === "RenderingCancelledException" || err.name === "WorkerDragException") {
          // Normal cancellation, do nothing
          return;
        }
        console.error("Error rendering PDF page:", err);
        if (active) {
          setError("Failed to load page");
          setLoading(false);
        }
      }
    };

    renderPage();

    return () => {
      active = false;
      if (renderTaskRef.current) {
        renderTaskRef.current.cancel();
        renderTaskRef.current = null;
      }
    };
  }, [pdfDoc, pageNumber, zoom, shouldRender]);

  // Determine rendering wrapper size using fetched dimensions or default ratio
  const ratio = pageDimensions.width ? pageDimensions.height / pageDimensions.width : 1.414; // A4 standard is ~1.414

  return (
    <div
      className="relative w-full overflow-hidden bg-white shadow-md border border-gray-200"
      style={{ aspectRatio: `${1 / ratio}` }}
    >
      {shouldRender && !error ? (
        <canvas
          ref={canvasRef}
          className="w-full h-full object-contain"
        />
      ) : (
        <div className="absolute inset-0 bg-gray-50 flex items-center justify-center">
          {error && <span className="text-red-500 font-sans text-xs">{error}</span>}
        </div>
      )}

      {/* Loading Skeleton */}
      <AnimatePresence>
        {loading && (
          <motion.div
            initial={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="absolute inset-0 bg-gray-50 flex flex-col items-center justify-center p-6 space-y-4"
          >
            <div className="w-12 h-12 rounded-full border-2 border-primary/20 border-t-primary animate-spin" />
            <span className="text-xs text-muted-foreground font-sans tracking-wide">
              Loading Page {pageNumber}...
            </span>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default PageCanvas;
