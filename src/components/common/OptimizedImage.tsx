import { useState, ImgHTMLAttributes } from 'react';
import { ImageOff } from 'lucide-react';
import { cn } from '@/lib/utils';
import styles from '../css/OptimizedImage.module.css';

interface OptimizedImageProps extends Omit<ImgHTMLAttributes<HTMLImageElement>, 'onLoad' | 'onError'> {
  src: string;
  alt: string;
  className?: string;
  errorMessage?: string;
  onLoad?: () => void;
  onError?: () => void;
}

const OptimizedImage = ({
  src,
  alt,
  className,
  errorMessage = 'Failed to load image',
  loading = 'lazy',
  onLoad,
  onError,
  ...props
}: OptimizedImageProps) => {
  const [isLoading, setIsLoading] = useState(true);
  const [hasError, setHasError] = useState(false);

  const handleLoad = () => {
    setIsLoading(false);
    if (onLoad) {
      onLoad();
    }
  };

  const handleError = () => {
    setIsLoading(false);
    setHasError(true);
    if (onError) {
      onError();
    }
  };

  if (hasError) {
    return (
      <div
        data-testid="image-error"
        className={cn(styles.errorContainer, className)}
        role="img"
        aria-label={alt}
      >
        <ImageOff className={styles.errorIcon} aria-hidden="true" />
        <p className={styles.errorMessage}>{errorMessage}</p>
      </div>
    );
  }

  return (
    <div className={cn(styles.imageContainer, className)}>
      {isLoading && (
        <div
          data-testid="image-skeleton"
          className={styles.skeleton}
          aria-label="Loading image"
        />
      )}
      <img
        src={src}
        alt={alt}
        loading={loading}
        onLoad={handleLoad}
        onError={handleError}
        className={cn(
          styles.image,
          isLoading ? styles.imageLoading : styles.imageLoaded
        )}
        {...props}
      />
    </div>
  );
};

export default OptimizedImage;

