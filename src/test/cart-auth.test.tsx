import { describe, it, expect, beforeEach } from 'vitest';
import { renderHook, act } from '@testing-library/react';
import React from 'react';
import { CartProvider, useCart } from '../context/CartContext';

describe('Frontend Cart Characterization Tests', () => {
  beforeEach(() => {
    localStorage.clear();
  });

  const wrapper = ({ children }: { children: React.ReactNode }) => (
    <CartProvider>{children}</CartProvider>
  );

  it('should initialize with empty cart and total 0', () => {
    const { result } = renderHook(() => useCart(), { wrapper });
    expect(result.current.items).toEqual([]);
    expect(result.current.total).toBe(0);
    expect(result.current.itemCount).toBe(0);
  });

  it('should add item and calculate total price correctly', () => {
    const { result } = renderHook(() => useCart(), { wrapper });

    act(() => {
      result.current.addItem({
        id: 'prod-001',
        name: 'Nike Air Zoom Pegasus',
        price: 139.99,
        image: 'test.jpg',
      });
    });

    expect(result.current.items.length).toBe(1);
    expect(result.current.items[0].quantity).toBe(1);
    expect(result.current.total).toBe(139.99);
    expect(result.current.itemCount).toBe(1);
  });

  it('should increment quantity when same item is added again', () => {
    const { result } = renderHook(() => useCart(), { wrapper });

    act(() => {
      result.current.addItem({
        id: 'prod-001',
        name: 'Nike Air Zoom Pegasus',
        price: 139.99,
        image: 'test.jpg',
      });
    });

    act(() => {
      result.current.addItem({
        id: 'prod-001',
        name: 'Nike Air Zoom Pegasus',
        price: 139.99,
        image: 'test.jpg',
      });
    });

    expect(result.current.items.length).toBe(1);
    expect(result.current.items[0].quantity).toBe(2);
    expect(result.current.total).toBe(279.98);
    expect(result.current.itemCount).toBe(2);
  });

  it('should update quantity and recalculate total', () => {
    const { result } = renderHook(() => useCart(), { wrapper });

    act(() => {
      result.current.addItem({
        id: 'prod-002',
        name: 'Wilson Basketball',
        price: 50.0,
        image: 'test2.jpg',
      });
    });

    act(() => {
      result.current.updateQuantity('prod-002', 3);
    });

    expect(result.current.items[0].quantity).toBe(3);
    expect(result.current.total).toBe(150.0);
  });

  it('should remove item when quantity is reduced to 0 or removeItem called', () => {
    const { result } = renderHook(() => useCart(), { wrapper });

    act(() => {
      result.current.addItem({
        id: 'prod-003',
        name: 'Garmin Watch',
        price: 400.0,
        image: 'test3.jpg',
      });
    });

    act(() => {
      result.current.removeItem('prod-003');
    });

    expect(result.current.items.length).toBe(0);
    expect(result.current.total).toBe(0);
    expect(result.current.itemCount).toBe(0);
  });

  it('should clear all items on clearCart', () => {
    const { result } = renderHook(() => useCart(), { wrapper });

    act(() => {
      result.current.addItem({
        id: 'item-1',
        name: 'Item 1',
        price: 25.0,
        image: 'img.jpg',
      });
      result.current.addItem({
        id: 'item-2',
        name: 'Item 2',
        price: 35.0,
        image: 'img2.jpg',
      });
    });

    expect(result.current.items.length).toBe(2);

    act(() => {
      result.current.clearCart();
    });

    expect(result.current.items.length).toBe(0);
    expect(result.current.total).toBe(0);
  });
});
