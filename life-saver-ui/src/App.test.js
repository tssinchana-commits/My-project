import { render, screen } from '@testing-library/react';
import App from './App';

test('renders Life Saver heading', () => {
  render(<App />);
  const headingElement = screen.getByText(/life saver/i);
  expect(headingElement).toBeInTheDocument();
});