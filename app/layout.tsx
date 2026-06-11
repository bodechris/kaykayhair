import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import MainHeader from "@/components/MainHeader";
import MainFooter from "@/components/MainFooter";
import { Provider } from "@/components/ui/provider";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Kaykay Hair",
  description: "Your one-stop shop for all your African beauty hair care needs!",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={`${geistSans.variable} ${geistMono.variable} antialiased`}>
        <Provider>
          <MainHeader />
          <main className="main-app">
            {children}
          </main>
          <MainFooter />
        </Provider>
      </body>
    </html>
  );
}
