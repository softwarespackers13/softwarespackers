import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';
import CategoryCard from '../common/CategoryCard';

const mockCategory = {
  id: '1',
  name: 'Test Category',
  slug: 'test-category',
  description: 'Test description for category',
  product_count: 10,
  image: '/test-image.jpg',
};

describe('CategoryCard', () => {
  it('renders category name and action text correctly', () => {
    render(
      <BrowserRouter>
        <CategoryCard category={mockCategory} />
      </BrowserRouter>
    );

    expect(screen.getByText('Test Category')).toBeInTheDocument();
    expect(screen.getByText('Explore Products')).toBeInTheDocument();
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

  it('links to the correct categories page with category filter', () => {
    render(
      <BrowserRouter>
        <CategoryCard category={mockCategory} />
      </BrowserRouter>
    );

    const link = screen.getByRole('link');
    expect(link).toHaveAttribute('href', '/categories?category=test-category');
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

