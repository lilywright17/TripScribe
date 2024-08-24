import React from 'react';
import { BrowserRouter as Router } from 'react-router-dom';
import { render, screen } from '@testing-library/react';
import { fireEvent } from '@testing-library/react';
import ResponsiveNavbar from './responsiveNavbar';

test('renders the navbar with TRIPSCRIBE text', () => {
  render(
    <Router>
      <ResponsiveNavbar />
    </Router>
  );

  const titleElement = screen.getAllByText(/TRIPSCRIBE/i);
  expect(titleElement.length).toBeGreaterThan(0);
});


test('renders the navbar with navigation links', () => {
  render(
    <Router>
      <ResponsiveNavbar />
    </Router>
  );

  const addTripLink = screen.getAllByText(/Add Trip/i);
  expect(addTripLink.length).toBeGreaterThan(0); // Appears in both mobile and desktop views

  const myTripsLink = screen.getAllByText(/My Trips/i);
  expect(myTripsLink.length).toBeGreaterThan(0); // Appears in both mobile and desktop views

  const mapViewLink = screen.getAllByText(/Map View/i);
  expect(mapViewLink.length).toBeGreaterThan(0); // Appears in both mobile and desktop views
});

test('clicking on the TRIPSCRIBE title navigates to the My Trips page', () => {
  render(
    <Router>
      <ResponsiveNavbar />
    </Router>
  );

  const titleElement = screen.getAllByText(/TRIPSCRIBE/i);
  fireEvent.click(titleElement[0]);

  expect(window.location.pathname).toBe('/mytrips');
});

