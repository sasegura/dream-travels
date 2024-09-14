import { render, screen, fireEvent, cleanup } from '@testing-library/react';
import '@testing-library/jest-dom';
import { SearchInput } from './search';
import { TestWrapper } from '@/utils/testUtils';

describe('SearchInput Component', () => {
  beforeEach(() => {
    render(
      <TestWrapper>
        <SearchInput defaultValue='Initial Value' />
      </TestWrapper>
    );
  });

  afterEach(() => {
    jest.clearAllMocks();
    cleanup();
  });

  it('should render with default value', () => {
    const input = screen.getByPlaceholderText('Search trips');
    expect(input).toHaveValue('Initial Value');
  });

  it('should update input value on change', () => {
    const input = screen.getByPlaceholderText('Search trips');
    fireEvent.change(input, { target: { value: 'New Value' } });

    expect(input).toHaveValue('New Value');
  });
});
