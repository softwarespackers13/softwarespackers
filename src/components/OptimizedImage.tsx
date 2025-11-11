import { useState, ImgHTMLAttributes } from 'react';
import { ImageOff } from 'lucide-react';
import { cn } from '@/lib/utils';

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
        className={cn(
          'flex flex-col items-center justify-center bg-muted text-muted-foreground p-4 rounded-md',
          className
        )}
        role="img"
        aria-label={alt}
      >
        <ImageOff className="h-8 w-8 mb-2 opacity-50" aria-hidden="true" />
        <p className="text-sm text-center">{errorMessage}</p>
      </div>
    );
  }

  return (
    <div className={cn('relative overflow-hidden', className)}>
      {isLoading && (
        <div
          data-testid="image-skeleton"
          className="absolute inset-0 bg-muted animate-pulse"
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
          'w-full h-full object-cover transition-opacity duration-300',
          isLoading ? 'opacity-0' : 'opacity-100'
        )}
        {...props}
      />
    </div>
  );
};

export default OptimizedImage;

