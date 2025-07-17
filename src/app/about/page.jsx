'use client';

import Image from "next/image";
import { useRouter } from "next/navigation";
import { useAuth } from "@/components/AuthContext"; // adjust path if needed

export default function AboutPage() {
  const router = useRouter();
  const { user } = useAuth(); // assuming you're storing user info in context

  const handleGetStarted = () => {
    if (user) {
      router.push('/transaction');
    } else {
      router.push('/signup');
    }
  };

  return (
    <main className="min-h-screen w-full text-gray-800 px-4 py-20">
      {/* Hero Section */}
      <section className="max-w-6xl mx-auto text-center mb-20">
        <h1 className="text-4xl md:text-5xl font-bold text-blue-700 mb-4">About Digital Bank</h1>
        <p className="text-lg text-gray-600 max-w-2xl mx-auto">
          We're redefining banking for the digital age. Simple, secure, and smart solutions for your financial needs.
        </p>
      </section>

      {/* Company Overview */}
      <section className="max-w-6xl mx-auto grid md:grid-cols-2 gap-12 mb-20 items-center">
        <div>
          <h2 className="text-2xl font-semibold text-blue-700 mb-4">Who We Are</h2>
          <p className="text-gray-600 leading-relaxed">
            Digital Bank is a modern, customer-centric banking platform designed to empower users through seamless, tech-driven experiences. We combine innovation with trust to help individuals and businesses take control of their financial journey.
          </p>
        </div>
        <Image src="/images/about-bank.jpg" alt="Team" width={400} height={400} />
      </section>

      {/* Our Mission, Vision, Values */}
      <section className="max-w-6xl mx-auto text-center space-y-16 mb-20">
        <div>
          <h3 className="text-xl font-semibold text-blue-600 mb-2">Our Mission</h3>
          <p className="text-gray-600 max-w-xl mx-auto">To deliver secure, simple, and efficient financial services to everyone, everywhere.</p>
        </div>
        <div>
          <h3 className="text-xl font-semibold text-blue-600 mb-2">Our Vision</h3>
          <p className="text-gray-600 max-w-xl mx-auto">To become the leading digital-first bank that makes money management stress-free and accessible for all.</p>
        </div>
        <div>
          <h3 className="text-xl font-semibold text-blue-600 mb-2">Our Core Values</h3>
          <p className="text-gray-600 max-w-xl mx-auto">Integrity, innovation, simplicity, and customer empowerment.</p>
        </div>
      </section>

      {/* Call to Action */}
      <section className="py-16">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-2xl md:text-3xl font-bold text-blue-700 mb-4">Ready to Experience Digital Banking?</h2>
          <p className="text-gray-600 mb-6">Join thousands of users already managing their money smarter with us.</p>
          <button
            onClick={handleGetStarted}
            className="px-5 py-3 rounded-lg font-semibold transition duration-300 shadow-sm bg-blue-600 text-white border border-transparent hover:bg-transparent hover:text-blue-600 hover:border-blue-600"
          >
            Get Started
          </button>
        </div>
      </section>
    </main>
  );
}
