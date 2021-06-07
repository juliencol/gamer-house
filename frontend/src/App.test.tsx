import React from 'react';
import { render, screen } from '@testing-library/react';
import FeedPage from "Pages/Feed/Feed";
import ProfilePage from "Pages/Profil/Profil"
import Profile from 'Components/Profil/Profil';

test('renders learn react link', () => {
  render(<ProfilePage/>);
  const elements = screen.getAllByText(/sign/i);
  expect(elements[0]).toBeInTheDocument();
});
