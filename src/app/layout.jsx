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
        {/* Star Twinkle Overlay */}
        <div className="fixed inset-0 pointer-events-none -z-10">
          {Array.from({ length: 80 }).map((_, i) => (
            <div
              key={i}
              className="absolute w-[3px] h-[3px] bg-black rounded-full star"
              style={{
                top: `${Math.random() * 100}%`,
                left: `${Math.random() * 100}%`,
                animationDelay: `${Math.random() * 5}s`,
              }}
            />
          ))}
        </div>

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
