'use client';

import Link from 'next/link';
import { useId } from 'react';

export default function SuccessPage() {
  const uniqueId = useId();
  const orderId = 'ECO-' + uniqueId.replace(/:/g, '').toUpperCase().slice(0, 8);

  return (
    <div className="flex items-center justify-center min-h-screen bg-[#fcfdfd] font-sans selection:bg-[#15b375]/10">
      <div className="relative z-10 bg-white border border-gray-100 rounded-[3rem] shadow-[0_48px_100px_-24px_rgba(21,179,117,0.15)] p-10 md:p-14 max-w-xl w-full mx-4">
        <div className="text-center mb-10">
          <div className="flex justify-center mb-6">
            <div className="relative">
              <div className="relative flex items-center justify-center w-20 h-20 bg-[#15b375] rounded-full shadow-xl shadow-[#15b375]/30 ring-8 ring-[#15b375]/5">
                <svg className="w-10 h-10 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" />
                </svg>
              </div>
            </div>
          </div>
          <h1 className="text-3xl md:text-4xl font-black text-gray-900 mb-2 tracking-tight">
            Order Confirmed!
          </h1>
          <p className="text-gray-500 text-sm font-medium">
            We&apos;ve sent a confirmation email to <span className="text-gray-900 font-bold">your inbox</span>.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-10">
          <div className="bg-[#fcfdfd] border border-gray-100 rounded-2xl p-6 text-center relative overflow-hidden group hover:border-[#15b375]/30 transition-colors">
            <div className="absolute top-0 right-0 p-2 opacity-5 text-[#15b375]">
              <svg className="w-12 h-12" fill="currentColor" viewBox="0 0 24 24"><path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm1 15h-2v-6h2v6zm0-8h-2V7h2v2z" /></svg>
            </div>
            <span className="text-[10px] font-bold uppercase tracking-[0.2em] text-gray-400 block mb-2">Order ID</span>
            <span className="text-xl font-bold text-gray-800 tracking-tight font-mono">{orderId}</span>
          </div>

          <div className="bg-[#fcfdfd] border border-gray-100 rounded-2xl p-6 text-center relative overflow-hidden group hover:border-[#15b375]/30 transition-colors">
            <div className="absolute top-0 right-0 p-2 opacity-5 text-[#15b375]">
              <svg className="w-12 h-12" fill="currentColor" viewBox="0 0 24 24"><path d="M20 8h-3V4H3c-1.1 0-2 .9-2 2v11h2c0 1.66 1.34 3 3 3s3-1.34 3-3h6c0 1.66 1.34 3 3 3s3-1.34 3-3h2v-5l-3-4zM6 18.5c-.83 0-1.5-.67-1.5-1.5s.67-1.5 1.5-1.5 1.5.67 1.5 1.5-.67 1.5-1.5 1.5zm13.5 0c-.83 0-1.5-.67-1.5-1.5s.67-1.5 1.5-1.5 1.5.67 1.5 1.5-.67 1.5-1.5 1.5z" /></svg>
            </div>
            <span className="text-[10px] font-bold uppercase tracking-[0.2em] text-gray-400 block mb-2">Estimated Arrival</span>
            <span className="text-sm font-bold text-[#15b375]">14th — 18th March</span>
          </div>
        </div>

        <div className="border-t border-gray-100 pt-8 mb-10">
          <h3 className="text-[11px] font-bold text-gray-400 uppercase tracking-[0.2em] mb-6 text-center">Your sustainable journey</h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {[
              { title: 'Sourcing', desc: '100% sustainable items.', icon: '🌱' },
              { title: 'Impact', desc: '1 tree planted for you.', icon: '🌳' },
              { title: 'Packing', desc: 'Zero plastic waste.', icon: '📦' }
            ].map((step) => (
              <div key={step.title} className="text-center p-4">
                <div className="text-2xl mb-2">{step.icon}</div>
                <h4 className="text-xs font-bold text-gray-800 mb-1">{step.title}</h4>
                <p className="text-[10px] text-gray-400 leading-relaxed">{step.desc}</p>
              </div>
            ))}
          </div>
        </div>

        <div className="flex flex-col sm:flex-row gap-4">
          <Link
            href="/"
            className="flex-1 group relative flex items-center justify-center bg-[#15b375] text-white font-bold py-4 rounded-2xl hover:bg-[#108a5a] transition-all duration-300 shadow-xl shadow-[#15b375]/20 overflow-hidden"
          >
            <span className="relative z-10 flex items-center gap-2 text-sm">
              Keep Shopping ECO
              <svg className="w-5 h-5 group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" /></svg>
            </span>
          </Link>

          <button className="flex-1 bg-gray-50 text-gray-600 font-bold py-4 rounded-2xl hover:bg-gray-100 transition-all text-sm uppercase tracking-wide">
            Track Order
          </button>
        </div>
      </div>

      <div className="absolute bottom-10 left-0 w-full text-center">
        <p className="text-[9px] font-bold text-gray-300 uppercase tracking-[0.5em]">ECOYAAN • SUSTAINABILITY MADE EASY • © 2026</p>
      </div>
    </div>
  );
}
