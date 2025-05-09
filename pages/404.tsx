import { NextPage } from 'next';
import Head from 'next/head';
import Link from 'next/link';

const NotFoundPage: NextPage = () => {
  return (
    <div>
      <main className="container mx-auto px-4 flex flex-col items-center">
        {/* Microscope illustration - adjust path as needed */}
        <div className="relative w-64 h-64 mb-8">
        </div>
        
        <h1 className="text-5xl font-bold text-gray-900 mb-6 text-center">404</h1>
        <h2 className="text-3xl font-semibold text-gray-800 mb-4 text-center">Page Not Found</h2>
        
        <p className="text-xl text-gray-600 max-w-lg text-center mb-10">
          The specimen you're looking for seems to have wandered out of view.
          Perhaps it's hiding under a different slide?
        </p>
        
        <div className="flex flex-col sm:flex-row gap-4">
          <Link 
            href="/"
            className="px-8 py-4 bg-blue-600 text-white font-medium rounded-lg hover:bg-blue-700 transition shadow-lg"
          >
            Return to Home
          </Link>
          
          <Link 
            href="/logbook"
            className="px-8 py-4 bg-gray-200 text-gray-800 font-medium rounded-lg hover:bg-gray-300 transition"
          >
            Browse the Logbook
          </Link>
        </div>
      </main>
    </div>
  );
};

export default NotFoundPage; 