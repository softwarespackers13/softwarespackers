import React from "react";
import {
  ZoomIn,
  ZoomOut,
  Grid,
  Play,
  Pause,
  Maximize2,
  Minimize2,
  Share2,
  Printer,
  Download,
  Volume2,
  VolumeX,
} from "lucide-react";
import { toast } from "sonner";

interface ToolbarControlsProps {
  zoom: number;
  onZoomIn: () => void;
  onZoomOut: () => void;
  onToggleGrid: () => void;
  isPlaying: boolean;
  onTogglePlay: () => void;
  isFullscreen: boolean;
  onToggleFullscreen: () => void;
  isSoundOn: boolean;
  onToggleSound: () => void;
  onPrint: () => void;
  pdfUrl: string;
}

const ToolbarControls: React.FC<ToolbarControlsProps> = ({
  zoom,
  onZoomIn,
  onZoomOut,
  onToggleGrid,
  isPlaying,
  onTogglePlay,
  isFullscreen,
  onToggleFullscreen,
  isSoundOn,
  onToggleSound,
  onPrint,
  pdfUrl,
}) => {
  const handleShare = () => {
    navigator.clipboard.writeText(window.location.href);
    toast.success("Page link copied to clipboard!");
  };

  const buttons = [
    {
      icon: isPlaying ? <Pause className="w-5 h-5" /> : <Play className="w-5 h-5" />,
      label: isPlaying ? "Pause Autoplay" : "Autoplay",
      onClick: onTogglePlay,
      active: isPlaying,
    },
    {
      icon: <ZoomIn className="w-5 h-5" />,
      label: "Zoom In",
      onClick: onZoomIn,
      disabled: zoom >= 2.5,
    },
    {
      icon: <ZoomOut className="w-5 h-5" />,
      label: "Zoom Out",
      onClick: onZoomOut,
      disabled: zoom <= 0.8,
    },
    {
      icon: <Grid className="w-5 h-5" />,
      label: "Grid View",
      onClick: onToggleGrid,
    },
    {
      icon: isSoundOn ? <Volume2 className="w-5 h-5" /> : <VolumeX className="w-5 h-5" />,
      label: isSoundOn ? "Mute Sound" : "Enable Sound",
      onClick: onToggleSound,
      active: isSoundOn,
    },
    {
      icon: isFullscreen ? <Minimize2 className="w-5 h-5" /> : <Maximize2 className="w-5 h-5" />,
      label: isFullscreen ? "Exit Fullscreen" : "Fullscreen",
      onClick: onToggleFullscreen,
    },
    {
      icon: <Printer className="w-5 h-5" />,
      label: "Print Page",
      onClick: onPrint,
    },
    {
      icon: <Share2 className="w-5 h-5" />,
      label: "Share",
      onClick: handleShare,
    },
  ];

  return (
    <div className="flex flex-wrap items-center justify-center gap-2 p-2 bg-black/60 backdrop-blur-md border border-white/10 rounded-xl max-w-full overflow-x-auto shadow-2xl">
      {buttons.map((btn, index) => (
        <button
          key={index}
          onClick={btn.onClick}
          disabled={btn.disabled}
          title={btn.label}
          className={`p-2.5 rounded-lg transition-all duration-200 border focus-ring relative group ${
            btn.active
              ? "bg-primary text-white border-primary"
              : btn.disabled
              ? "opacity-30 cursor-not-allowed border-transparent text-gray-400"
              : "text-gray-300 border-transparent hover:bg-white/10 hover:text-white"
          }`}
          aria-label={btn.label}
        >
          {btn.icon}
          
          {/* Tooltip */}
          <span className="pointer-events-none absolute -top-10 left-1/2 -translate-x-1/2 bg-gray-900 text-white text-[10px] uppercase font-bold tracking-wider px-2 py-1 rounded opacity-0 group-hover:opacity-100 transition-opacity duration-200 shadow-md whitespace-nowrap z-30">
            {btn.label}
          </span>
        </button>
      ))}

      {/* Divider */}
      <div className="w-px h-6 bg-white/10 mx-1 hidden sm:block" />

      {/* Download Button */}
      <a
        href={pdfUrl}
        download="catalogue.pdf"
        className="p-2.5 rounded-lg transition-all duration-200 text-white border border-transparent hover:bg-primary hover:border-primary flex items-center justify-center group relative focus-ring"
        title="Download PDF"
      >
        <Download className="w-5 h-5" />
        <span className="pointer-events-none absolute -top-10 left-1/2 -translate-x-1/2 bg-gray-900 text-white text-[10px] uppercase font-bold tracking-wider px-2 py-1 rounded opacity-0 group-hover:opacity-100 transition-opacity duration-200 shadow-md whitespace-nowrap z-30">
          Download PDF
        </span>
      </a>
    </div>
  );
};

export default ToolbarControls;
