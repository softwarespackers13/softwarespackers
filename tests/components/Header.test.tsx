import { render, screen } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';
import { describe, it, expect } from 'vitest';
import Header from '@/components/Header';

describe('Header Component', () => {
  it('should render the header', () => {
    render(
      <BrowserRouter>
        <Header />
      </BrowserRouter>
    );
    
    const header = screen.getByRole('banner');
    expect(header).toBeInTheDocument();
  });

  it('should render navigation links', () => {
    render(
      <BrowserRouter>
        <Header />
      </BrowserRouter>
    );
    
    expect(screen.getByText(/products/i)).toBeInTheDocument();
    expect(screen.getByText(/categories/i)).toBeInTheDocument();
  });

  it('should render the logo', () => {
    render(
      <BrowserRouter>
        <Header />
      </BrowserRouter>
    );
    
    const logo = screen.getByAltText(/software packers/i);
    expect(logo).toBeInTheDocument();
  });
});

