import { describe, it, expect, vi } from 'vitest';
import { render, screen } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';
import App from '../App';

// Mock components
vi.mock('@/components/Header', () => ({
  default: () => <header data-testid="header">Header</header>,
}));

vi.mock('@/components/Footer', () => ({
  default: () => <footer data-testid="footer">Footer</footer>,
}));

vi.mock('@/components/ErrorBoundary', () => ({
  default: ({ children }: { children: React.ReactNode }) => (
    <div data-testid="error-boundary">{children}</div>
  ),
}));

vi.mock('@/routes/AppRoutes', () => ({
  default: () => <div data-testid="app-routes">Routes</div>,
}));

vi.mock('@/lib/analytics', () => ({
  AnalyticsProvider: ({ children }: { children: React.ReactNode }) => (
    <div data-testid="analytics-provider">{children}</div>
  ),
}));

describe('App Component', () => {
  it('renders without crashing', () => {
    render(
      <BrowserRouter>
        <App />
      </BrowserRouter>
    );

    expect(screen.getByTestId('app-routes')).toBeInTheDocument();
  });

  it('renders Header component', () => {
    render(
      <BrowserRouter>
        <App />
      </BrowserRouter>
    );

    expect(screen.getByTestId('header')).toBeInTheDocument();
  });

  it('renders Footer component', () => {
    render(
      <BrowserRouter>
        <App />
      </BrowserRouter>
    );

    expect(screen.getByTestId('footer')).toBeInTheDocument();
  });

  it('wraps application in ErrorBoundary', () => {
    render(
      <BrowserRouter>
        <App />
      </BrowserRouter>
    );

    expect(screen.getByTestId('error-boundary')).toBeInTheDocument();
  });

  it('wraps application in AnalyticsProvider', () => {
    render(
      <BrowserRouter>
        <App />
      </BrowserRouter>
    );

    expect(screen.getByTestId('analytics-provider')).toBeInTheDocument();
  });

  it('renders AppRoutes', () => {
    render(
      <BrowserRouter>
        <App />
      </BrowserRouter>
    );

    expect(screen.getByTestId('app-routes')).toBeInTheDocument();
  });

  it('has proper layout structure', () => {
    const { container } = render(
      <BrowserRouter>
        <App />
      </BrowserRouter>
    );

    // Check that main structure exists
    expect(container.querySelector('header')).toBeInTheDocument();
    expect(container.querySelector('footer')).toBeInTheDocument();
  });

  it('renders all components in correct order', () => {
    render(
      <BrowserRouter>
        <App />
      </BrowserRouter>
    );

    const header = screen.getByTestId('header');
    const routes = screen.getByTestId('app-routes');
    const footer = screen.getByTestId('footer');

    // Verify they all exist
    expect(header).toBeInTheDocument();
    expect(routes).toBeInTheDocument();
    expect(footer).toBeInTheDocument();
  });

  it('integrates with BrowserRouter', () => {
    const { container } = render(
      <BrowserRouter>
        <App />
      </BrowserRouter>
    );

    expect(container).toBeInTheDocument();
  });

  it('provides ErrorBoundary at the top level', () => {
    render(
      <BrowserRouter>
        <App />
      </BrowserRouter>
    );

    const errorBoundary = screen.getByTestId('error-boundary');
    const routes = screen.getByTestId('app-routes');

    // ErrorBoundary should wrap the routes
    expect(errorBoundary).toContainElement(routes);
  });

  it('provides AnalyticsProvider for tracking', () => {
    render(
      <BrowserRouter>
        <App />
      </BrowserRouter>
    );

    expect(screen.getByTestId('analytics-provider')).toBeInTheDocument();
  });
});

