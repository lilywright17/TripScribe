import { render, screen } from '@testing-library/react';
import { AboutUs } from './aboutUs';
import { Helmet } from 'react-helmet';


test('sets the correct page title', () => {
  render(<AboutUs />);
  const helmet = Helmet.peek();
  expect(helmet.title).toBe('TripScribe - About Us');
});

test('renders all team members an img', () => {
  render(<AboutUs />);
  const teamMembers = screen.getAllByRole('img', { name: /photo of/i });
  expect(teamMembers).toHaveLength(7); 
});

test('renders social media icons', () => {
  render(<AboutUs />);
  const linkedInIcons = screen.getAllByAltText('LinkedIn');
  const githubIcons = screen.getAllByAltText('GitHub');
  expect(linkedInIcons).toHaveLength(7);
  expect(githubIcons).toHaveLength(7);
});

