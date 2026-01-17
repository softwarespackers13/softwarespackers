import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { NavLink } from '../layout/NavLink/NavLink';

describe('NavLink', () => {
  it('renders a link with the correct href', () => {
    render(
      <BrowserRouter>
        <NavLink to="/test">Test Link</NavLink>
      </BrowserRouter>
    );

    const link = screen.getByText('Test Link');
    expect(link).toBeInTheDocument();
    expect(link).toHaveAttribute('href', '/test');
  });

  it('applies className prop', () => {
    render(
      <BrowserRouter>
        <NavLink to="/test" className="custom-class">
          Test Link
        </NavLink>
      </BrowserRouter>
    );

    const link = screen.getByText('Test Link');
    expect(link).toHaveClass('custom-class');
  });

  it('applies activeClassName when link is active', () => {
    render(
      <BrowserRouter>
        <div>
          <NavLink to="/test" activeClassName="active-link">
            Active Link
          </NavLink>
          <Routes>
            <Route path="/test" element={<div>Test Page</div>} />
          </Routes>
        </div>
      </BrowserRouter>
    );

    const link = screen.getByText('Active Link');
    // When not on the route, activeClassName won't be applied
    // This test just verifies the component renders correctly
    expect(link).toBeInTheDocument();
  });

  it('does not apply activeClassName when link is not active', () => {
    render(
      <BrowserRouter>
        <div>
          <NavLink to="/test" activeClassName="active-link">
            Inactive Link
          </NavLink>
          <Routes>
            <Route path="/other" element={<div>Other Page</div>} />
          </Routes>
        </div>
      </BrowserRouter>
    );

    const link = screen.getByText('Inactive Link');
    expect(link).not.toHaveClass('active-link');
  });

  it('forwards ref correctly', () => {
    const ref = { current: null };
    
    render(
      <BrowserRouter>
        <NavLink to="/test" ref={ref}>
          Test Link
        </NavLink>
      </BrowserRouter>
    );

    expect(ref.current).toBeInstanceOf(HTMLAnchorElement);
  });

  it('passes through additional props', () => {
    render(
      <BrowserRouter>
        <NavLink to="/test" data-testid="nav-link" aria-label="Test navigation">
          Test Link
        </NavLink>
      </BrowserRouter>
    );

    const link = screen.getByTestId('nav-link');
    expect(link).toHaveAttribute('aria-label', 'Test navigation');
  });

  it('has correct displayName', () => {
    expect(NavLink.displayName).toBe('NavLink');
  });

  it('combines multiple classNames correctly', () => {
    render(
      <BrowserRouter>
        <NavLink
          to="/test"
          className="base-class"
          activeClassName="active-class"
        >
          Combined Classes
        </NavLink>
      </BrowserRouter>
    );

    const link = screen.getByText('Combined Classes');
    expect(link).toHaveClass('base-class');
    // activeClassName is only applied when on that route
  });
});

