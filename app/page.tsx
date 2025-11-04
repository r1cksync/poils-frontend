'use client';

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { useAuth } from '@/context/AuthContext';
import { FileText, Shield, Zap, Database } from 'lucide-react';

export default function Home() {
  const router = useRouter();
  const { user, loading } = useAuth();

  useEffect(() => {
    // Only redirect if user is authenticated, don't wait for loading to finish
    if (user) {
      router.push('/chat');
    }
  }, [user, router]);

  // Show landing page immediately, don't wait for auth check
  return (
    <div className="min-h-screen bg-gradient-to-br from-primary-50 via-white to-primary-50">
      {/* Navigation */}
      <nav className="bg-white shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex justify-between items-center">
            <div className="flex items-center gap-2">
              <FileText className="text-primary-600" size={32} />
              <span className="text-2xl font-bold text-gray-900">Hindi OCR</span>
            </div>
            <div className="flex gap-3">
              {loading ? (
                <div className="h-10 w-32 bg-gray-200 animate-pulse rounded-lg"></div>
              ) : user ? (
                <Link
                  href="/chat"
                  className="px-4 py-2 bg-primary-600 text-white rounded-lg hover:bg-primary-700 font-medium transition-colors"
                >
                  Go to Dashboard
                </Link>
              ) : (
                <>
                  <Link
                    href="/login"
                    className="px-4 py-2 text-gray-700 hover:text-primary-600 font-medium transition-colors"
                  >
                    Login
                  </Link>
                  <Link
                    href="/signup"
                    className="px-4 py-2 bg-primary-600 text-white rounded-lg hover:bg-primary-700 font-medium transition-colors"
                  >
                    Get Started
                  </Link>
                </>
              )}
            </div>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
        <div className="text-center">
          <h1 className="text-5xl md:text-6xl font-bold text-gray-900 mb-6">
            AI-Powered Hindi OCR System
          </h1>
          <p className="text-xl text-gray-600 mb-8 max-w-3xl mx-auto">
            Digitize government documents with advanced Hindi text recognition.
            Process FIRs, witness statements, and court orders with ease.
          </p>
          <div className="flex gap-4 justify-center">
            <Link
              href="/signup"
              className="px-8 py-3 bg-primary-600 text-white rounded-lg hover:bg-primary-700 font-medium text-lg transition-colors shadow-lg hover:shadow-xl"
            >
              Start Free Trial
            </Link>
            <Link
              href="/login"
              className="px-8 py-3 bg-white text-primary-600 border-2 border-primary-600 rounded-lg hover:bg-primary-50 font-medium text-lg transition-colors"
            >
              Sign In
            </Link>
          </div>
        </div>

        {/* Features */}
        <div className="mt-24 grid md:grid-cols-2 lg:grid-cols-4 gap-8">
          <div className="bg-white p-6 rounded-lg shadow-md hover:shadow-xl transition-shadow">
            <div className="w-12 h-12 bg-primary-100 rounded-lg flex items-center justify-center mb-4">
              <FileText className="text-primary-600" size={24} />
            </div>
            <h3 className="text-xl font-semibold mb-2">Hindi Text Recognition</h3>
            <p className="text-gray-600">
              Extract text from handwritten and printed Hindi documents with high accuracy.
            </p>
          </div>

          <div className="bg-white p-6 rounded-lg shadow-md hover:shadow-xl transition-shadow">
            <div className="w-12 h-12 bg-primary-100 rounded-lg flex items-center justify-center mb-4">
              <Zap className="text-primary-600" size={24} />
            </div>
            <h3 className="text-xl font-semibold mb-2">AI-Powered Analysis</h3>
            <p className="text-gray-600">
              Chat with your documents using advanced RAG technology for instant insights.
            </p>
          </div>

          <div className="bg-white p-6 rounded-lg shadow-md hover:shadow-xl transition-shadow">
            <div className="w-12 h-12 bg-primary-100 rounded-lg flex items-center justify-center mb-4">
              <Shield className="text-primary-600" size={24} />
            </div>
            <h3 className="text-xl font-semibold mb-2">Secure & Compliant</h3>
            <p className="text-gray-600">
              End-to-end encryption with role-based access control for sensitive documents.
            </p>
          </div>

          <div className="bg-white p-6 rounded-lg shadow-md hover:shadow-xl transition-shadow">
            <div className="w-12 h-12 bg-primary-100 rounded-lg flex items-center justify-center mb-4">
              <Database className="text-primary-600" size={24} />
            </div>
            <h3 className="text-xl font-semibold mb-2">Batch Processing</h3>
            <p className="text-gray-600">
              Process multiple documents simultaneously with automated data entry.
            </p>
          </div>
        </div>

        {/* Use Cases */}
        <div className="mt-24">
          <h2 className="text-3xl font-bold text-center mb-12">Perfect for Government & Law Enforcement</h2>
          <div className="grid md:grid-cols-3 gap-8">
            <div className="bg-white p-8 rounded-lg shadow-md">
              <h3 className="text-xl font-semibold mb-3">📋 FIRs & Reports</h3>
              <p className="text-gray-600">
                Quickly digitize First Information Reports and field reports for better record management.
              </p>
            </div>
            <div className="bg-white p-8 rounded-lg shadow-md">
              <h3 className="text-xl font-semibold mb-3">⚖️ Court Documents</h3>
              <p className="text-gray-600">
                Process court orders, judgments, and legal documents with precision.
              </p>
            </div>
            <div className="bg-white p-8 rounded-lg shadow-md">
              <h3 className="text-xl font-semibold mb-3">📝 Witness Statements</h3>
              <p className="text-gray-600">
                Convert handwritten witness statements into searchable digital format.
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Footer */}
      <footer className="bg-gray-900 text-white mt-24 py-8">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <p className="text-gray-400">© 2025 Hindi OCR System. Built for government document digitization.</p>
        </div>
      </footer>
    </div>
  );
}
