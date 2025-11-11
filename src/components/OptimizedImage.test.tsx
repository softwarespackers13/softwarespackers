import { describe, it, expect, vi } from 'vitest';
import { render, screen, waitFor } from '@testing-library/react';
import OptimizedImage from './OptimizedImage';

describe('OptimizedImage', () => {
  it('should render with alt text', () => {
    render(<OptimizedImage src="/test.jpg" alt="Test image" />);
    expect(screen.getByAltText('Test image')).toBeInTheDocument();
  });

  it('should show loading skeleton initially', () => {
    render(<OptimizedImage src="/test.jpg" alt="Test image" />);
    expect(screen.getByTestId('image-skeleton')).toBeInTheDocument();
  });

  it('should apply className to container', () => {
    const { container } = render(
      <OptimizedImage src="/test.jpg" alt="Test image" className="custom-class" />
    );
    expect(container.firstChild).toHaveClass('custom-class');
  });

  it('should have loading="lazy" by default', () => {
    render(<OptimizedImage src="/test.jpg" alt="Test image" />);
    const img = screen.getByAltText('Test image');
    expect(img).toHaveAttribute('loading', 'lazy');
  });

  it('should allow loading="eager"', () => {
    render(<OptimizedImage src="/test.jpg" alt="Test image" loading="eager" />);
    const img = screen.getByAltText('Test image');
    expect(img).toHaveAttribute('loading', 'eager');
  });

  it('should show error fallback on image load failure', async () => {
    render(<OptimizedImage src="/broken.jpg" alt="Test image" />);
    
    const img = screen.getByAltText('Test image');
    
    // Simulate image load error
    img.dispatchEvent(new Event('error'));
    
    await waitFor(() => {
      expect(screen.getByTestId('image-error')).toBeInTheDocument();
    });
  });

  it('should display custom error message', async () => {
    const errorMessage = 'Custom error message';
    render(
      <OptimizedImage 
        src="/broken.jpg" 
        alt="Test image" 
        errorMessage={errorMessage}
      />
    );
    
    const img = screen.getByAltText('Test image');
    img.dispatchEvent(new Event('error'));
    
    await waitFor(() => {
      expect(screen.getByText(errorMessage)).toBeInTheDocument();
    });
  });

  it('should hide skeleton when image loads', async () => {
    render(<OptimizedImage src="/test.jpg" alt="Test image" />);
    
    expect(screen.getByTestId('image-skeleton')).toBeInTheDocument();
    
    const img = screen.getByAltText('Test image');
    
    // Simulate image load success
    img.dispatchEvent(new Event('load'));
    
    await waitFor(() => {
      expect(screen.queryByTestId('image-skeleton')).not.toBeInTheDocument();
    });
  });

  it('should call onLoad callback when image loads', async () => {
    const onLoad = vi.fn();
    render(<OptimizedImage src="/test.jpg" alt="Test image" onLoad={onLoad} />);
    
    const img = screen.getByAltText('Test image');
    img.dispatchEvent(new Event('load'));
    
    await waitFor(() => {
      expect(onLoad).toHaveBeenCalled();
    });
  });

  it('should call onError callback when image fails', async () => {
    const onError = vi.fn();
    render(<OptimizedImage src="/broken.jpg" alt="Test image" onError={onError} />);
    
    const img = screen.getByAltText('Test image');
    img.dispatchEvent(new Event('error'));
    
    await waitFor(() => {
      expect(onError).toHaveBeenCalled();
    });
  });
});

