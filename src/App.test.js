import { render, screen } from '@testing-library/react';
import App from './App';

test('renders NutriPlan heading', () => {
  render(<App />);
  const heading = screen.getByText(/nutriplan/i);
  expect(heading).toBeInTheDocument();
});
