import React from 'react';
import { render, screen } from '@testing-library/react';
import FeedPage from "Pages/Feed/Feed";

test('renders learn react link', () => {
  render(<FeedPage/>);
  const elements = screen.getAllByText(/sign/i);
  expect(elements[0]).toBeInTheDocument();
});
