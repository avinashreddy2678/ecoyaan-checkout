'use client';

import { useState } from 'react';
import { ShippingAddress } from '@/lib/types';

interface Props {
  onSubmit: (address: ShippingAddress) => void;
  hideButton?: boolean;
}

export const ShippingForm = ({ onSubmit, hideButton }: Props) => {
  const [formData, setFormData] = useState<ShippingAddress>({
    fullName: '',
    email: '',
    phoneNumber: '',
    pinCode: '',
    detailedAddress: '',
    city: '',
    state: 'Karnataka',
  });

  const [errors, setErrors] = useState<string[]>([]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    if (errors.includes(name)) {
      setErrors(errors.filter((item) => item !== name));
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const missingFields = Object.keys(formData).filter(key => !formData[key as keyof ShippingAddress]);

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    const phoneRegex = /^\d{10}$/;

    const invalidFields: string[] = [...missingFields];
    if (formData.email && !emailRegex.test(formData.email)) invalidFields.push('email');
    if (formData.phoneNumber && !phoneRegex.test(formData.phoneNumber)) invalidFields.push('phoneNumber');

    if (invalidFields.length > 0) {
      setErrors(invalidFields);
      return;
    }

    onSubmit(formData);
  };

  const Input = ({ name, placeholder, type = "text", className = "" }: { name: keyof ShippingAddress, placeholder: string, type?: string, className?: string }) => {
    const isError = errors.includes(name);
    const isEmpty = !formData[name];

    return (
      <div className={className}>
        <input
          type={type}
          name={name}
          placeholder={placeholder}
          value={formData[name]}
          onChange={handleChange}
          className={`w-full border p-2.5 rounded-lg text-sm outline-none transition ${isError ? 'border-red-400 bg-red-50' : 'border-gray-100 focus:border-[#15b375]'}`}
        />
        {isError && (
          <p className="text-[10px] text-red-500 mt-1 font-bold uppercase ml-1">
            {isEmpty ? 'Required' : 'Invalid Format'}
          </p>
        )}
      </div>
    );
  };

  return (
    <form onSubmit={handleSubmit}>
      <div className="mb-4">
        <h2 className="text-xl font-bold text-gray-800">Shipping Details</h2>
        <p className="text-xs text-gray-500">Enter your delivery information below.</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
        <Input name="fullName" placeholder="Full Name" />
        <Input name="email" placeholder="Email" type="email" />
        <Input name="phoneNumber" placeholder="Phone" type="tel" />
        <Input name="pinCode" placeholder="PIN Code" />

        <div className="lg:col-span-2">
          <textarea
            name="detailedAddress"
            rows={2}
            placeholder="Detailed Address"
            value={formData.detailedAddress}
            onChange={handleChange}
            className={`w-full border p-2.5 rounded-lg text-sm outline-none transition resize-none ${errors.includes('detailedAddress') ? 'border-red-400 bg-red-50' : 'border-gray-100 focus:border-[#15b375]'}`}
          />
          {errors.includes('detailedAddress') && <p className="text-[10px] text-red-500 mt-1 font-bold uppercase ml-1">Required</p>}
        </div>

        <Input name="city" placeholder="City" />

        <select
          name="state"
          value={formData.state}
          onChange={handleChange}
          className="border border-gray-100 p-2.5 rounded-lg text-sm focus:border-[#15b375] outline-none transition bg-white cursor-pointer"
        >
          {['Karnataka', 'Telangana', 'Tamil Nadu', 'Maharashtra', 'Delhi'].map(s => <option key={s} value={s}>{s}</option>)}
        </select>
      </div>

      {!hideButton && (
        <button
          type="submit"
          className="w-full mt-6 bg-[#15b375] text-white font-bold py-3.5 rounded-xl hover:bg-[#108a5a] transition active:scale-[0.99] cursor-pointer"
        >
          Confirm Address & Continue →
        </button>
      )}
    </form>
  );
};
