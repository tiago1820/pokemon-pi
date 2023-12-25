import React from 'react';
import { render } from '@testing-library/react';
import '@testing-library/jest-dom';
import { BrowserRouter as Router } from 'react-router-dom';
import { Nav } from '../Nav/Nav';

test('renders Nav component', () => {
  const { getAllByAltText, getByText } = render(
    <Router>
      <Nav />
    </Router>
  );

  expect(getAllByAltText('Pokemon logo')).toHaveLength(2);
  expect(getByText('Crear')).toBeInTheDocument();


});