import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';
import CategoryCard from '../CategoryCard';

const mockCategory = {
  id: '1',
  name: 'Test Category',
  slug: 'test-category',
  description: 'Test description for category',
  product_count: 10,
  image: '/test-image.jpg',
};

describe('CategoryCard', () => {
  it('renders category information correctly', () => {
    render(
      <BrowserRouter>
        <CategoryCard category={mockCategory} />
      </BrowserRouter>
    );

    expect(screen.getByText('Test Category')).toBeInTheDocument();
    expect(screen.getByText('Test description for category')).toBeInTheDocument();
    expect(screen.getByText('10 products')).toBeInTheDocument();
  });

  it('displays the correct category image', () => {
    render(
      <BrowserRouter>
        <CategoryCard category={mockCategory} />
      </BrowserRouter>
    );

    const image = screen.getByAltText('Test Category category');
    expect(image).toBeInTheDocument();
    expect(image).toHaveAttribute('src', '/test-image.jpg');
  });

  it('links to the correct products page with category filter', () => {
    render(
      <BrowserRouter>
        <CategoryCard category={mockCategory} />
      </BrowserRouter>
    );

    const link = screen.getByRole('link');
    expect(link).toHaveAttribute('href', '/products?category=test-category');
  });

  it('displays ArrowRight icon', () => {
    const { container } = render(
      <BrowserRouter>
        <CategoryCard category={mockCategory} />
      </BrowserRouter>
    );

    const icon = container.querySelector('.lucide-arrow-right');
    expect(icon).toBeInTheDocument();
  });

  it('applies hover classes correctly', () => {
    const { container } = render(
      <BrowserRouter>
        <CategoryCard category={mockCategory} />
      </BrowserRouter>
    );

    const card = container.querySelector('.product-card');
    expect(card).toHaveClass('group');
  });

  it('handles singular product count', () => {
    const singleProductCategory = {
      ...mockCategory,
      product_count: 1,
    };

    render(
      <BrowserRouter>
        <CategoryCard category={singleProductCategory} />
      </BrowserRouter>
    );

    expect(screen.getByText('1 products')).toBeInTheDocument();
  });

  it('sets lazy loading on image', () => {
    render(
      <BrowserRouter>
        <CategoryCard category={mockCategory} />
      </BrowserRouter>
    );

    const image = screen.getByAltText('Test Category category');
    expect(image).toHaveAttribute('loading', 'lazy');
  });
});

