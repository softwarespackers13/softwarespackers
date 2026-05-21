import { describe, it, expect, vi } from 'vitest';
import { render, screen, fireEvent } from '@testing-library/react';
import MadeInIndiaModal from '../common/MadeInIndiaModal';

describe('MadeInIndiaModal', () => {
  it('does not render when isOpen is false', () => {
    const { container } = render(
      <MadeInIndiaModal isOpen={false} onClose={() => {}} />
    );
    expect(container.firstChild).toBeNull();
  });

  it('renders correctly when isOpen is true', () => {
    render(
      <MadeInIndiaModal isOpen={true} onClose={() => {}} />
    );

    // Verify title and copy exists
    expect(screen.getByText('Built in India. Trusted Everywhere.')).toBeInTheDocument();
    expect(screen.getByText(/Born in India, built for the world/i)).toBeInTheDocument();
  });

  it('calls onClose when close icon (X) button is clicked', () => {
    const onCloseMock = vi.fn();
    render(
      <MadeInIndiaModal isOpen={true} onClose={onCloseMock} />
    );

    const closeBtn = screen.getByLabelText('Close modal');
    fireEvent.click(closeBtn);

    expect(onCloseMock).toHaveBeenCalledTimes(1);
  });

  it('calls onClose when bottom action button is clicked', () => {
    const onCloseMock = vi.fn();
    render(
      <MadeInIndiaModal isOpen={true} onClose={onCloseMock} />
    );

    const backBtn = screen.getByText('Got it');
    fireEvent.click(backBtn);

    expect(onCloseMock).toHaveBeenCalledTimes(1);
  });

  it('calls onClose when clicking on the backdrop overlay', () => {
    const onCloseMock = vi.fn();
    render(
      <MadeInIndiaModal isOpen={true} onClose={onCloseMock} />
    );

    // Click backdrop (the outer dialog role wrapper)
    const backdrop = screen.getByRole('dialog');
    fireEvent.click(backdrop);

    expect(onCloseMock).toHaveBeenCalledTimes(1);
  });
});
