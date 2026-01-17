import { defineConfig } from "vite";
import react from "@vitejs/plugin-react-swc";
import path from "path";
import { componentTagger } from "lovable-tagger";
import { compression } from "vite-plugin-compression2";

// https://vitejs.dev/config/
export default defineConfig(({ mode }) => ({
  server: {
    host: "::",
    port: 8080,
    // Allow Cloudflare Tunnel and other external hosts
    allowedHosts: [
      '.trycloudflare.com',
      'localhost',
      '127.0.0.1',
    ],
  },
  plugins: [
    react(),
    mode === "development" && componentTagger(),
    // Compression for production (Gzip and Brotli)
    mode === "production" && compression({
      algorithms: ["gzip", "brotli"],
      exclude: [/\.(br)$/, /\.(gz)$/],
    }),
  ].filter(Boolean),
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
    },
  },
  build: {
    // Production optimizations
    minify: "terser",
    terserOptions: {
      compress: {
        drop_console: mode === "production", // Remove console logs in production
        drop_debugger: true,
      },
    },
    rollupOptions: {
      output: {
        // Manual chunk splitting for better caching
        manualChunks: {
          vendor: ["react", "react-dom", "react-router-dom"],
          ui: ["@radix-ui/react-dialog", "@radix-ui/react-dropdown-menu"],
        },
      },
    },
    // Enable source maps for production debugging
    sourcemap: mode !== "production",
    // Chunk size warnings
    chunkSizeWarningLimit: 1000,
  },
}));
