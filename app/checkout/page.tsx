'use client';

import { useEffect, useState } from 'react';
import { CartSummary } from '@/components/CartSummary';
import { ShippingForm } from '@/components/ShippingForm';
import { useCheckout } from '@/contexts/CheckoutContext';
import { CartData, ShippingAddress } from '@/lib/types';
import { useRouter } from 'next/navigation';

export default function CheckoutPage() {
  const router = useRouter();

  const { cart, currentStep, setCart, setAddress, goToStep } =
    useCheckout();

  const [loading, setLoading] = useState(true);
  const [isProcessing, setIsProcessing] = useState(false);

  useEffect(() => {
    const fetchCart = async () => {
      try {
        const response = await fetch('/api/cart');
        const data: CartData = await response.json();
        setCart(data);
      } catch (error) {
        console.error('Failed to fetch cart:', error);
      } finally {
        setLoading(false);
      }
    };

    if (!cart) fetchCart();
    else setLoading(false);
  }, [cart, setCart]);

  const handleShippingSubmit = (shippingAddress: ShippingAddress) => {
    setAddress(shippingAddress);
    goToStep('payment');
  };

  const handlePayment = async () => {
    setIsProcessing(true);

    await new Promise((resolve) => setTimeout(resolve, 2000));

    setIsProcessing(false);
    router.push('/checkout/success');
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-white">
        <div className="w-12 h-12 border-4 border-[#15b375]/20 border-t-[#15b375] rounded-full animate-spin"></div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#fcfdfd] font-sans flex flex-col">
      <header className="bg-white border-b border-gray-100 py-4 px-8 flex items-center justify-between sticky top-0 z-50">
        <div className="flex items-center gap-2">
          <img src="https://ecoyaan.com/images/logo.png" className="w-8 h-8" />
          <h1 className="text-2xl font-bold text-[#15b375]">Ecoyaan</h1>
        </div>
        <nav className="hidden md:flex items-center gap-8">
          {['Shop', 'About Us', 'Impact'].map((item) => (
            <a key={item} className="text-sm font-semibold text-gray-600 hover:text-[#15b375] cursor-pointer">{item}</a>
          ))}
        </nav>
        <div className="flex items-center gap-5">
          <button className="text-gray-600 hover:text-[#15b375]">
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeWidth={2} strokeLinecap="round" strokeLinejoin="round" d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z" /></svg>
          </button>
        </div>
      </header>

      <main className="flex-1 max-w-[1280px] mx-auto w-full px-8 py-12 pb-24">
        <div className="grid lg:grid-cols-12 gap-10 items-start">
          <section className="lg:col-span-7 bg-white rounded-2xl p-8 border border-gray-100 shadow-sm">
            <ShippingForm
              onSubmit={handleShippingSubmit}
              hideButton={currentStep !== 'shipping'}
            />

            {currentStep === 'payment' && (
              <div className="mt-10 animate-in fade-in slide-in-from-top-4 duration-500">
                <h2 className="text-lg font-bold text-gray-800 mb-0.5">Payment Method</h2>
                <p className="text-[11px] text-gray-500 mb-4">Select your preferred way to pay securely.</p>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  {['UPI / QR', 'Card', 'Net Banking', 'Wallet'].map((method, i) => (
                    <div key={i} className={`flex items-center justify-between px-4 py-3.5 border rounded-xl cursor-pointer transition-all ${i === 0 ? 'border-[#15b375] bg-[#f0fdf4]' : 'border-gray-50 bg-gray-50/30'}`}>
                      <span className="text-xs font-bold text-gray-700">{method}</span>
                      {i === 0 && <div className="w-5 h-5 bg-[#15b375] rounded-full flex items-center justify-center"><svg className="w-3 h-3 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeWidth={3} strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" /></svg></div>}
                    </div>
                  ))}
                </div>
                <button onClick={() => goToStep('shipping')} className="mt-4 text-[10px] font-bold text-[#15b375] uppercase hover:underline">Change Shipping Address</button>
              </div>
            )}

            <div className="mt-12 grid grid-cols-3 gap-4 pt-8 border-t border-gray-100">
              {['Secure Checkout', 'Carbon Neutral', 'Eco Vetted'].map((label) => (
                <div key={label} className="text-center">
                  <div className="w-12 h-12 bg-[#f0fdf4] rounded-2xl flex items-center justify-center mx-auto mb-3"></div>
                  <h4 className="text-[10px] font-bold text-gray-800 uppercase tracking-widest">{label}</h4>
                </div>
              ))}
            </div>
          </section>

          <aside className="lg:col-span-5 sticky top-28">
            <CartSummary cart={cart!} onProceed={handlePayment} isActive={currentStep === 'payment'} />
          </aside>
        </div>
      </main>

      <footer className="py-8 border-t border-gray-100 text-center bg-white mt-auto">
        <p className="text-xs font-bold text-gray-300 uppercase tracking-[0.4em]">© 2026 Ecoyaan</p>
      </footer>
    </div>
  );
}
