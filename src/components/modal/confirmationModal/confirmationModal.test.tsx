import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom';
import { ConfirmationModal } from './confirmationModal';
import useDisableScroll from '../../../hooks/useDisableScroll';

jest.mock('.../../../hooks/useDisableScroll', () => jest.fn());

jest.mock('../modal/modal', () => ({
  CustomModal: ({
    isOpen,
    onCancel,
    children,
  }: {
    isOpen: boolean;
    onCancel: () => void;
    children: React.ReactNode;
  }) => {
    if (!isOpen) return null;
    return (
      <div>
        <button onClick={onCancel}>Mock Close</button>
        {children}
      </div>
    );
  },
}));

describe('ConfirmationModal open true', () => {
  const mockOnConfirm = jest.fn();
  const mockOnCancel = jest.fn();

  beforeEach(() => {
    render(
      <ConfirmationModal
        isOpen={true}
        onConfirm={mockOnConfirm}
        onCancel={mockOnCancel}
      />
    );
  });
  afterEach(() => {
    jest.clearAllMocks();
  });

  it('renders correctly when isOpen is true', () => {
    expect(
      screen.getByText('Are you sure you want to delete this trip?')
    ).toBeInTheDocument();
  });

  it('calls onConfirm when the delete button is clicked', () => {
    const deleteButton = screen.getByText('Delete');
    fireEvent.click(deleteButton);

    expect(mockOnConfirm).toHaveBeenCalledTimes(1);
  });

  it('calls onCancel when the cancel button is clicked', () => {
    const cancelButton = screen.getByText('Cancel');
    fireEvent.click(cancelButton);

    expect(mockOnCancel).toHaveBeenCalledTimes(1);
  });

  it('calls useDisableScroll with correct value', () => {
    expect(useDisableScroll).toHaveBeenCalledWith(true);
  });
});

describe('ConfirmationModal open false', () => {
  const mockOnConfirm = jest.fn();
  const mockOnCancel = jest.fn();

  beforeEach(() => {
    render(
      <ConfirmationModal
        isOpen={false}
        onConfirm={mockOnConfirm}
        onCancel={mockOnCancel}
      />
    );
  });
  afterEach(() => {
    jest.clearAllMocks();
  });

  it('not rendered when isOpen is false', () => {
    expect(
      screen.queryByText('Are you sure you want to delete this trip?')
    ).not.toBeInTheDocument();
  });
});
