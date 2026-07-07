import { renderHook, act } from '@testing-library/react';
import { CartProvider, useCart } from '../../src/context/CartContext';
import React from 'react';

// Mock localStorage
const localStorageMock = (function () {
  let store: Record<string, string> = {};
  return {
    getItem(key: string) {
      return store[key] || null;
    },
    setItem(key: string, value: string) {
      store[key] = value.toString();
    },
    clear() {
      store = {};
    },
    removeItem(key: string) {
      delete store[key];
    }
  };
})();

Object.defineProperty(window, 'localStorage', {
  value: localStorageMock
});

describe('CartContext', () => {
  beforeEach(() => {
    window.localStorage.clear();
  });

  const wrapper = ({ children }: { children: React.ReactNode }) => (
    <CartProvider>{children}</CartProvider>
  );

  it('provides empty initial state', () => {
    const { result } = renderHook(() => useCart(), { wrapper });
    expect(result.current.items).toEqual([]);
    expect(result.current.total).toBe(0);
    expect(result.current.tableNumber).toBeNull();
  });

  it('adds items to the cart and calculates total', () => {
    const { result } = renderHook(() => useCart(), { wrapper });
    
    act(() => {
      result.current.addToCart({ id: '1', name: 'Biryani', price: 200, quantity: 1 });
    });

    expect(result.current.items.length).toBe(1);
    expect(result.current.total).toBe(200);

    act(() => {
      result.current.addToCart({ id: '1', name: 'Biryani', price: 200, quantity: 2 });
    });

    // Should increment quantity, not create a new row
    expect(result.current.items.length).toBe(1);
    expect(result.current.items[0].quantity).toBe(3);
    expect(result.current.total).toBe(600);
  });

  it('removes items from the cart', () => {
    const { result } = renderHook(() => useCart(), { wrapper });
    
    act(() => {
      result.current.addToCart({ id: '1', name: 'Biryani', price: 200, quantity: 1 });
      result.current.addToCart({ id: '2', name: 'Coke', price: 50, quantity: 1 });
    });

    expect(result.current.items.length).toBe(2);

    act(() => {
      result.current.removeFromCart('1');
    });

    expect(result.current.items.length).toBe(1);
    expect(result.current.items[0].id).toBe('2');
    expect(result.current.total).toBe(50);
  });

  it('sets and retrieves table number from localStorage', () => {
    const { result } = renderHook(() => useCart(), { wrapper });

    act(() => {
      result.current.setTableNumber('12');
    });

    expect(result.current.tableNumber).toBe('12');
    expect(window.localStorage.getItem('bobsBarTable')).toBe('12');
  });

  it('loads state from localStorage on mount', () => {
    window.localStorage.setItem('bobsBarTable', '5');
    window.localStorage.setItem('bobsBarCart', JSON.stringify([{ id: '1', name: 'Test', price: 100, quantity: 2 }]));

    const { result } = renderHook(() => useCart(), { wrapper });

    expect(result.current.tableNumber).toBe('5');
    expect(result.current.items.length).toBe(1);
    expect(result.current.total).toBe(200);
  });
});
