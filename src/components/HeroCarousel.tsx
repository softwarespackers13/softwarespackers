import { useState, useEffect } from 'react';

interface HeroCarouselProps {
  images: string[];
  interval?: number;
}

/**
 * HeroCarousel - Auto-playing background image carousel
 * 
 * A carousel component that automatically cycles through images
 * with smooth fade transitions. Designed to be used as a background
 * element without any visible controls.
 * 
 * @param images - Array of image URLs to display
 * @param interval - Time in milliseconds between transitions (default: 5000)
 */
const HeroCarousel = ({ images, interval = 5000 }: HeroCarouselProps) => {
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    // Don't set up interval if there are no images or only one image
    if (images.length <= 1) {
      return;
    }

    // Set up automatic image transition
    const timer = setInterval(() => {
      setCurrentIndex((prevIndex) => 
        prevIndex === images.length - 1 ? 0 : prevIndex + 1
      );
    }, interval);

    // Cleanup function to clear interval on unmount
    return () => clearInterval(timer);
  }, [images.length, interval]);

  // Don't render anything if no images provided
  if (images.length === 0) {
    return <div data-testid="hero-carousel" className="absolute inset-0" />;
  }

  return (
    <div data-testid="hero-carousel" className="absolute inset-0">
      {images.map((image, index) => (
        <div
          key={image}
          className={`absolute inset-0 bg-cover bg-center transition-opacity duration-1000 ease-in-out ${
            index === currentIndex ? 'opacity-100' : 'opacity-0'
          }`}
          style={{ backgroundImage: `url(${image})` }}
          aria-hidden={index !== currentIndex}
        />
      ))}
    </div>
  );
};

export default HeroCarousel;

