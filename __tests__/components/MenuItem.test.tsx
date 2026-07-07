import { render, screen, fireEvent } from '@testing-library/react';
import MenuItem from '../../src/components/menu/MenuItem';
import { CartProvider } from '../../src/context/CartContext';
import React from 'react';

describe('MenuItem Component', () => {
  const defaultProps = {
    id: 'm1',
    name: 'Butter Chicken',
    price: 350,
    description: 'Creamy and delicious',
    image: 'https://test.com/img.jpg'
  };

  const renderWithContext = (ui: React.ReactElement) => {
    return render(<CartProvider>{ui}</CartProvider>);
  };

  it('renders menu item correctly', () => {
    renderWithContext(<MenuItem {...defaultProps} />);
    
    expect(screen.getByText('Butter Chicken')).toBeInTheDocument();
    expect(screen.getByText('₹350')).toBeInTheDocument();
    expect(screen.getByText('Creamy and delicious')).toBeInTheDocument();
    
    const img = screen.getByAltText('Butter Chicken');
    expect(img).toHaveAttribute('src', 'https://test.com/img.jpg');
  });

  it('adds item to cart on button click', () => {
    renderWithContext(<MenuItem {...defaultProps} />);
    
    const addBtn = screen.getByText('Add +');
    expect(addBtn).toBeInTheDocument();
    
    fireEvent.click(addBtn);
  });
});
