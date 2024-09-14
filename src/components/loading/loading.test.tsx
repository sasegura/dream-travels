import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import Loading from './loading'; // Ajusta la ruta según tu estructura de carpetas

describe('Loading Component', () => {
  it('must render the Loading component correctly', () => {
    render(<Loading />);

    // Verifica que el contenedor de carga se renderiza
    expect(screen.getByTestId('loading-container')).toBeInTheDocument();

    // Verifica que el texto "Loading..." se renderiza
    expect(screen.getByText('Loading...')).toBeInTheDocument();

    // Verifica que el spinner se renderiza
    expect(screen.getByTestId('spinner')).toBeInTheDocument();
  });

  it('must apply the height passed as prop', () => {
    const height = '100px';
    render(<Loading height={height} />);

    // Verifica que el contenedor de carga tiene la altura correcta
    expect(screen.getByTestId('loading-container')).toHaveStyle(
      `height: ${height}`
    );
  });
});
