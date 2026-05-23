import React from "react";
import { motion } from "framer-motion";
import { X, FileText } from "lucide-react";

interface GridViewOverlayProps {
  isOpen: boolean;
  onClose: () => void;
  totalPages: number;
  currentPage: number;
  onPageSelect: (pageNumber: number) => void;
}

const GridViewOverlay: React.FC<GridViewOverlayProps> = ({
  isOpen,
  onClose,
  totalPages,
  currentPage,
  onPageSelect,
}) => {
  if (!isOpen) return null;

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-background/80 backdrop-blur-md"
    >
      <div className="w-full max-w-5xl h-[85vh] bg-card rounded-xl border border-border shadow-2xl flex flex-col overflow-hidden">
        {/* Header */}
        <div className="flex justify-between items-center px-6 py-4 border-b border-border">
          <div>
            <h3 className="text-lg font-display font-semibold text-foreground">Catalogue Overview</h3>
            <p className="text-xs text-muted-foreground font-sans">
              Select a page to jump directly to it ({totalPages} pages total)
            </p>
          </div>
          <button
            onClick={onClose}
            className="p-2 rounded-full hover:bg-secondary text-muted-foreground hover:text-foreground transition-colors focus-ring"
            aria-label="Close overview"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Scrollable Grid */}
        <div className="flex-1 overflow-y-auto p-6 scroll-smooth">
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-4">
            {Array.from({ length: totalPages }, (_, idx) => {
              const pageNum = idx + 1;
              const isCurrent = pageNum === currentPage;

              return (
                <div
                  key={pageNum}
                  onClick={() => {
                    onPageSelect(pageNum);
                    onClose();
                  }}
                  className={`group relative cursor-pointer aspect-[3/4] border rounded-lg overflow-hidden flex flex-col justify-between p-4 transition-all duration-300 ${
                    isCurrent
                      ? "border-primary bg-primary/5 shadow-md"
                      : "border-border bg-background hover:border-muted hover:shadow-sm"
                  }`}
                >
                  <div className="flex justify-between items-start">
                    <span
                      className={`text-xs font-sans font-bold px-2 py-0.5 rounded-full ${
                        isCurrent ? "bg-primary text-white" : "bg-secondary text-muted-foreground"
                      }`}
                    >
                      {pageNum}
                    </span>
                    {isCurrent && (
                      <span className="text-[10px] uppercase font-bold tracking-wider text-primary">
                        Active
                      </span>
                    )}
                  </div>
                  
                  {/* Decorative thumbnail layout to mimic catalogue page */}
                  <div className="flex-1 flex flex-col justify-center items-center opacity-40 group-hover:opacity-75 transition-opacity py-4">
                    <FileText className={`w-8 h-8 ${isCurrent ? "text-primary" : "text-muted-foreground"}`} />
                  </div>

                  <div className="text-center">
                    <p className={`text-[11px] font-sans font-semibold uppercase tracking-wider ${isCurrent ? "text-primary" : "text-muted-foreground"}`}>
                      {pageNum === 1 ? "Cover Page" : pageNum === totalPages ? "Back Cover" : `Page ${pageNum}`}
                    </p>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </motion.div>
  );
};

export default GridViewOverlay;
