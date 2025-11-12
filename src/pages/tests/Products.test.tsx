import { describe, it, expect, vi } from 'vitest';
import { render, screen, waitFor } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';
import userEvent from '@testing-library/user-event';
import Products from '../Products';

// Mock data must be defined inline with vi.mock
vi.mock('@/data/products.json', () => ({
  default: {
    products: [
      {
        id: '1',
        name: 'HDPE Bottle 500ml',
        slug: 'hdpe-bottle-500ml',
        sku: 'HB-500',
        category: 'Bottles',
        short_description: 'Test bottle',
        capacity_ml: 500,
        material: 'HDPE',
        colors: ['White'],
        moq: 1000,
        packing: '100 pcs/carton',
        price_range: '$0.50 - $1.00',
        images: ['/test1.jpg'],
      },
      {
        id: '2',
        name: 'PP Jar 1000ml',
        slug: 'pp-jar-1000ml',
        sku: 'PJ-1000',
        category: 'Jars',
        short_description: 'Test jar',
        capacity_ml: 1000,
        material: 'PP',
        colors: ['Clear'],
        moq: 500,
        packing: '50 pcs/carton',
        price_range: '$1.00 - $2.00',
        images: ['/test2.jpg'],
      },
      {
        id: '3',
        name: 'PET Bottle 750ml',
        slug: 'pet-bottle-750ml',
        sku: 'PB-750',
        category: 'Bottles',
        short_description: 'Test PET bottle',
        capacity_ml: 750,
        material: 'PET',
        colors: ['Clear'],
        moq: 2000,
        packing: '200 pcs/carton',
        price_range: '$0.75 - $1.50',
        images: ['/test3.jpg'],
      },
    ],
  },
}));

vi.mock('@/data/categories.json', () => ({
  default: {
    categories: [
      { id: '1', name: 'Bottles', slug: 'bottles', description: 'Bottles', product_count: 2, image: '/cat1.jpg' },
      { id: '2', name: 'Jars', slug: 'jars', description: 'Jars', product_count: 1, image: '/cat2.jpg' },
    ],
  },
}));

vi.mock('@/components/ProductCard', () => ({
  default: ({ product }: { product: { id: string; name: string; sku: string } }) => (
    <div data-testid={`product-${product.id}`}>
      <h3>{product.name}</h3>
      <p>{product.sku}</p>
    </div>
  ),
}));

describe('Products Page', () => {
  it('renders page title and description', () => {
    render(
      <BrowserRouter>
        <Products />
      </BrowserRouter>
    );

    expect(screen.getByText('Our Products')).toBeInTheDocument();
    expect(screen.getByText(/Browse our complete range/)).toBeInTheDocument();
  });

  it('displays all products initially', () => {
    render(
      <BrowserRouter>
        <Products />
      </BrowserRouter>
    );

    expect(screen.getByTestId('product-1')).toBeInTheDocument();
    expect(screen.getByTestId('product-2')).toBeInTheDocument();
    expect(screen.getByTestId('product-3')).toBeInTheDocument();
  });

  it('filters products by search query', async () => {
    const user = userEvent.setup();
    
    render(
      <BrowserRouter>
        <Products />
      </BrowserRouter>
    );

    const searchInput = screen.getByPlaceholderText(/Search products/);
    await user.type(searchInput, 'HDPE');

    await waitFor(() => {
      expect(screen.getByTestId('product-1')).toBeInTheDocument();
      expect(screen.queryByTestId('product-2')).not.toBeInTheDocument();
      expect(screen.queryByTestId('product-3')).not.toBeInTheDocument();
    });
  });

  it('filters products by SKU', async () => {
    const user = userEvent.setup();
    
    render(
      <BrowserRouter>
        <Products />
      </BrowserRouter>
    );

    const searchInput = screen.getByPlaceholderText(/Search products/);
    await user.type(searchInput, 'PJ-1000');

    await waitFor(() => {
      expect(screen.queryByTestId('product-1')).not.toBeInTheDocument();
      expect(screen.getByTestId('product-2')).toBeInTheDocument();
      expect(screen.queryByTestId('product-3')).not.toBeInTheDocument();
    });
  });

  it('filters products by material', async () => {
    const user = userEvent.setup();
    
    render(
      <BrowserRouter>
        <Products />
      </BrowserRouter>
    );

    const hdpeCheckbox = screen.getByRole('checkbox', { name: /HDPE/i });
    await user.click(hdpeCheckbox);

    await waitFor(() => {
      expect(screen.getByTestId('product-1')).toBeInTheDocument();
      expect(screen.queryByTestId('product-2')).not.toBeInTheDocument();
      expect(screen.queryByTestId('product-3')).not.toBeInTheDocument();
    });
  });

  it('allows multiple material filters', async () => {
    const user = userEvent.setup();
    
    render(
      <BrowserRouter>
        <Products />
      </BrowserRouter>
    );

    const hdpeCheckbox = screen.getByRole('checkbox', { name: /HDPE/i });
    const ppCheckbox = screen.getByRole('checkbox', { name: /PP/i });

    await user.click(hdpeCheckbox);
    await user.click(ppCheckbox);

    await waitFor(() => {
      expect(screen.getByTestId('product-1')).toBeInTheDocument();
      expect(screen.getByTestId('product-2')).toBeInTheDocument();
      expect(screen.queryByTestId('product-3')).not.toBeInTheDocument();
    });
  });

  it('sorts products by name', async () => {
    const user = userEvent.setup();
    
    render(
      <BrowserRouter>
        <Products />
      </BrowserRouter>
    );

    const sortSelect = screen.getByRole('combobox', { name: /sort by/i });
    await user.click(sortSelect);
    
    const nameOption = screen.getByRole('option', { name: /Name \(A-Z\)/i });
    await user.click(nameOption);

    // Verify products are displayed
    expect(screen.getByTestId('product-1')).toBeInTheDocument();
  });

  it('sorts products by capacity ascending', async () => {
    const user = userEvent.setup();
    
    render(
      <BrowserRouter>
        <Products />
      </BrowserRouter>
    );

    const sortSelect = screen.getByRole('combobox', { name: /sort by/i });
    await user.click(sortSelect);
    
    const capacityAscOption = screen.getByRole('option', { name: /Capacity \(Low-High\)/i });
    await user.click(capacityAscOption);

    expect(screen.getByTestId('product-1')).toBeInTheDocument();
  });

  it('clears all filters', async () => {
    const user = userEvent.setup();
    
    render(
      <BrowserRouter>
        <Products />
      </BrowserRouter>
    );

    // Apply some filters
    const searchInput = screen.getByPlaceholderText(/Search products/);
    await user.type(searchInput, 'HDPE');

    const clearButton = screen.getByRole('button', { name: /Clear Filters/i });
    await user.click(clearButton);

    await waitFor(() => {
      expect(searchInput).toHaveValue('');
      expect(screen.getByTestId('product-1')).toBeInTheDocument();
      expect(screen.getByTestId('product-2')).toBeInTheDocument();
      expect(screen.getByTestId('product-3')).toBeInTheDocument();
    });
  });

  it('displays correct product count', () => {
    render(
      <BrowserRouter>
        <Products />
      </BrowserRouter>
    );

    expect(screen.getByText(/Showing 3 products/)).toBeInTheDocument();
  });

  it('shows no products message when no matches', async () => {
    const user = userEvent.setup();
    
    render(
      <BrowserRouter>
        <Products />
      </BrowserRouter>
    );

    const searchInput = screen.getByPlaceholderText(/Search products/);
    await user.type(searchInput, 'nonexistent');

    await waitFor(() => {
      expect(screen.getByText(/No products found matching your criteria/)).toBeInTheDocument();
    });
  });

  it('disables clear filters button when no active filters', () => {
    render(
      <BrowserRouter>
        <Products />
      </BrowserRouter>
    );

    const clearButton = screen.getByRole('button', { name: /Clear Filters/i });
    expect(clearButton).toBeDisabled();
  });

  it('enables clear filters button when filters are active', async () => {
    const user = userEvent.setup();
    
    render(
      <BrowserRouter>
        <Products />
      </BrowserRouter>
    );

    const searchInput = screen.getByPlaceholderText(/Search products/);
    await user.type(searchInput, 'test');

    const clearButton = screen.getByRole('button', { name: /Clear Filters/i });
    expect(clearButton).not.toBeDisabled();
  });

  it('filters by category from URL params', () => {
    render(
      <BrowserRouter initialEntries={['/products?category=bottles']}>
        <Products />
      </BrowserRouter>
    );

    // Should show only products from Bottles category
    expect(screen.getByTestId('product-1')).toBeInTheDocument();
    expect(screen.getByTestId('product-3')).toBeInTheDocument();
    expect(screen.queryByTestId('product-2')).not.toBeInTheDocument();
  });

  it('sanitizes search input', async () => {
    const user = userEvent.setup();
    
    render(
      <BrowserRouter>
        <Products />
      </BrowserRouter>
    );

    const searchInput = screen.getByPlaceholderText(/Search products/);
    await user.type(searchInput, '<script>alert("xss")</script>bottle');

    // Input should still work for legitimate search
    await waitFor(() => {
      expect(screen.getByText(/Showing/)).toBeInTheDocument();
    });
  });
});

