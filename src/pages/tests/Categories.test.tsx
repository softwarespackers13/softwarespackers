import { describe, it, expect, vi } from 'vitest';
import { render, screen } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';
import Categories from '../Categories';

// Mock the categories data
vi.mock('@/data/categories.json', () => ({
  default: {
    categories: [
      {
        id: '1',
        name: 'Bottles',
        slug: 'bottles',
        description: 'Various plastic bottles',
        product_count: 5,
        image: '/test-bottle.jpg',
      },
      {
        id: '2',
        name: 'Jars',
        slug: 'jars',
        description: 'Food storage jars',
        product_count: 3,
        image: '/test-jar.jpg',
      },
      {
        id: '3',
        name: 'Caps',
        slug: 'caps',
        description: 'Bottle caps and closures',
        product_count: 8,
        image: '/test-cap.jpg',
      },
    ],
  },
}));

// Mock CategoryCard component
vi.mock('@/components/common/CategoryCard', () => ({
  default: ({ category }: { category: { id: string; name: string; description: string } }) => (
    <div data-testid={`category-${category.id}`}>
      <h3>{category.name}</h3>
      <p>{category.description}</p>
    </div>
  ),
}));

describe('Categories Page', () => {
  it('renders the page title', () => {
    render(
      <BrowserRouter>
        <Categories />
      </BrowserRouter>
    );

    expect(screen.getByText('Premium Packaging Categories')).toBeInTheDocument();
  });

  it('renders the page description', () => {
    render(
      <BrowserRouter>
        <Categories />
      </BrowserRouter>
    );

    expect(
      screen.getByText(/Precision polymer manufacturing for global industry standards/i)
    ).toBeInTheDocument();
  });

  it('renders all category cards', () => {
    render(
      <BrowserRouter>
        <Categories />
      </BrowserRouter>
    );

    expect(screen.getByTestId('category-1')).toBeInTheDocument();
    expect(screen.getByTestId('category-2')).toBeInTheDocument();
    expect(screen.getByTestId('category-3')).toBeInTheDocument();
  });

  it('displays category names', () => {
    render(
      <BrowserRouter>
        <Categories />
      </BrowserRouter>
    );

    expect(screen.getByText('Bottles')).toBeInTheDocument();
    expect(screen.getByText('Jars')).toBeInTheDocument();
    expect(screen.getByText('Caps')).toBeInTheDocument();
  });

  it('displays category descriptions', () => {
    render(
      <BrowserRouter>
        <Categories />
      </BrowserRouter>
    );

    expect(screen.getByText('Various plastic bottles')).toBeInTheDocument();
    expect(screen.getByText('Food storage jars')).toBeInTheDocument();
    expect(screen.getByText('Bottle caps and closures')).toBeInTheDocument();
  });

  it('has proper container structure', () => {
    const { container } = render(
      <BrowserRouter>
        <Categories />
      </BrowserRouter>
    );

    // Check for CSS module classes (they have hashed names)
    const pageContainer = container.querySelector('[class*="pageContainer"]');
    const mainContainer = container.querySelector('[class*="container"]');

    expect(pageContainer).toBeInTheDocument();
    expect(mainContainer).toBeInTheDocument();
  });
});

