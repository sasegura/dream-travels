import { render, screen, fireEvent, cleanup } from '@testing-library/react';
import '@testing-library/jest-dom';
import { TravelCard } from './travelCard';
import { TestWrapper } from '@/utils/testUtils';
import { mockTravel } from '@/utils/mocks';

jest.mock('../../lib/hooks', () => ({
  useAppSelector: jest.fn().mockReturnValue(null), // Simula que no hay viaje aleatorio seleccionado
  useAppDispatch: jest.fn(),
}));

jest.mock('next/image', () => ({
  __esModule: true,
  default: ({
    src,
    alt,
    width,
    height,
  }: {
    src: string;
    alt: string;
    width: number;
    height: number;
  }) => {
    return <img src={src} alt={alt} style={{ width, height }} />;
  },
}));

const mockOnDelete = jest.fn();
const mockOnDetail = jest.fn();
const mockOnEdit = jest.fn();

describe('TravelCard Component', () => {
  beforeEach(() => {
    render(
      <TestWrapper>
        <TravelCard
          travel={mockTravel}
          onDelete={mockOnDelete}
          onEdit={mockOnEdit}
          onDetails={mockOnDetail}
        />
      </TestWrapper>
    );
  });

  afterEach(() => {
    jest.clearAllMocks();
    cleanup();
  });

  it('must render the trip details correctly', () => {
    const image = screen.getByAltText('Trip to Italy');
    expect(image).toBeInTheDocument();
    expect(image).toHaveAttribute('src', mockTravel.photo_url);

    const title = screen.getByText('Trip to Italy');
    const description = screen.getByText('A beautiful journey through Italy.');
    expect(title).toBeInTheDocument();
    expect(description).toBeInTheDocument();
  });

  it('must call the delete function with the correct ID', () => {
    const deleteButton = screen.getByText('Delete');
    fireEvent.click(deleteButton);

    expect(mockOnDelete).toHaveBeenCalledWith(1);
  });

  it('must call the edit function with the correct ID', () => {
    const deleteButton = screen.getByText('Edit');
    fireEvent.click(deleteButton);

    expect(mockOnEdit).toHaveBeenCalledWith(1);
  });

  it('must call the See trip details function with the correct ID', () => {
    const deleteButton = screen.getByText('See trip details');
    fireEvent.click(deleteButton);

    expect(mockOnDetail).toHaveBeenCalledWith(1);
  });
});
