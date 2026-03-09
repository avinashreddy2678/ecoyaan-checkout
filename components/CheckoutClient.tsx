'use client';

import { useState } from 'react';
import { CartSummary } from '@/components/CartSummary';
import { ShippingForm } from '@/components/ShippingForm';
import { useCheckout } from '@/contexts/CheckoutContext';
import { CartData, ShippingAddress } from '@/lib/types';
import { useRouter } from 'next/navigation';

export default function CheckoutClient({ initialCart }: { initialCart: CartData }) {
	const router = useRouter();
	const { cart, currentStep, setCart, address, setAddress, goToStep } = useCheckout();
	const [isProcessing, setIsProcessing] = useState(false);

	useState(() => {
		if (!cart) setCart(initialCart);
	});

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

	const activeCart = cart || initialCart;

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
								<div className="flex items-center justify-between mb-4">
									<h2 className="text-lg font-bold text-gray-800">Final Confirmation</h2>
									<button onClick={() => goToStep('shipping')} className="text-[10px] font-bold text-[#15b375] uppercase hover:underline cursor-pointer">Edit Details</button>
								</div>

								<div className="bg-[#f0fdf4] border border-[#15b375]/10 rounded-[1.5rem] p-6 mb-8 relative overflow-hidden group">
									<div className="absolute top-0 right-0 p-3 opacity-5">
										<svg className="w-12 h-12 text-[#15b375]" fill="currentColor" viewBox="0 0 24 24"><path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm1 15h-2v-6h2v6zm0-8h-2V7h2v2z" /></svg>
									</div>
									<div className="flex items-center gap-2 mb-3">
										<div className="w-1.5 h-1.5 bg-[#15b375] rounded-full"></div>
										<span className="text-[10px] font-bold text-[#15b375] uppercase tracking-[0.2em]">Shipping Address</span>
									</div>
									<p className="text-base font-black text-gray-900 leading-tight">{address?.fullName}</p>
									<p className="text-xs text-gray-500 mt-1 leading-relaxed">{address?.detailedAddress}, {address?.city}, {address?.state} - {address?.pinCode}</p>
									<p className="text-xs text-gray-400 font-bold mt-4 uppercase tracking-tighter flex items-center gap-1.5">
										<svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" /></svg>
										{address?.phoneNumber}
									</p>
								</div>

								<div className="mb-6">
									<h3 className="text-xs font-bold text-gray-400 uppercase tracking-widest mb-3">Payment Method</h3>
									<div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
										{['UPI / QR', 'Card', 'Net Banking', 'Wallet'].map((method, i) => (
											<div key={i} className={`flex items-center justify-between px-5 py-4 border rounded-2xl cursor-pointer transition-all ${i === 0 ? 'border-[#15b375] bg-[#f0fdf4]' : 'border-gray-50 bg-gray-50/30'}`}>
												<span className="text-xs font-bold text-gray-800">{method}</span>
												{i === 0 && <div className="w-5 h-5 bg-[#15b375] rounded-full flex items-center justify-center shadow-lg shadow-[#15b375]/20"><svg className="w-3 h-3 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeWidth={3} strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" /></svg></div>}
											</div>
										))}
									</div>
								</div>
							</div>
						)}

						<div className="mt-12 grid grid-cols-3 gap-4 pt-8 border-t border-gray-100">
							{['Secure Checkout', 'Carbon Neutral', 'Eco Vetted'].map((label) => (
								<div key={label} className="text-center group">
									<div className="w-10 h-10 bg-[#f0fdf4] rounded-2xl flex items-center justify-center mx-auto mb-2"><div className="w-1.5 h-1.5 bg-[#15b375] rounded-full"></div></div>
									<h4 className="text-[9px] font-bold text-gray-400 uppercase tracking-wider">{label}</h4>
								</div>
							))}
						</div>
					</section>

					<aside className="lg:col-span-5 sticky top-28">
						<CartSummary cart={activeCart!} onProceed={handlePayment} isActive={currentStep === 'payment'} isProcessing={isProcessing} />
					</aside>
				</div>
			</main>

			<footer className="py-8 border-t border-gray-100 text-center bg-white mt-auto">
				<p className="text-xs font-bold text-gray-300 uppercase tracking-[0.4em]">© 2026 Ecoyaan</p>
			</footer>
		</div>
	);
}
