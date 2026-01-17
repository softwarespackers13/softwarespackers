import { useState, useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import { Badge } from '@/components/ui/badge';
import OptimizedImage from './OptimizedImage';
import { cn } from '@/lib/utils';
import styles from '../css/ProductCarouselCard.module.css';

interface Product {
    id: string;
    name: string;
    slug: string;
    material: string;
    images: string[];
}

interface ProductCarouselCardProps {
    products: Product[];
    cardSize: 'large' | 'medium' | 'small';
    interval?: number;
    startDelay?: number;
}

/**
 * ProductCarouselCard - Auto-rotating product card carousel
 * 
 * Displays a single product card that automatically cycles through
 * a list of products with smooth fade transitions.
 * 
 * @param products - Array of products to cycle through
 * @param cardSize - Size variant: 'large', 'medium', or 'small'
 * @param interval - Time in milliseconds between transitions (default: 4000)
 * @param startDelay - Delay before starting auto-rotation (default: 0)
 */
const ProductCarouselCard = ({
    products,
    cardSize,
    interval = 4000,
    startDelay = 0
}: ProductCarouselCardProps) => {
    const [currentIndex, setCurrentIndex] = useState(0);
    const [isLoaded, setIsLoaded] = useState(false);
    const [isPaused, setIsPaused] = useState(false);
    const intervalRef = useRef<NodeJS.Timeout | null>(null);
    const startDelayRef = useRef<NodeJS.Timeout | null>(null);

    // Handle auto-rotation initialization
    useEffect(() => {
        if (products.length <= 1) {
            setIsLoaded(true);
            return;
        }

        // Initial delay before starting rotation
        if (startDelay > 0) {
            startDelayRef.current = setTimeout(() => {
                setIsLoaded(true);
            }, startDelay);
        } else {
            setIsLoaded(true);
        }

        return () => {
            if (startDelayRef.current) {
                clearTimeout(startDelayRef.current);
                startDelayRef.current = null; // Explicitly set to null
            }
        };
    }, [products.length, startDelay]);

    // Auto-rotate carousel
    useEffect(() => {
        if (!isLoaded || products.length <= 1 || isPaused) {
            return;
        }

        // Clear any existing interval
        if (intervalRef.current) {
            clearInterval(intervalRef.current);
            intervalRef.current = null; // Explicitly set to null
        }

        // Start the rotation
        intervalRef.current = setInterval(() => {
            setCurrentIndex((prevIndex) => {
                const nextIndex = prevIndex === products.length - 1 ? 0 : prevIndex + 1;
                return nextIndex;
            });
        }, interval);

        return () => {
            if (intervalRef.current) {
                clearInterval(intervalRef.current);
                intervalRef.current = null; // Explicitly set to null
            }
        };
    }, [isLoaded, products.length, interval, isPaused]);

    if (products.length === 0) {
        return null;
    }

    const currentProduct = products[currentIndex];

    return (
        <Link
            to={`/products/${currentProduct.slug}`}
            className={cn(
                styles.productCard,
                styles[`productCard${cardSize.charAt(0).toUpperCase() + cardSize.slice(1)}`]
            )}
            aria-label={`View ${currentProduct.name}`}
            onMouseEnter={() => setIsPaused(true)}
            onMouseLeave={() => setIsPaused(false)}
        >
            <div className={styles.productImageWrapper}>
                {products.map((product, index) => (
                    <div
                        key={`${product.id}-${index}`}
                        className={cn(
                            styles.productImageContainer,
                            index === currentIndex ? styles.productImageActive : styles.productImageInactive
                        )}
                    >
                        <OptimizedImage
                            src={product.images[0]}
                            alt={product.name}
                            className={styles.productImage}
                            loading={index === 0 ? "eager" : "lazy"}
                        />
                    </div>
                ))}
                <div className={styles.productOverlay}>
                    <Badge variant="secondary" className={styles.productBadge}>
                        {currentProduct.material}
                    </Badge>
                    <p className={styles.productName}>{currentProduct.name}</p>
                </div>
            </div>
        </Link>
    );
};

export default ProductCarouselCard;

