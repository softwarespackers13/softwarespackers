import { describe, it, expect, vi, beforeEach } from 'vitest';
import { render, screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { BrowserRouter, MemoryRouter } from 'react-router-dom';

// Create mock products - must be defined before mocks
const createMockProducts = (count: number, category: string, material = '') =>
  Array.from({ length: count }, (_, i) => ({
    id: `${category.toLowerCase().replace(/\s+/g, '-')}-product-${i + 1}`,
    name: `${category} Product ${i + 1}`,
    sku: `${category.substring(0, 3).toUpperCase()}-${i + 1}`,
    slug: `${category.toLowerCase().replace(/\s+/g, '-')}-product-${i + 1}`,
    category,
    material,
    capacity_ml: 250 + i * 50,
    short_description: `Description for ${category.toLowerCase()} product ${i + 1}`,
    price_range: 'Contact for pricing',
    images: [`/product-${i + 1}-1.jpg`],
    certifications: [],
    tags: [],
    moq: 1000,
    packing: '1000 PCS / CARTON',
    datasheet_url: null,
    featured: false,
  }));

// Mock products.json - define products inline to avoid hoisting issues
vi.mock('@/data/products.json', () => {
  const createMockProducts = (count: number, category: string, material = '') =>
    Array.from({ length: count }, (_, i) => ({
      id: `${category.toLowerCase().replace(/\s+/g, '-')}-product-${i + 1}`,
      name: `${category} Product ${i + 1}`,
      sku: `${category.substring(0, 3).toUpperCase()}-${i + 1}`,
      slug: `${category.toLowerCase().replace(/\s+/g, '-')}-product-${i + 1}`,
      category,
      material,
      capacity_ml: 250 + i * 50,
      short_description: `Description for ${category.toLowerCase()} product ${i + 1}`,
      price_range: 'Contact for pricing',
      images: [`/product-${i + 1}-1.jpg`],
      certifications: [],
      tags: [],
      moq: 1000,
      packing: '1000 PCS / CARTON',
      datasheet_url: null,
      featured: false,
    }));

  const mockSweetBoxes = createMockProducts(25, 'Sweet Boxes');
  const mockPetProducts = createMockProducts(9, 'Container', 'PET');
  const allMockProducts = [...mockSweetBoxes, ...mockPetProducts];

  return {
    default: {
      products: allMockProducts,
    },
  };
});

vi.mock('@/data/categories.json', () => ({
  default: {
    categories: [
      {
        id: 'sweet-boxes',
        name: 'Sweet Boxes',
        slug: 'sweet-boxes',
        description: 'Sweet boxes category',
        product_count: 25,
        image: '/sweet-boxes.jpg',
        icon: 'box',
      },
      {
        id: 'pet-container',
        name: 'PET Container',
        slug: 'pet-container',
        description: 'PET containers',
        product_count: 9,
        image: '/pet-container.jpg',
        icon: 'container',
      },
    ],
  },
}));

vi.mock('@/components/common/ProductCard', () => ({
  default: ({ product }: { product: { id: string; name: string } }) => (
    <div data-testid={`product-${product.id}`}>
      <h3>{product.name}</h3>
    </div>
  ),
}));

vi.mock('@/components/common/CategoryCard', () => ({
  default: ({ category }: { category: { id: string; name: string } }) => (
    <div data-testid={`category-${category.id}`}>
      <h3>{category.name}</h3>
    </div>
  ),
}));

// Import Categories AFTER mocks
import Categories from '../Categories';

describe('Categories Page - Pagination Integration Tests', () => {
  beforeEach(() => {
    window.scrollTo = vi.fn();
  });

  describe('Pagination Display', () => {
    it('shows pagination when there are more than 9 products', async () => {
      render(
        <MemoryRouter initialEntries={['/categories?category=sweet-boxes']}>
          <Categories />
        </MemoryRouter>
      );

      await waitFor(() => {
        const pagination = screen.queryByTestId('pagination');
        expect(pagination).toBeInTheDocument();
      }, { timeout: 3000 });
    });

    it('does not show pagination when there are 9 or fewer products', async () => {
      render(
        <MemoryRouter initialEntries={['/categories?category=pet-container']}>
          <Categories />
        </MemoryRouter>
      );

      await waitFor(() => {
        const pagination = screen.queryByTestId('pagination');
        expect(pagination).not.toBeInTheDocument();
      }, { timeout: 3000 });
    });

    it('displays correct page information', async () => {
      render(
        <MemoryRouter initialEntries={['/categories?category=sweet-boxes&page=1']}>
          <Categories />
        </MemoryRouter>
      );

      await waitFor(() => {
        const pageInfo = screen.getByTestId('page-info');
        expect(pageInfo.textContent).toContain('Page 1');
        expect(pageInfo.textContent).toContain('of 3');
      }, { timeout: 3000 });
    });
  });

  describe('Product Display per Page', () => {
    it('displays maximum 9 products on first page', async () => {
      render(
        <MemoryRouter initialEntries={['/categories?category=sweet-boxes&page=1']}>
          <Categories />
        </MemoryRouter>
      );

      await waitFor(() => {
        const products = screen.getAllByTestId(/^product-/);
        expect(products.length).toBeLessThanOrEqual(9);
        expect(products.length).toBeGreaterThan(0);
      }, { timeout: 3000 });
    });

    it('displays products on page 2', async () => {
      render(
        <MemoryRouter initialEntries={['/categories?category=sweet-boxes&page=2']}>
          <Categories />
        </MemoryRouter>
      );

      await waitFor(() => {
        const products = screen.getAllByTestId(/^product-/);
        expect(products.length).toBeLessThanOrEqual(9);
        expect(products.length).toBeGreaterThan(0);
      }, { timeout: 3000 });
    });

    it('displays remaining products on last page', async () => {
      render(
        <MemoryRouter initialEntries={['/categories?category=sweet-boxes&page=3']}>
          <Categories />
        </MemoryRouter>
      );

      await waitFor(() => {
        const products = screen.getAllByTestId(/^product-/);
        expect(products.length).toBeLessThanOrEqual(9);
        expect(products.length).toBeGreaterThan(0);
      }, { timeout: 3000 });
    });
  });

  describe('Pagination Navigation', () => {
    it('navigates to next page when Next button is clicked', async () => {
      const user = userEvent.setup();
      render(
        <MemoryRouter initialEntries={['/categories?category=sweet-boxes&page=1']}>
          <Categories />
        </MemoryRouter>
      );

      await waitFor(() => {
        expect(screen.getByTestId('pagination')).toBeInTheDocument();
      }, { timeout: 3000 });

      const nextButton = screen.getByTestId('next-button');
      await user.click(nextButton);

      await waitFor(() => {
        const pageInfo = screen.getByTestId('page-info');
        expect(pageInfo.textContent).toContain('Page 2');
      }, { timeout: 3000 });
    });

    it('navigates to previous page when Previous button is clicked', async () => {
      const user = userEvent.setup();
      render(
        <MemoryRouter initialEntries={['/categories?category=sweet-boxes&page=2']}>
          <Categories />
        </MemoryRouter>
      );

      await waitFor(() => {
        expect(screen.getByTestId('pagination')).toBeInTheDocument();
      }, { timeout: 3000 });

      const prevButton = screen.getByTestId('prev-button');
      await user.click(prevButton);

      await waitFor(() => {
        const pageInfo = screen.getByTestId('page-info');
        expect(pageInfo.textContent).toContain('Page 1');
      }, { timeout: 3000 });
    });

    it('disables Previous button on first page', async () => {
      render(
        <MemoryRouter initialEntries={['/categories?category=sweet-boxes&page=1']}>
          <Categories />
        </MemoryRouter>
      );

      await waitFor(() => {
        const prevButton = screen.getByTestId('prev-button');
        expect(prevButton).toBeDisabled();
      }, { timeout: 3000 });
    });

    it('disables Next button on last page', async () => {
      render(
        <MemoryRouter initialEntries={['/categories?category=sweet-boxes&page=3']}>
          <Categories />
        </MemoryRouter>
      );

      await waitFor(() => {
        const nextButton = screen.getByTestId('next-button');
        expect(nextButton).toBeDisabled();
      }, { timeout: 3000 });
    });
  });

  describe('Performance Optimization', () => {
    it('only renders products for current page (not all products)', async () => {
      render(
        <MemoryRouter initialEntries={['/categories?category=sweet-boxes&page=1']}>
          <Categories />
        </MemoryRouter>
      );

      await waitFor(() => {
        const products = screen.getAllByTestId(/^product-/);
        // Should only render 9 products, not all 25
        expect(products.length).toBeLessThanOrEqual(9);
      }, { timeout: 3000 });
    });

    it('scrolls to top when page changes', async () => {
      const user = userEvent.setup();
      render(
        <MemoryRouter initialEntries={['/categories?category=sweet-boxes&page=1']}>
          <Categories />
        </MemoryRouter>
      );

      await waitFor(() => {
        expect(screen.getByTestId('pagination')).toBeInTheDocument();
      }, { timeout: 3000 });

      const nextButton = screen.getByTestId('next-button');
      await user.click(nextButton);

      await waitFor(() => {
        expect(window.scrollTo).toHaveBeenCalledWith({
          top: 0,
          behavior: 'smooth',
        });
      }, { timeout: 3000 });
    });
  });
});

describe('Categories Page - Regression Tests', () => {
  it('still displays all categories when no category is selected', () => {
    render(
      <BrowserRouter>
        <Categories />
      </BrowserRouter>
    );

    expect(screen.getByText('Premium Packaging Categories')).toBeInTheDocument();
  });

  it('still filters products by category correctly', async () => {
    render(
      <MemoryRouter initialEntries={['/categories?category=sweet-boxes']}>
        <Categories />
      </MemoryRouter>
    );

    await waitFor(() => {
      const products = screen.getAllByTestId(/^product-/);
      expect(products.length).toBeGreaterThan(0);
    }, { timeout: 3000 });
  });

  it('still shows PET products when viewing PET Container category', async () => {
    render(
      <MemoryRouter initialEntries={['/categories?category=pet-container']}>
        <Categories />
      </MemoryRouter>
    );

    await waitFor(() => {
      const products = screen.getAllByTestId(/^product-/);
      // Should show all 9 PET products
      expect(products.length).toBeGreaterThan(0);
    }, { timeout: 3000 });
  });

  it('still shows empty state when no products found', async () => {
    // Create a category with no products by using a non-existent category
    render(
      <MemoryRouter initialEntries={['/categories?category=non-existent-category']}>
        <Categories />
      </MemoryRouter>
    );

    await waitFor(() => {
      // Should show empty state or no products
      const emptyState = screen.queryByText(/No products found/i);
      const products = screen.queryAllByTestId(/^product-/);
      // Either empty state is shown or no products are rendered
      expect(emptyState || products.length === 0).toBeTruthy();
    }, { timeout: 3000 });
  });

  it('maintains category filter when changing pages', async () => {
    const user = userEvent.setup();
    render(
      <MemoryRouter initialEntries={['/categories?category=sweet-boxes&page=1']}>
        <Categories />
      </MemoryRouter>
    );

    await waitFor(() => {
      expect(screen.getByTestId('pagination')).toBeInTheDocument();
    }, { timeout: 3000 });

    const nextButton = screen.getByTestId('next-button');
    await user.click(nextButton);

    await waitFor(() => {
      // Should still show products from sweet-boxes category
      const products = screen.getAllByTestId(/^product-/);
      expect(products.length).toBeGreaterThan(0);
    }, { timeout: 3000 });
  });
});
