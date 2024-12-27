import React from "react";

function HomePage() {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-white dark:bg-black text-black dark:text-white px-6">
      <h1 className="text-4xl font-bold mb-4 text-center">Welcome to VIS Investment</h1>
      <p className="text-lg mb-6 text-center max-w-3xl">
        At VIS Investment, we specialize in delivering innovative financial solutions tailored to meet the needs of our clients. Our commitment to excellence and forward-thinking strategies ensure sustainable growth and success.
      </p>
      <p className="text-sm text-gray-600 dark:text-gray-400 text-center max-w-3xl">
        Founded in 2024, VIS Investment focuses on leveraging technology and data-driven insights to provide world-class investment management services. We believe in empowering our clients through transparency, integrity, and innovation.
      </p>
      <div className="mt-8">
        <button className="bg-blue-600 hover:bg-blue-700 text-white py-2 px-6 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500">
          Learn More
        </button>
      </div>
    </div>
  );
}

export default HomePage;
