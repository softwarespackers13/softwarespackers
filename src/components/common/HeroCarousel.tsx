import { useState, useEffect, useCallback, useRef } from 'react';
import { cn } from '@/lib/utils';
import styles from '../css/HeroCarousel.module.css';

interface HeroCarouselProps {
  images: string[];
  interval?: number;
}

/**
 * HeroCarousel - Auto-playing background image carousel with controls
 * 
 * A carousel component that automatically cycles through images
 * with smooth fade transitions. Includes pause/play and dot navigation.
 * 
 * @param images - Array of image URLs to display
 * @param interval - Time in milliseconds between transitions (default: 5000)
 */
const HeroCarousel = ({ images, interval = 5000 }: HeroCarouselProps) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [imagesLoaded, setImagesLoaded] = useState(false);
  const carouselRef = useRef<HTMLDivElement>(null);
  const loadedImagesRef = useRef<Set<string>>(new Set());

  // Preload images for better performance with error handling
  useEffect(() => {
    if (images.length === 0) {
      setImagesLoaded(true);
      return;
    }

    // Use Promise.all for more robust loading
    const loadImage = (imageUrl: string): Promise<void> => {
      return new Promise((resolve) => {
        // Skip if already loaded
        if (loadedImagesRef.current.has(imageUrl)) {
          resolve();
          return;
        }

        const img = new Image();

        img.onload = () => {
          loadedImagesRef.current.add(imageUrl);
          resolve();
        };

        img.onerror = () => {
          if (import.meta.env.DEV) {
            console.warn(`Failed to load hero image: ${imageUrl}`);
          }
          // Still mark as loaded to prevent infinite waiting
          loadedImagesRef.current.add(imageUrl);
          resolve();
        };

        img.src = imageUrl;
      });
    };

    // Load all images in parallel
    Promise.all(images.map(loadImage))
      .then(() => {
        setImagesLoaded(true);
      })
      .catch(() => {
        // Even if some fail, mark as loaded to prevent blocking
        setImagesLoaded(true);
      });
  }, [images]);

  // Handle keyboard navigation - only when carousel is in viewport
  const handleKeyDown = useCallback((e: KeyboardEvent) => {
    // Only handle if not typing in an input/textarea
    const target = e.target as HTMLElement;
    if (target.tagName === 'INPUT' || target.tagName === 'TEXTAREA' || target.isContentEditable) {
      return;
    }

    // Check if carousel is visible in viewport using ref
    if (!carouselRef.current) return;

    const rect = carouselRef.current.getBoundingClientRect();
    const isVisible = rect.top < window.innerHeight && rect.bottom > 0;

    if (!isVisible) return;

    if (e.key === 'ArrowLeft') {
      e.preventDefault();
      setCurrentIndex((prev) => (prev === 0 ? images.length - 1 : prev - 1));
    } else if (e.key === 'ArrowRight') {
      e.preventDefault();
      setCurrentIndex((prev) => (prev === images.length - 1 ? 0 : prev + 1));
    }
  }, [images.length]);

  useEffect(() => {
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [handleKeyDown]);

  // Auto-advance carousel
  useEffect(() => {
    if (images.length <= 1 || !imagesLoaded) {
      return;
    }

    const timer = setInterval(() => {
      setCurrentIndex((prevIndex) =>
        prevIndex === images.length - 1 ? 0 : prevIndex + 1
      );
    }, interval);

    return () => clearInterval(timer);
  }, [images.length, interval, imagesLoaded]);



  if (images.length === 0) {
    return (
      <div
        ref={carouselRef}
        data-testid="hero-carousel"
        className={styles.carousel}
        aria-label="Hero carousel"
      />
    );
  }

  return (
    <div
      ref={carouselRef}
      data-testid="hero-carousel"
      className={styles.carousel}
      role="region"
      aria-label="Hero image carousel"
      aria-live="polite"
      tabIndex={-1}
    >
      {/* Loading state */}
      {!imagesLoaded && (
        <div className={styles.loadingState} aria-label="Loading images">
          <div className={styles.loadingSpinner} aria-hidden="true" />
        </div>
      )}

      {images.map((image, index) => (
        <div
          key={`carousel-image-${index}`}
          className={cn(
            styles.carouselImage,
            index === currentIndex ? styles.carouselImageActive : styles.carouselImageInactive
          )}
          style={{ backgroundImage: `url(${image})` }}
          aria-hidden={index !== currentIndex}
          aria-label={`Slide ${index + 1} of ${images.length}`}
        />
      ))}
    </div>
  );
};

export default HeroCarousel;
