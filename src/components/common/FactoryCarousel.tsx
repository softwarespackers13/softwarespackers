import { useState, useEffect } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import OptimizedImage from "./OptimizedImage";
import styles from "../css/FactoryCarousel.module.css";

interface FactoryCarouselProps {
    images: string[];
    autoPlayInterval?: number;
}

const FactoryCarousel: React.FC<FactoryCarouselProps> = ({
    images,
    autoPlayInterval = 5000,
}) => {
    const [currentIndex, setCurrentIndex] = useState(0);

    useEffect(() => {
        if (images.length === 0) return;

        const interval = setInterval(() => {
            setCurrentIndex((prevIndex) => (prevIndex + 1) % images.length);
        }, autoPlayInterval);

        return () => clearInterval(interval);
    }, [images.length, autoPlayInterval]);

    const goToPrevious = () => {
        setCurrentIndex((prevIndex) =>
            prevIndex === 0 ? images.length - 1 : prevIndex - 1
        );
    };

    const goToNext = () => {
        setCurrentIndex((prevIndex) => (prevIndex + 1) % images.length);
    };

    const goToSlide = (index: number) => {
        setCurrentIndex(index);
    };

    if (images.length === 0) {
        return null;
    }

    return (
        <div className={styles.carouselContainer}>
            <div className={styles.carouselWrapper}>
                {images.map((image, index) => (
                    <div
                        key={index}
                        className={`${styles.carouselSlide} ${
                            index === currentIndex ? styles.active : ""
                        }`}
                    >
                        <OptimizedImage
                            src={image}
                            alt={`Factory image ${index + 1}`}
                            className={styles.carouselImage}
                            loading={index === 0 ? "eager" : "lazy"}
                        />
                    </div>
                ))}
            </div>

            {/* Navigation Arrows */}
            {images.length > 1 && (
                <>
                    <button
                        className={styles.navButton}
                        onClick={goToPrevious}
                        aria-label="Previous image"
                    >
                        <ChevronLeft className={styles.navIcon} />
                    </button>
                    <button
                        className={`${styles.navButton} ${styles.navButtonRight}`}
                        onClick={goToNext}
                        aria-label="Next image"
                    >
                        <ChevronRight className={styles.navIcon} />
                    </button>
                </>
            )}

            {/* Dots indicator */}
            {images.length > 1 && (
                <div className={styles.dotsContainer}>
                    {images.map((_, index) => (
                        <button
                            key={index}
                            className={`${styles.dot} ${
                                index === currentIndex ? styles.activeDot : ""
                            }`}
                            onClick={() => goToSlide(index)}
                            aria-label={`Go to slide ${index + 1}`}
                        />
                    ))}
                </div>
            )}
        </div>
    );
};

export default FactoryCarousel;
