import React, { useState, useEffect, useImperativeHandle } from "react";
// @ts-ignore
import HTMLFlipBook from "react-pageflip";
import * as pdfjsLib from "pdfjs-dist";
import PageCanvas from "./PageCanvas";

interface FlipBookViewerProps {
  pdfDoc: pdfjsLib.PDFDocumentProxy | null;
  totalPages: number;
  currentPage: number;
  zoom: number;
  isSoundOn: boolean;
  onPageChange: (pageNum: number) => void;
  innerRef: React.RefObject<any>;
}

// Custom Page component required by react-pageflip to wrap in React.forwardRef
interface PageProps {
  density: "hard" | "soft";
  children: React.ReactNode;
}

const Page = React.forwardRef<HTMLDivElement, PageProps>((props, ref) => {
  return (
    <div
      ref={ref}
      className={`page bg-white relative select-none ${
        props.density === "hard" ? "z-20 shadow-lg" : "shadow-sm border-l border-gray-100"
      }`}
      data-density={props.density}
    >
      {props.children}
    </div>
  );
});

Page.displayName = "Page";

const FlipBookViewer: React.FC<FlipBookViewerProps> = ({
  pdfDoc,
  totalPages,
  currentPage,
  zoom,
  isSoundOn,
  onPageChange,
  innerRef,
}) => {
  const [dimensions, setDimensions] = useState({ width: 450, height: 600 });
  const [isMobile, setIsMobile] = useState(false);

  // Synthesize a premium soft paper-rustle sound effect using Web Audio API (zero asset dependency)
  const playSynthesizedFlipSound = () => {
    if (!isSoundOn) return;
    try {
      const audioCtx = new (window.AudioContext || (window as any).webkitAudioContext)();
      const bufferSize = audioCtx.sampleRate * 0.15; // 0.15 seconds
      const buffer = audioCtx.createBuffer(1, bufferSize, audioCtx.sampleRate);
      const data = buffer.getChannelData(0);
      
      // Generate soft white noise
      for (let i = 0; i < bufferSize; i++) {
        data[i] = Math.random() * 2 - 1;
      }
      
      const noiseNode = audioCtx.createBufferSource();
      noiseNode.buffer = buffer;

      // Bandpass filter centered around 1.2kHz to simulate paper rustling
      const filter = audioCtx.createBiquadFilter();
      filter.type = "bandpass";
      filter.frequency.setValueAtTime(1200, audioCtx.currentTime);
      filter.Q.setValueAtTime(2.5, audioCtx.currentTime);

      // Fade out audio curve
      const gain = audioCtx.createGain();
      gain.gain.setValueAtTime(0.06, audioCtx.currentTime);
      gain.gain.exponentialRampToValueAtTime(0.0001, audioCtx.currentTime + 0.14);

      noiseNode.connect(filter);
      filter.connect(gain);
      gain.connect(audioCtx.destination);

      noiseNode.start();
      
      setTimeout(() => {
        audioCtx.close();
      }, 200);
    } catch (e) {
      console.warn("Web Audio API blocked or not supported:", e);
    }
  };

  useEffect(() => {
    const handleResize = () => {
      const width = window.innerWidth;
      const mobile = width < 768;
      setIsMobile(mobile);

      if (mobile) {
        // Mobile single-page sizing
        const baseWidth = Math.min(width - 40, 420);
        setDimensions({
          width: baseWidth,
          height: baseWidth * 1.414, // Maintain A4 aspect ratio
        });
      } else {
        // Desktop double-page sizing
        const baseWidth = Math.min((width - 160) / 2, 450);
        setDimensions({
          width: baseWidth,
          height: baseWidth * 1.414,
        });
      }
    };

    handleResize();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const handleFlip = (e: any) => {
    const activePage = e.data + 1;
    onPageChange(activePage);
    playSynthesizedFlipSound();
  };

  return (
    <div className="relative flex items-center justify-center py-4">
      {/* react-pageflip element */}
      <HTMLFlipBook
        width={dimensions.width}
        height={dimensions.height}
        size="stretch"
        minWidth={280}
        maxWidth={700}
        minHeight={400}
        maxHeight={1000}
        maxShadowOpacity={0.4}
        showCover={true}
        mobileScrollSupport={true}
        flippingTime={700}
        usePortrait={isMobile}
        onFlip={handleFlip}
        ref={innerRef}
        className="mx-auto rounded-lg overflow-hidden"
      >
        {Array.from({ length: totalPages }, (_, idx) => {
          const pageNum = idx + 1;
          const isCover = pageNum === 1 || pageNum === totalPages;
          const density = isCover ? "hard" : "soft";

          // Optimize rendering: only load pages that are within 3 pages of the current page
          const shouldRender = Math.abs(pageNum - currentPage) <= 3;

          return (
            <Page key={pageNum} density={density}>
              <PageCanvas
                pdfDoc={pdfDoc}
                pageNumber={pageNum}
                zoom={zoom}
                shouldRender={shouldRender}
              />
            </Page>
          );
        })}
      </HTMLFlipBook>
    </div>
  );
};

export default FlipBookViewer;
