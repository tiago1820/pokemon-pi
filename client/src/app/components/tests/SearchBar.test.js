
import React from 'react';
import { render, fireEvent } from '@testing-library/react';
import { SearchBar } from '../SearchBar/SearchBar';

test('Llama a onSearch correctamente al hacer clic en el botón de búsqueda.', () => {
    const mockOnSearch = jest.fn();
    const { getByRole, getByText } = render(<SearchBar onSearch={mockOnSearch} />);

    // Busca el input
    const inputElement = getByRole('searchbox', { name: '' });

    // Simula el cambio en el input
    fireEvent.change(inputElement, { target: { value: 'example' } });

    // Busca el botón por el texto
    const buttonElement = getByText('Search');

    // Simula hacer clic en el botón
    fireEvent.click(buttonElement);

    // Verifica que la función onSearch se haya llamado con el valor correcto
    expect(mockOnSearch).toHaveBeenCalledWith('example');
});