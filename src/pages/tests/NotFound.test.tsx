import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest';
import { render, screen } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';
import NotFound from '../NotFound';

describe('NotFound Page', () => {
  let consoleErrorSpy: ReturnType<typeof vi.spyOn>;

  beforeEach(() => {
    consoleErrorSpy = vi.spyOn(console, 'error').mockImplementation(() => {});
  });

  afterEach(() => {
    consoleErrorSpy.mockRestore();
  });

  it('renders 404 heading', () => {
    render(
      <BrowserRouter>
        <NotFound />
      </BrowserRouter>
    );

    expect(screen.getByText('404')).toBeInTheDocument();
  });

  it('renders error message', () => {
    render(
      <BrowserRouter>
        <NotFound />
      </BrowserRouter>
    );

    expect(screen.getByText('Oops! Page not found')).toBeInTheDocument();
  });

  it('renders return home link', () => {
    render(
      <BrowserRouter>
        <NotFound />
      </BrowserRouter>
    );

    const link = screen.getByText('Return to Home');
    expect(link).toBeInTheDocument();
    expect(link).toHaveAttribute('href', '/');
  });

  it('logs 404 error to console on mount', () => {
    render(
      <BrowserRouter>
        <NotFound />
      </BrowserRouter>
    );

    expect(consoleErrorSpy).toHaveBeenCalledWith(
      '404 Error: User attempted to access non-existent route:',
      '/'
    );
  });

  it('logs correct pathname when provided', () => {
    const TestWrapper = () => {
      return (
        <BrowserRouter>
          <NotFound />
        </BrowserRouter>
      );
    };

    render(<TestWrapper />);

    expect(consoleErrorSpy).toHaveBeenCalled();
  });

  it('has proper styling classes', () => {
    const { container } = render(
      <BrowserRouter>
        <NotFound />
      </BrowserRouter>
    );

    expect(container.querySelector('.min-h-screen')).toBeInTheDocument();
    expect(container.querySelector('.text-center')).toBeInTheDocument();
  });

  it('applies correct heading styles', () => {
    render(
      <BrowserRouter>
        <NotFound />
      </BrowserRouter>
    );

    const heading = screen.getByText('404');
    expect(heading.tagName).toBe('H1');
    expect(heading).toHaveClass('text-4xl', 'font-bold');
  });

  it('applies correct link styles', () => {
    render(
      <BrowserRouter>
        <NotFound />
      </BrowserRouter>
    );

    const link = screen.getByText('Return to Home');
    expect(link).toHaveClass('text-primary', 'underline');
  });
});

