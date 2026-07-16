import { Geist, Geist_Mono } from "next/font/google";
import { Toaster } from "react-hot-toast";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata = {
  title: "Your Name — Graphic Designer Portfolio",
  description: "Portfolio of Your Name, a graphic designer specializing in branding, illustration, and UI design.",
};

export default function RootLayout({ children }) {
  return (
    <html
      lang="en"
      data-scroll-behavior="smooth"
      className={`${geistSans.variable} ${geistMono.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col">
        {children}
        <Toaster
          position="top-right"
          toastOptions={{
            duration: 4000,
            style: {
              background: '#111214',
              color: '#f2f2f0',
              border: '1px solid rgba(255,255,255,0.1)',
              fontSize: '0.875rem',
            },
            success: {
              iconTheme: { primary: '#39FF14', secondary: '#111214' },
              style: { border: '1px solid rgba(57,255,20,0.4)' },
            },
            error: {
              iconTheme: { primary: '#ff4d4d', secondary: '#111214' },
              style: { border: '1px solid rgba(255,77,77,0.4)' },
            },
          }}
        />
      </body>
    </html>
  );
}
