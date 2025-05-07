import React from 'react';
import { useNavigate } from 'react-router-dom'; // 👈 Import useNavigate

export default function Features() {
  const navigate = useNavigate(); // 👈 Initialize navigate

  return (
    <div className="min-h-screen bg-slate-50 py-20 px-6">
      <div className="max-w-6xl mx-auto text-center">
        <h1 className="text-4xl font-bold text-blue-600 mb-6">Our Features</h1>
        <p className="text-slate-600 text-lg mb-12">
          Discover the powerful features that make financial management smarter, faster, and easier.
        </p>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-12">
          {/* Feature 1 */}
          <div className="rounded-lg bg-white p-6 shadow hover:shadow-lg transition">
            <h2 className="text-2xl font-semibold text-teal-600 mb-4">Smart Bill Splitting</h2>
            <p className="text-slate-600">
              Automatically split bills with friends and family using AI-powered algorithms that understand your context.
            </p>
          </div>

          {/* Feature 2 */}
          <div className="rounded-lg bg-white p-6 shadow hover:shadow-lg transition">
            <h2 className="text-2xl font-semibold text-indigo-600 mb-4">Auto Budgeting</h2>
            <p className="text-slate-600">
              Categorize your expenses and get smart budget suggestions based on your transaction habits.
            </p>
          </div>

          {/* Feature 3 */}
          <div className="rounded-lg bg-white p-6 shadow hover:shadow-lg transition">
            <h2 className="text-2xl font-semibold text-rose-600 mb-4">Fraud Detection</h2>
            <p className="text-slate-600">
              Get notified instantly about any suspicious activities with real-time fraud detection systems.
            </p>
          </div>
        </div>

        {/* 👇 Get Started Button */}
        <button
          onClick={() => navigate('/signin')} 
          className="mt-8 rounded-lg bg-blue-600 px-8 py-3 text-white font-semibold shadow-md hover:bg-blue-700 transition"
        >
          Get Started
        </button>
      </div>
    </div>
  );
}
