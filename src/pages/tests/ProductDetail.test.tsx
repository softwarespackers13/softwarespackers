import { describe, it, expect, vi } from 'vitest';
import { render, screen } from '@testing-library/react';
import { MemoryRouter, Route, Routes } from 'react-router-dom';
import userEvent from '@testing-library/user-event';
import ProductDetail from '../ProductDetail';

// Mock data must be defined before vi.mock
vi.mock('@/data/products.json', () => ({
  default: {
    products: [
      {
        id: '1',
        name: 'Test Bottle',
        slug: 'test-bottle',
        sku: 'TB-001',
        category: 'Bottles',
        short_description: 'A test bottle',
        long_description: 'This is a longer description of the test bottle',
        capacity_ml: 500,
        material: 'HDPE',
        colors: ['White', 'Blue'],
        moq: 1000,
        packing: '100 pcs/carton',
        price_range: '$0.50 - $1.00',
        images: ['/test1.jpg', '/test2.jpg'],
        dimensions_mm: { dia: 50, height: 150 },
        certifications: ['FDA', 'ISO'],
        tags: ['bottle', 'hDPE'],
        featured: false,
        datasheet_url: null,
      },
      {
        id: '2',
        name: 'Related Bottle',
        slug: 'related-bottle',
        sku: 'RB-001',
        category: 'Bottles',
        short_description: 'A related bottle',
        long_description: 'This is a related product',
        capacity_ml: 750,
        material: 'PET',
        colors: ['Clear'],
        moq: 500,
        packing: '50 pcs/carton',
        price_range: '$1.00 - $2.00',
        images: ['/related1.jpg'],
        dimensions_mm: {},
        certifications: [],
        tags: ['bottle', 'pet'],
        featured: false,
        datasheet_url: null,
      },
    ],
    productGroups: [],
    standaloneProducts: [],
  },
}));

vi.mock('@/components/common/RelatedProductCard', () => ({
  default: ({ product }: { product: { id: string; name: string } }) => (
    <div data-testid={`product-card-${product.id}`}>{product.name}</div>
  ),
}));

vi.mock('@/components/common/OptimizedImage', () => ({
  default: ({ src, alt, className }: { src: string; alt: string; className?: string }) => (
    <img src={src} alt={alt} className={className} />
  ),
}));

vi.mock('@/components/common/WhatsAppButton', () => ({
  default: () => null,
}));

vi.mock('@/config/constants', () => ({
  COMPANY_WHATSAPP: '+1234567890',
}));

describe('ProductDetail Page', () => {
  it('renders product details correctly', () => {
    render(
      <MemoryRouter initialEntries={['/products/test-bottle']}>
        <Routes>
          <Route path="/products/:slug" element={<ProductDetail />} />
        </Routes>
      </MemoryRouter>
    );

    expect(screen.getByText('Test Bottle')).toBeInTheDocument();
    expect(screen.getByText(/TB-001/)).toBeInTheDocument();
    expect(screen.getByText('A test bottle')).toBeInTheDocument();
  });

  it('displays product not found message for invalid slug', () => {
    render(
      <MemoryRouter initialEntries={['/products/non-existent']}>
        <Routes>
          <Route path="/products/:slug" element={<ProductDetail />} />
        </Routes>
      </MemoryRouter>
    );

    expect(screen.getByText('Product not found')).toBeInTheDocument();
    expect(screen.getByText('Back to Products')).toBeInTheDocument();
  });

  it('displays key specifications', () => {
    render(
      <MemoryRouter initialEntries={['/products/test-bottle']}>
        <Routes>
          <Route path="/products/:slug" element={<ProductDetail />} />
        </Routes>
      </MemoryRouter>
    );

    expect(screen.getByText('500 ml')).toBeInTheDocument();
    expect(screen.getAllByText('HDPE')[0]).toBeInTheDocument();
    expect(screen.getByText('100 pcs/carton')).toBeInTheDocument();
  });

  it('displays product images', () => {
    render(
      <MemoryRouter initialEntries={['/products/test-bottle']}>
        <Routes>
          <Route path="/products/:slug" element={<ProductDetail />} />
        </Routes>
      </MemoryRouter>
    );

    const images = screen.getAllByRole('img');
    expect(images.length).toBeGreaterThan(0);
    expect(images[0]).toHaveAttribute('src', '/test1.jpg');
  });

  it('allows switching between product images', async () => {
    const user = userEvent.setup();

    render(
      <MemoryRouter initialEntries={['/products/test-bottle']}>
        <Routes>
          <Route path="/products/:slug" element={<ProductDetail />} />
        </Routes>
      </MemoryRouter>
    );

    const thumbnailButtons = screen.getAllByLabelText(/View image/);
    expect(thumbnailButtons).toHaveLength(2);

    await user.click(thumbnailButtons[1]);

    // The main image should now be the second image
    const mainImage = screen.getByAltText(/Test Bottle - view 2/);
    expect(mainImage).toBeInTheDocument();
  });

  it('renders description correctly', () => {
    render(
      <MemoryRouter initialEntries={['/products/test-bottle']}>
        <Routes>
          <Route path="/products/:slug" element={<ProductDetail />} />
        </Routes>
      </MemoryRouter>
    );

    expect(screen.getByText('Description')).toBeInTheDocument();
    expect(screen.getByText('This is a longer description of the test bottle')).toBeInTheDocument();
  });

  it('displays related products', () => {
    render(
      <MemoryRouter initialEntries={['/products/test-bottle']}>
        <Routes>
          <Route path="/products/:slug" element={<ProductDetail />} />
        </Routes>
      </MemoryRouter>
    );

    expect(screen.getByText('Related Products')).toBeInTheDocument();
    expect(screen.getByTestId('product-card-2')).toBeInTheDocument();
  });

  it('renders CTA buttons', () => {
    render(
      <MemoryRouter initialEntries={['/products/test-bottle']}>
        <Routes>
          <Route path="/products/:slug" element={<ProductDetail />} />
        </Routes>
      </MemoryRouter>
    );

    expect(screen.getByText('Request Sample')).toBeInTheDocument();
    expect(screen.getByText('Add to Quote')).toBeInTheDocument();
  });

  it('displays back to categories button', () => {
    render(
      <MemoryRouter initialEntries={['/products/test-bottle']}>
        <Routes>
          <Route path="/products/:slug" element={<ProductDetail />} />
        </Routes>
      </MemoryRouter>
    );

    const backButtons = screen.getAllByText('Back to Products');
    expect(backButtons.length).toBeGreaterThan(0);
  });

  it('formats capacity correctly', () => {
    render(
      <MemoryRouter initialEntries={['/products/test-bottle']}>
        <Routes>
          <Route path="/products/:slug" element={<ProductDetail />} />
        </Routes>
      </MemoryRouter>
    );

    expect(screen.getByText(/ml|L/)).toBeInTheDocument();
  });
});
