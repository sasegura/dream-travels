import { fireEvent, getByText, render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import { Header } from './header';
import { store, TestWrapper } from '@/utils/testUtils';
import { selectTravels } from '@/lib/features/rootSlice';

const mockDispatch = jest.fn();
const mockSelector = (selectorFn: any) => {
  if (selectorFn === selectTravels) {
    return [
      {
        id: 1,
        title: 'Trip to Paris',
        photo_url: 'url',
        description: 'A lovely trip to Paris',
      },
      {
        id: 2,
        title: 'Trip to New York',
        photo_url: 'url',
        description: 'A great trip to New York',
      },
    ];
  }
  return undefined;
};
jest.mock('../../lib/hooks', () => ({
  useAppSelector: () => mockSelector, // Simula que no hay viaje aleatorio seleccionado
  useAppDispatch: () => mockDispatch,
}));

const mockclose = jest.fn();
describe('Header Component', () => {
  beforeEach(() => {
    render(
      <TestWrapper>
        <Header openModal={mockclose} />
      </TestWrapper>
    );
  });
  it('must render the logo correctly', () => {
    const logo = screen.getByAltText('Portfolio Logo');
    expect(logo).toBeInTheDocument();
    expect(logo).toHaveAttribute('src', '/logo.svg');
    expect(logo).toHaveAttribute('width', '48');
    expect(logo).toHaveAttribute('height', '48');
  });

  it('must render the create new trip button', () => {
    const button = screen.getByRole('button', { name: /Create new trip/i });
    expect(button).toBeInTheDocument();
    expect(button).toHaveClass('bg-white p-12');
  });

  it('must render the logo correctly', () => {
    expect(screen.getByAltText('Portfolio Logo')).toBeInTheDocument();
  });

  it('must call openModal when the ‘Create new trip’ button is clicked', () => {
    fireEvent.click(screen.getByText('Create new trip'));

    expect(mockclose).toHaveBeenCalledTimes(1);
  });
  it('must call onCreateRandom when the ‘Create random trip’ button is clicked.', () => {
    fireEvent.click(screen.getByText('Create random trip'));

    expect(store.getState().randomTrip).toBeDefined();
  });
});
