import { mockCartData } from '@/lib/mockData';
import CheckoutClient from '@/components/CheckoutClient';
import { CartData } from '@/lib/types';

async function getCartData(): Promise<CartData> {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve(mockCartData);
    }, 100);
  });
}

export default async function CheckoutPage() {
  const cartData = await getCartData();

  return (
    <CheckoutClient initialCart={cartData} />
  );
}
