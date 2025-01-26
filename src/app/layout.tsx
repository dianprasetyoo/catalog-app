// src/app/layout.tsx
import { CartProvider } from "../context/CartContext";
import "@/app/globals.css";
import { config } from '@fortawesome/fontawesome-svg-core';
import '@fortawesome/fontawesome-svg-core/styles.css';

config.autoAddCss = false;

export const metadata = { title: "Product Catalog", description: "Next.js App" };

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body>
        <CartProvider>
          <div >{children}</div>
        </CartProvider>
      </body>
    </html>
  );
}
