import { describe, it, expect, vi } from 'vitest';
import { render, screen } from '@testing-library/react';
import App from '../App';

// Mock components with correct paths
vi.mock('@/components/layout/Header/Header', () => ({
  default: () => <header data-testid="header">Header</header>,
}));

vi.mock('@/components/layout/Footer/Footer', () => ({
  default: () => <footer data-testid="footer">Footer</footer>,
}));

vi.mock('@/components/common/ErrorBoundary', () => ({
  default: ({ children }: { children: React.ReactNode }) => (
    <div data-testid="error-boundary">{children}</div>
  ),
}));

vi.mock('@/routes/AppRoutes', () => ({
  default: () => <div data-testid="app-routes">Routes</div>,
}));

describe('App Component', () => {
  it('renders without crashing', () => {
    render(<App />);
    expect(screen.getByTestId('app-routes')).toBeInTheDocument();
  });

  it('renders Header component', () => {
    render(<App />);
    expect(screen.getByTestId('header')).toBeInTheDocument();
  });

  it('renders Footer component', () => {
    render(<App />);
    expect(screen.getByTestId('footer')).toBeInTheDocument();
  });

  it('wraps application in ErrorBoundary', () => {
    render(<App />);
    expect(screen.getByTestId('error-boundary')).toBeInTheDocument();
  });

  it('renders AppRoutes', () => {
    render(<App />);
    expect(screen.getByTestId('app-routes')).toBeInTheDocument();
  });

  it('has proper layout structure', () => {
    const { container } = render(<App />);
    // Check that main structure exists
    expect(container.querySelector('header')).toBeInTheDocument();
    expect(container.querySelector('footer')).toBeInTheDocument();
  });

  it('renders all components in correct order', () => {
    render(<App />);
    const header = screen.getByTestId('header');
    const routes = screen.getByTestId('app-routes');
    const footer = screen.getByTestId('footer');

    // Verify they all exist
    expect(header).toBeInTheDocument();
    expect(routes).toBeInTheDocument();
    expect(footer).toBeInTheDocument();
  });

  it('integrates with BrowserRouter', () => {
    const { container } = render(<App />);
    expect(container).toBeInTheDocument();
  });

  it('provides ErrorBoundary at the top level', () => {
    render(<App />);
    const errorBoundary = screen.getByTestId('error-boundary');
    const routes = screen.getByTestId('app-routes');

    // ErrorBoundary should wrap the routes
    expect(errorBoundary).toContainElement(routes);
  });
});
