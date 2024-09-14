import { fireEvent, render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import { Tabs } from './tabs';

describe('Tabs Component', () => {
  const mockSetSelectedButton = jest.fn();

  beforeEach(() => {
    mockSetSelectedButton.mockClear();
    render(
      <Tabs selectedButton='all' setSelectedButton={mockSetSelectedButton} />
    );
  });

  it('should render all three tab buttons', () => {
    expect(screen.getByText('All')).toBeInTheDocument();
    expect(screen.getByText('Upcoming')).toBeInTheDocument();
    expect(screen.getByText('Completed')).toBeInTheDocument();
  });

  it('should call setSelectedButton when a tab is clicked', () => {
    fireEvent.click(screen.getByText('Upcoming'));
    expect(mockSetSelectedButton).toHaveBeenCalledWith('upcoming');

    fireEvent.click(screen.getByText('Completed'));
    expect(mockSetSelectedButton).toHaveBeenCalledWith('completed');
  });
});
