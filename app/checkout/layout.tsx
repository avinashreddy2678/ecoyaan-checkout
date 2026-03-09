import { CheckoutProvider } from '@/contexts/CheckoutContext';

export default function CheckoutLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <CheckoutProvider>
      {children}
    </CheckoutProvider>
  );
}
