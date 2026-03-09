'use client';

import React from 'react';
import { CartData } from '@/lib/types';

type Props = {
  cart: CartData;
  onProceed: () => void;
  isActive?: boolean;
  isProcessing?: boolean;
};

export const CartSummary = ({ cart, onProceed, isActive = true, isProcessing = false }: Props) => {
  const subtotal = cart.cartItems.reduce(
    (acc, item) => acc + item.product_price * item.quantity,
    0
  );

  const estimatedTaxes = 45;

  const total =
    subtotal + cart.shipping_fee - cart.discount_applied + estimatedTaxes;

  return (
    <div className="flex flex-col bg-white border border-gray-100 rounded-2xl p-7 shadow-sm">
      <h2 className="text-xl font-bold text-gray-800 mb-6">
        Order Summary
      </h2>

      <div className="space-y-5 mb-6">
        {cart.cartItems.map((item) => (
          <div key={item.product_id} className="flex justify-between">
            <div className="flex gap-4">
              <div className="relative w-16 h-16 bg-[#f0f9f1] rounded-xl text-center">
                <img
                  src={item.image}
                  className="w-full h-full object-cover rounded-xl"
                  alt={item.product_name}
                />
                <div className="absolute -top-1.5 -right-1.5 w-6 h-6 bg-[#15b375] text-white text-[11px] font-bold rounded-full flex items-center justify-center border-2 border-white">
                  {item.quantity}
                </div>
              </div>
              <div>
                <p className="font-bold text-sm text-gray-800">
                  {item.product_name}
                </p>
                <p className="text-[11px] text-gray-500">
                  Eco-friendly Choice
                </p>
              </div>
            </div>
            <p className="font-bold text-gray-800 text-sm">
              ₹{(item.product_price * item.quantity).toLocaleString()}
            </p>
          </div>
        ))}
      </div>

      <div className="space-y-3 border-t pt-6">
        <div className="flex justify-between text-sm">
          <span className="text-gray-500">Subtotal</span>
          <span className="font-bold">₹{subtotal.toLocaleString()}</span>
        </div>
        <div className="flex justify-between text-sm">
          <span className="text-gray-500">Shipping</span>
          <span className="text-[#15b375] font-bold uppercase tracking-tight">Free</span>
        </div>
        <div className="flex justify-between text-sm">
          <span className="text-gray-500">Taxes</span>
          <span className="font-bold">₹{estimatedTaxes}</span>
        </div>
        <div className="flex justify-between pt-5 border-t mt-2">
          <span className="text-lg font-bold">Total</span>
          <span className="text-xl font-bold text-[#15b375]">
            ₹{total.toLocaleString()}
          </span>
        </div>
      </div>

      {isActive && (
        <button
          onClick={onProceed}
          disabled={isProcessing}
          className={`mt-8 w-full bg-[#15b375] text-white font-bold py-4 rounded-xl transition-all flex items-center justify-center gap-3 active:scale-[0.98] cursor-pointer shadow-lg shadow-[#15b375]/20 ${isProcessing ? 'opacity-80 cursor-wait' : 'hover:bg-[#108a5a] hover:-translate-y-0.5'}`}
        >
          {isProcessing ? (
            <>
              <div className="w-5 h-5 border-2 border-white/20 border-t-white rounded-full animate-spin"></div>
              <span>Processing...</span>
            </>
          ) : (
            'Pay Securely & Complete Order'
          )}
        </button>
      )}
    </div>
  );
};
