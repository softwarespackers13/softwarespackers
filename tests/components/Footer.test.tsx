import { render, screen } from '@testing-library/react';
import { describe, it, expect } from 'vitest';
import Footer from '@/components/Footer';

describe('Footer Component', () => {
  it('should render the footer', () => {
    render(<Footer />);
    
    const footer = screen.getByRole('contentinfo');
    expect(footer).toBeInTheDocument();
  });

  it('should contain copyright information', () => {
    render(<Footer />);
    
    expect(screen.getByText(/software packers/i)).toBeInTheDocument();
  });
});

