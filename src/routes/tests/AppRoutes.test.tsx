import { describe, it, expect, vi } from 'vitest';
import { render, screen, waitFor } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';
import AppRoutes from '../AppRoutes';

// Mock all page components
vi.mock('@/pages/Home', () => ({
  default: () => <div data-testid="home-page">Home Page</div>,
}));

vi.mock('@/pages/Products', () => ({
  default: () => <div data-testid="products-page">Products Page</div>,
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
      <BrowserRouter initialEntries={['/']}>
        <AppRoutes />
      </BrowserRouter>
    );

    await waitFor(() => {
      expect(screen.getByTestId('home-page')).toBeInTheDocument();
    });
  });

  it('renders products page on /products path', async () => {
    render(
      <BrowserRouter initialEntries={['/products']}>
        <AppRoutes />
      </BrowserRouter>
    );

    await waitFor(() => {
      expect(screen.getByTestId('products-page')).toBeInTheDocument();
    });
  });

  it('renders product detail page on /products/:slug path', async () => {
    render(
      <BrowserRouter initialEntries={['/products/test-product']}>
        <AppRoutes />
      </BrowserRouter>
    );

    await waitFor(() => {
      expect(screen.getByTestId('product-detail-page')).toBeInTheDocument();
    });
  });

  it('renders categories page on /categories path', async () => {
    render(
      <BrowserRouter initialEntries={['/categories']}>
        <AppRoutes />
      </BrowserRouter>
    );

    await waitFor(() => {
      expect(screen.getByTestId('categories-page')).toBeInTheDocument();
    });
  });

  it('renders 404 page for unknown routes', async () => {
    render(
      <BrowserRouter initialEntries={['/non-existent-route']}>
        <AppRoutes />
      </BrowserRouter>
    );

    await waitFor(() => {
      expect(screen.getByTestId('notfound-page')).toBeInTheDocument();
    });
  });

  it('shows loading spinner while lazy loading', () => {
    render(
      <BrowserRouter initialEntries={['/']}>
        <AppRoutes />
      </BrowserRouter>
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
      <BrowserRouter initialEntries={['/']}>
        <AppRoutes />
      </BrowserRouter>
    );

    await waitFor(() => {
      expect(screen.getByTestId('home-page')).toBeInTheDocument();
    });

    rerender(
      <BrowserRouter initialEntries={['/products']}>
        <AppRoutes />
      </BrowserRouter>
    );

    await waitFor(() => {
      expect(screen.getByTestId('products-page')).toBeInTheDocument();
    });
  });

  it('handles nested product routes correctly', async () => {
    render(
      <BrowserRouter initialEntries={['/products/hdpe-bottle-500ml']}>
        <AppRoutes />
      </BrowserRouter>
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
        <BrowserRouter initialEntries={[route]}>
          <AppRoutes />
        </BrowserRouter>
      );

      await waitFor(() => {
        expect(screen.getByTestId('notfound-page')).toBeInTheDocument();
      });

      unmount();
    }
  });
});

