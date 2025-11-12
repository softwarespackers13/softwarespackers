import { render, screen } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';
import { describe, it, expect } from 'vitest';
import ProductCard from '@/components/ProductCard';

const mockProduct = {
  id: 1,
  name: 'Test Product',
  slug: 'test-product',
  description: 'Test description',
  category: 'bottles',
  material: 'HDPE',
  capacity: '500ml',
  price_range: '₹50-100',
  image: '/test-image.jpg',
  images: ['/test-image.jpg'],
  features: ['Feature 1', 'Feature 2'],
  applications: ['Application 1'],
  specifications: {},
  featured: true,
  available: true
};

describe('ProductCard Component', () => {
  it('should render product information', () => {
    render(
      <BrowserRouter>
        <ProductCard product={mockProduct} />
      </BrowserRouter>
    );
    
    expect(screen.getByText('Test Product')).toBeInTheDocument();
    expect(screen.getByText(/test description/i)).toBeInTheDocument();
  });

  it('should display product image', () => {
    render(
      <BrowserRouter>
        <ProductCard product={mockProduct} />
      </BrowserRouter>
    );
    
    const image = screen.getByAltText('Test Product');
    expect(image).toBeInTheDocument();
  });

  it('should be clickable and link to product detail page', () => {
    render(
      <BrowserRouter>
        <ProductCard product={mockProduct} />
      </BrowserRouter>
    );
    
    const link = screen.getByRole('link');
    expect(link).toHaveAttribute('href', '/products/test-product');
  });
});

