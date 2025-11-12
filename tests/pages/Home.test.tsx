import { render, screen } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';
import { describe, it, expect } from 'vitest';
import Home from '@/pages/Home';

describe('Home Page', () => {
  it('should render the home page', () => {
    render(
      <BrowserRouter>
        <Home />
      </BrowserRouter>
    );
    
    // Check for main heading
    expect(screen.getByRole('heading', { level: 1 })).toBeInTheDocument();
  });

  it('should render hero section', () => {
    render(
      <BrowserRouter>
        <Home />
      </BrowserRouter>
    );
    
    expect(screen.getByText(/plastic containers/i)).toBeInTheDocument();
  });

  it('should render featured products section', () => {
    render(
      <BrowserRouter>
        <Home />
      </BrowserRouter>
    );
    
    expect(screen.getByText(/featured products/i)).toBeInTheDocument();
  });

  it('should render CTA buttons', () => {
    render(
      <BrowserRouter>
        <Home />
      </BrowserRouter>
    );
    
    expect(screen.getByText(/view products/i)).toBeInTheDocument();
    expect(screen.getByText(/request/i)).toBeInTheDocument();
  });
});

