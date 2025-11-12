import { describe, it, expect, beforeEach, afterEach, vi } from 'vitest';
import { render, screen, waitFor, act } from '@testing-library/react';
import HeroCarousel from '../HeroCarousel';

describe('HeroCarousel', () => {
  beforeEach(() => {
    vi.useFakeTimers();
  });

  afterEach(() => {
    vi.restoreAllMocks();
    vi.useRealTimers();
  });

  it('should render the carousel container', () => {
    const images = ['/image1.jpg', '/image2.jpg', '/image3.jpg'];
    render(<HeroCarousel images={images} />);
    
    const carousel = screen.getByTestId('hero-carousel');
    expect(carousel).toBeInTheDocument();
  });

  it('should render all provided images', () => {
    const images = ['/image1.jpg', '/image2.jpg', '/image3.jpg'];
    const { container } = render(<HeroCarousel images={images} />);
    
    const imageElements = container.querySelectorAll('div[style*="background-image"]');
    expect(imageElements.length).toBe(images.length);
  });

  it('should display the first image as active initially', () => {
    const images = ['/image1.jpg', '/image2.jpg', '/image3.jpg'];
    const { container } = render(<HeroCarousel images={images} />);
    
    const imageElements = container.querySelectorAll('div[style*="background-image"]');
    expect(imageElements[0]).toHaveClass('opacity-100');
    expect(imageElements[1]).toHaveClass('opacity-0');
    expect(imageElements[2]).toHaveClass('opacity-0');
  });

  it('should automatically transition to the next image after interval', async () => {
    const images = ['/image1.jpg', '/image2.jpg', '/image3.jpg'];
    const { container } = render(<HeroCarousel images={images} interval={3000} />);
    
    let imageElements = container.querySelectorAll('div[style*="background-image"]');
    
    // Initially first image is active
    expect(imageElements[0]).toHaveClass('opacity-100');
    
    // Fast-forward time by 3 seconds
    await act(async () => {
      vi.advanceTimersByTime(3000);
    });
    
    // Requery elements after state update
    imageElements = container.querySelectorAll('div[style*="background-image"]');
    expect(imageElements[1]).toHaveClass('opacity-100');
    expect(imageElements[0]).toHaveClass('opacity-0');
  });

  it('should cycle back to first image after reaching the end', async () => {
    const images = ['/image1.jpg', '/image2.jpg'];
    const { container } = render(<HeroCarousel images={images} interval={2000} />);
    
    let imageElements = container.querySelectorAll('div[style*="background-image"]');
    
    // Start at first image
    expect(imageElements[0]).toHaveClass('opacity-100');
    
    // Advance to second image
    await act(async () => {
      vi.advanceTimersByTime(2000);
    });
    imageElements = container.querySelectorAll('div[style*="background-image"]');
    expect(imageElements[1]).toHaveClass('opacity-100');
    
    // Advance again - should cycle back to first
    await act(async () => {
      vi.advanceTimersByTime(2000);
    });
    imageElements = container.querySelectorAll('div[style*="background-image"]');
    expect(imageElements[0]).toHaveClass('opacity-100');
    expect(imageElements[1]).toHaveClass('opacity-0');
  });

  it('should not render any controls or navigation buttons', () => {
    const images = ['/image1.jpg', '/image2.jpg', '/image3.jpg'];
    const { container } = render(<HeroCarousel images={images} />);
    
    // Check for common control elements
    const buttons = container.querySelectorAll('button');
    const dots = container.querySelectorAll('[role="button"]');
    const arrows = container.querySelectorAll('[aria-label*="next"], [aria-label*="previous"]');
    
    expect(buttons.length).toBe(0);
    expect(dots.length).toBe(0);
    expect(arrows.length).toBe(0);
  });

  it('should handle single image without transitions', () => {
    const images = ['/image1.jpg'];
    const { container } = render(<HeroCarousel images={images} />);
    
    const imageElements = container.querySelectorAll('div[style*="background-image"]');
    expect(imageElements.length).toBe(1);
    expect(imageElements[0]).toHaveClass('opacity-100');
  });

  it('should clean up interval on unmount', () => {
    const images = ['/image1.jpg', '/image2.jpg', '/image3.jpg'];
    const { unmount } = render(<HeroCarousel images={images} />);
    
    const clearIntervalSpy = vi.spyOn(global, 'clearInterval');
    
    unmount();
    
    expect(clearIntervalSpy).toHaveBeenCalled();
  });

  it('should use default interval of 5000ms when not specified', async () => {
    const images = ['/image1.jpg', '/image2.jpg'];
    const { container } = render(<HeroCarousel images={images} />);
    
    let imageElements = container.querySelectorAll('div[style*="background-image"]');
    
    // Should not transition before 5 seconds
    await act(async () => {
      vi.advanceTimersByTime(4000);
    });
    imageElements = container.querySelectorAll('div[style*="background-image"]');
    expect(imageElements[0]).toHaveClass('opacity-100');
    
    // Should transition after 5 seconds
    await act(async () => {
      vi.advanceTimersByTime(1000);
    });
    imageElements = container.querySelectorAll('div[style*="background-image"]');
    expect(imageElements[1]).toHaveClass('opacity-100');
  });

  it('should apply smooth transition classes', () => {
    const images = ['/image1.jpg', '/image2.jpg'];
    const { container } = render(<HeroCarousel images={images} />);
    
    const imageElements = container.querySelectorAll('div[style*="background-image"]');
    
    imageElements.forEach((element) => {
      expect(element).toHaveClass('transition-opacity');
      expect(element).toHaveClass('duration-1000');
    });
  });

  it('should handle empty images array gracefully', () => {
    const images: string[] = [];
    const { container } = render(<HeroCarousel images={images} />);
    
    const carousel = screen.getByTestId('hero-carousel');
    expect(carousel).toBeInTheDocument();
    
    const imageElements = container.querySelectorAll('div[style*="background-image"]');
    expect(imageElements.length).toBe(0);
  });

  it('should cover entire container area', () => {
    const images = ['/image1.jpg', '/image2.jpg'];
    const { container } = render(<HeroCarousel images={images} />);
    
    const carousel = screen.getByTestId('hero-carousel');
    expect(carousel).toHaveClass('absolute');
    expect(carousel).toHaveClass('inset-0');
    
    const imageElements = container.querySelectorAll('div[style*="background-image"]');
    imageElements.forEach((element) => {
      expect(element).toHaveClass('absolute');
      expect(element).toHaveClass('inset-0');
    });
  });

  it('should use background cover and center positioning', () => {
    const images = ['/image1.jpg', '/image2.jpg'];
    const { container } = render(<HeroCarousel images={images} />);
    
    const imageElements = container.querySelectorAll('div[style*="background-image"]');
    
    imageElements.forEach((element) => {
      expect(element).toHaveClass('bg-cover');
      expect(element).toHaveClass('bg-center');
    });
  });
});

