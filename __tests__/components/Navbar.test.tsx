import { render, screen } from '@testing-library/react';
import Navbar from '../../src/components/layout/Navbar';
import React from 'react';

describe('Navbar Component', () => {
  it('renders correctly', () => {
    render(<Navbar />);
    expect(screen.getByText("BLR Cafe")).toBeInTheDocument();
  });
});
