"use client";
import { AppProvider } from "../context/AppProvider";
import "@/app/globals.css";
import { config } from "@fortawesome/fontawesome-svg-core";
import "@fortawesome/fontawesome-svg-core/styles.css";
import Header from "@/components/Templates/Header";
import Footer from "@/components/Templates/Footer";
import SideNav from "@/components/Templates/SideNav";
import { usePathname } from "next/navigation";
import { ToastContainer } from "react-toastify";

config.autoAddCss = false;

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const pathname = usePathname();
  const isHomePage = pathname === "/";

  return (
    <html lang="en">
      <body>
        <AppProvider>
          <div className="flex flex-col min-h-screen">
            <div className="fixed w-full z-50 top-0">
              <Header />
            </div>
            <div className="flex flex-col lg:flex-row flex-1 mt-16">
              {isHomePage && <SideNav />}
              <main className="flex-1 container p-4">
                <ToastContainer />
                <div>{children}</div>
              </main>
            </div>
            <Footer />
          </div>
        </AppProvider>
      </body>
    </html>
  );
}
