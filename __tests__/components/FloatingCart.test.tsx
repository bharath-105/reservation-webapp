import { render, screen, fireEvent } from '@testing-library/react';
import FloatingCart from '../../src/components/cart/FloatingCart';
import { CartProvider, useCart } from '../../src/context/CartContext';
import React from 'react';

// Helper component to interact with cart
const TestWrapper = () => {
  const { addToCart } = useCart();
  
  return (
    <div>
      <button onClick={() => addToCart({ id: '1', name: 'Test Item', price: 100, quantity: 2 })}>Add</button>
      <FloatingCart />
    </div>
  );
};

describe('FloatingCart Component', () => {
  it('does not render if cart is empty', () => {
    const { container } = render(
      <CartProvider>
        <FloatingCart />
      </CartProvider>
    );
    expect(container.firstChild).toBeNull();
  });

  it('renders badge and total when items are in cart', () => {
    render(
      <CartProvider>
        <TestWrapper />
      </CartProvider>
    );

    fireEvent.click(screen.getByText('Add'));
    
    // badge should show 2
    expect(screen.getByText('2')).toBeInTheDocument();
    
    // total should show 200
    expect(screen.getByText('View Cart • ₹200')).toBeInTheDocument();
  });
});
