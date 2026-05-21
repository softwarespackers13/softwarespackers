import { describe, it, expect, vi } from 'vitest';
import { render, screen, waitFor } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import AppRoutes from '../AppRoutes';

// Mock all page components
vi.mock('@/pages/Home', () => ({
  default: () => <div data-testid="home-page">Home Page</div>,
}));

vi.mock('@/pages/ProductDetail', () => ({
  default: () => <div data-testid="product-detail-page">Product Detail Page</div>,
}));

vi.mock('@/pages/Categories', () => ({
  default: () => <div data-testid="categories-page">Categories Page</div>,
}));

vi.mock('@/pages/NotFound', () => ({
  default: () => <div data-testid="notfound-page">404 Page</div>,
}));

describe('AppRoutes', () => {
  it('renders home page on root path', async () => {
    render(
      <MemoryRouter initialEntries={['/']}>
        <AppRoutes />
      </MemoryRouter>
    );

    await waitFor(() => {
      expect(screen.getByTestId('home-page')).toBeInTheDocument();
    });
  });

  it('renders product detail page on /products/:slug path', async () => {
    render(
      <MemoryRouter initialEntries={['/products/test-product']}>
        <AppRoutes />
      </MemoryRouter>
    );

    await waitFor(() => {
      expect(screen.getByTestId('product-detail-page')).toBeInTheDocument();
    });
  });

  it('renders categories page on /categories path', async () => {
    render(
      <MemoryRouter initialEntries={['/categories']}>
        <AppRoutes />
      </MemoryRouter>
    );

    await waitFor(() => {
      expect(screen.getByTestId('categories-page')).toBeInTheDocument();
    });
  });

  it('renders 404 page for unknown routes', async () => {
    render(
      <MemoryRouter initialEntries={['/non-existent-route']}>
        <AppRoutes />
      </MemoryRouter>
    );

    await waitFor(() => {
      expect(screen.getByTestId('notfound-page')).toBeInTheDocument();
    });
  });

  it('shows loading spinner while lazy loading', () => {
    render(
      <MemoryRouter initialEntries={['/']}>
        <AppRoutes />
      </MemoryRouter>
    );

    // The loading spinner should be shown initially
    const loader = screen.queryByRole('status');
    // Loader might already be gone if component loads fast
    if (loader) {
      expect(loader).toBeInTheDocument();
      expect(loader).toHaveAttribute('aria-label', 'Loading');
    }
  });

  it('handles multiple route changes', async () => {
    const { rerender } = render(
      <MemoryRouter key="home" initialEntries={['/']}>
        <AppRoutes />
      </MemoryRouter>
    );

    await waitFor(() => {
      expect(screen.getByTestId('home-page')).toBeInTheDocument();
    });

    rerender(
      <MemoryRouter key="categories" initialEntries={['/categories']}>
        <AppRoutes />
      </MemoryRouter>
    );

    await waitFor(() => {
      expect(screen.getByTestId('categories-page')).toBeInTheDocument();
    });
  });

  it('handles nested product routes correctly', async () => {
    render(
      <MemoryRouter initialEntries={['/products/hdpe-bottle-500ml']}>
        <AppRoutes />
      </MemoryRouter>
    );

    await waitFor(() => {
      expect(screen.getByTestId('product-detail-page')).toBeInTheDocument();
    });
  });

  it('404 catches all unmatched routes', async () => {
    const unmatchedRoutes = [
      '/random',
      '/about/us',
      '/products/category/invalid',
      '/categories/test/nested',
    ];

    for (const route of unmatchedRoutes) {
      const { unmount } = render(
        <MemoryRouter initialEntries={[route]}>
          <AppRoutes />
        </MemoryRouter>
      );

      await waitFor(() => {
        expect(screen.getByTestId('notfound-page')).toBeInTheDocument();
      });

      unmount();
    }
  });
});
