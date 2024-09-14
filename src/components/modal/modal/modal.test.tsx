import { render, screen, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom';
import { CustomModal } from './modal';

jest.mock('../../../hooks/useDisableScroll', () => jest.fn());

describe('CustomModal Component', () => {
  const mockOnCancel = jest.fn();

  beforeEach(() => {
    render(
      <CustomModal isOpen={false} onCancel={mockOnCancel}>
        <div>Modal Content</div>
      </CustomModal>
    );
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  it('must not render the modal when isOpen is false', () => {
    expect(screen.queryByText('Modal Content')).not.toBeInTheDocument();
  });
});

describe('CustomModal Component', () => {
  const mockOnCancel = jest.fn();

  beforeEach(() => {
    render(
      <CustomModal isOpen={true} onCancel={mockOnCancel}>
        <div>Modal Content</div>
      </CustomModal>
    );
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  it('must render the modal when isOpen is true', () => {
    expect(screen.getByText('Modal Content')).toBeInTheDocument();
  });

  it('must call onCancel when the overlay is clicked.', () => {
    fireEvent.click(screen.getByTestId('modal_overLay')); // Simula clic en el overlay
    expect(mockOnCancel).toHaveBeenCalledTimes(1);
  });

  it('should stop the propagation of the click within the content of the modal.', () => {
    fireEvent.click(screen.getByText('Modal Content')); // Simula clic dentro del contenido
    expect(mockOnCancel).not.toHaveBeenCalled(); // El clic no debería llamar a onCancel
  });
});
