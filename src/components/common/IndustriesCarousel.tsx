import { useState, useEffect } from "react";
import OptimizedImage from "./OptimizedImage";
import styles from "../css/IndustriesCarousel.module.css";

interface IndustryImage {
  image: string;
  name: string;
}

interface IndustriesCarouselProps {
  industries: IndustryImage[];
  autoPlayInterval?: number;
  onIndustryChange?: (industryName: string) => void;
}

const IndustriesCarousel: React.FC<IndustriesCarouselProps> = ({
  industries,
  autoPlayInterval = 4000,
  onIndustryChange,
}) => {
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    if (industries.length === 0) return;

    const interval = setInterval(() => {
      setCurrentIndex((prevIndex) => (prevIndex + 1) % industries.length);
    }, autoPlayInterval);

    return () => clearInterval(interval);
  }, [industries.length, autoPlayInterval]);

  useEffect(() => {
    if (onIndustryChange && industries[currentIndex]) {
      onIndustryChange(industries[currentIndex].name);
    }
  }, [currentIndex, industries, onIndustryChange]);

  // Call onIndustryChange on mount to set initial value
  useEffect(() => {
    if (onIndustryChange && industries[0]) {
      onIndustryChange(industries[0].name);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  if (industries.length === 0) {
    return null;
  }

  return (
    <div className={styles.carouselContainer}>
      <div className={styles.carouselWrapper}>
        {industries.map((industry, index) => (
          <div
            key={index}
            className={`${styles.carouselSlide} ${
              index === currentIndex ? styles.active : ""
            }`}
          >
            <OptimizedImage
              src={industry.image}
              alt={industry.name}
              className={styles.carouselImage}
              loading={index === 0 ? "eager" : "lazy"}
            />
            <div className={styles.imageOverlay}></div>
          </div>
        ))}
      </div>
      {/* Dots indicator */}
      <div className={styles.dotsContainer}>
        {industries.map((_, index) => (
          <button
            key={index}
            className={`${styles.dot} ${
              index === currentIndex ? styles.activeDot : ""
            }`}
            onClick={() => setCurrentIndex(index)}
            aria-label={`Go to slide ${index + 1}`}
          />
        ))}
      </div>
    </div>
  );
};

export default IndustriesCarousel;
