import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Ecoyaan",
  description: "Eco-friendly products checkout platform",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className="bg-white text-text-main antialiased font-sans" suppressHydrationWarning>
        {children}
      </body>
    </html>
  );
}
