'use client';

import React, { createContext, useContext, useState } from 'react';
import { CartData, ShippingAddress } from '@/lib/types';

interface CheckoutContextType {
  cart: CartData | null;
  address: ShippingAddress | null;
  currentStep: 'shipping' | 'payment';
  setCart: (cart: CartData) => void;
  setAddress: (address: ShippingAddress) => void;
  goToStep: (step: 'shipping' | 'payment') => void;
}

const CheckoutContext = createContext<CheckoutContextType | undefined>(undefined);

export const CheckoutProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [cart, setCart] = useState<CartData | null>(null);
  const [address, setAddress] = useState<ShippingAddress | null>(null);
  const [currentStep, setCurrentStep] = useState<'shipping' | 'payment'>('shipping');

  const goToStep = (step: 'shipping' | 'payment') => {
    setCurrentStep(step);
  };

  return (
    <CheckoutContext.Provider
      value={{
        cart,
        address,
        currentStep,
        setCart,
        setAddress,
        goToStep,
      }}
    >
      {children}
    </CheckoutContext.Provider>
  );
};

export const useCheckout = () => {
  const context = useContext(CheckoutContext);
  if (!context) {
    throw new Error('useCheckout must be used within CheckoutProvider');
  }
  return context;
};
