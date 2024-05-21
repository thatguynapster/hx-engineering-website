import { Poppins } from "next/font/google";
import { Metadata } from "next";

import { Footer, PageNavigation } from "@/components";
import { AppProvider, StoreProvider } from "@/providers";

import "../styles/scrollbar.css";
import "../styles/index.scss";

export const metadata: Metadata = {
  title: "HX Engineering",
  description: "HX Engineering Online Mall",
};

const poppins = Poppins({
  subsets: ["latin"],
  weight: ["100", "200", "300", "400", "500", "600", "700", "800", "900"],
});

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={poppins.className}>
        <StoreProvider>
          <AppProvider>
            <main className="flex flex-col gap-16 min-h-screen">
              <PageNavigation />
              {children}
              <Footer />
            </main>
          </AppProvider>
        </StoreProvider>
      </body>
    </html>
  );
}
