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
  const originalTotal = subtotal + cart.shipping_fee + estimatedTaxes;
  const total = originalTotal - cart.discount_applied;

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

      <div className="mb-6">
        {cart.discount_applied > 0 ? (
          <div className="bg-[#f0fdf4] border border-[#15b375]/20 rounded-xl p-3 flex items-center justify-between">
            <div className="flex items-center gap-2">
              <div className="bg-[#15b375] text-white text-[9px] font-black px-1.5 py-0.5 rounded tracking-tighter uppercase">Applied</div>
              <span className="text-xs font-bold text-[#15b375]">ECOSAVER120</span>
            </div>
            <button className="text-[10px] font-bold text-gray-400 hover:text-red-400 uppercase tracking-tighter">Remove</button>
          </div>
        ) : (
          <div className="flex gap-2">
            <input
              type="text"
              placeholder="Discount Code"
              className="flex-1 border border-gray-100 rounded-lg px-3 py-2 text-sm outline-none focus:border-[#15b375]/50 transition bg-gray-50/30"
            />
            <button className="bg-gray-800 text-white px-4 py-2 rounded-lg text-xs font-bold hover:bg-black transition cursor-pointer">
              APPLY
            </button>
          </div>
        )}
      </div>

      <div className="space-y-3 border-t pt-6">
        <div className="flex justify-between text-sm">
          <span className="text-gray-500">Subtotal</span>
          <span className="font-bold text-gray-800">₹{subtotal.toLocaleString()}</span>
        </div>

        <div className="flex justify-between text-sm">
          <span className="text-gray-500">Shipping</span>
          <span className={cart.shipping_fee === 0 ? 'text-[#15b375] font-bold font-mono text-[11px]' : 'font-bold text-gray-800'}>
            {cart.shipping_fee === 0 ? 'FREE' : `₹${cart.shipping_fee.toLocaleString()}`}
          </span>
        </div>

        {cart.discount_applied > 0 && (
          <div className="flex justify-between text-sm">
            <div className="flex items-center gap-1.5">
              <span className="text-gray-500">Discount Applied</span>
              <svg className="w-3.5 h-3.5 text-[#15b375]" fill="currentColor" viewBox="0 0 20 20"><path fillRule="evenodd" d="M17.707 9.293a1 1 0 010 1.414l-7 7a1 1 0 01-1.414 0l-7-7A.997.997 0 012 10V5a3 3 0 013-3h5c.256 0 .512.098.707.293l7 7zM5 6a1 1 0 100-2 1 1 0 000 2z" clipRule="evenodd" /></svg>
            </div>
            <span className="text-[#15b375] font-bold">
              - ₹{cart.discount_applied.toLocaleString()}
            </span>
          </div>
        )}

        <div className="flex justify-between text-sm">
          <span className="text-gray-500">Taxes</span>
          <span className="font-bold text-gray-800">₹{estimatedTaxes}</span>
        </div>

        <div className="flex justify-between pt-5 border-t mt-2">
          <span className="text-lg font-bold text-gray-900">Total</span>
          <div className="text-right">
            <div className="flex items-center justify-end gap-2">
              {cart.discount_applied > 0 && (
                <span className="text-xs text-gray-300 line-through font-bold">₹{originalTotal.toLocaleString()}</span>
              )}
              <span className="text-xl font-black text-[#15b375]">
                ₹{total.toLocaleString()}
              </span>
            </div>
            {cart.discount_applied > 0 && (
              <p className="text-[10px] text-[#15b375] font-bold uppercase tracking-tight">Eco-Savings Applied!</p>
            )}
          </div>
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
