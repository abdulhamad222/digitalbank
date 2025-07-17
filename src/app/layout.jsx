import localFont from "next/font/local";
import "./globals.css";
import { Toaster } from "react-hot-toast";
import { AuthProvider } from '@/components/AuthContext';
import ClientLayout from "@/components/Clientlayout";

const geistSans = localFont({
  src: "./fonts/GeistVF.woff",
  variable: "--font-geist-sans",
  weight: "100 900",
});
const geistMono = localFont({
  src: "./fonts/GeistMonoVF.woff",
  variable: "--font-geist-mono",
  weight: "100 900",
});

export const metadata = {
  title: "Super Bank",
  description: "Bank that facilitate transaction",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
      <AuthProvider>
        <Toaster position="top-center" reverseOrder={false} />
            <main>
              <ClientLayout>{children}</ClientLayout>
            </main>
      </AuthProvider>
      </body>
    </html>
  );
}
