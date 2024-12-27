import React from "react";

function CompanyIntroduce() {
  return (
    <section className="bg-gray-50 dark:bg-gray-900 py-16 px-6">
      <div className="container mx-auto grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
        {/* 사진 */}
        <div>
          <img
            src="/images/company-photo.png"
            alt="Company Team"
            className="rounded-lg shadow-lg w-full max-w-lg mx-auto"
          />
        </div>

        {/* 소개 텍스트 */}
        <div className="flex flex-col space-y-4 text-center md:text-left">
          <h1 className="text-4xl font-extrabold text-gray-800 dark:text-white">
            About Our Company
          </h1>
          <p className="text-lg text-gray-600 dark:text-gray-300 leading-relaxed">
            At VIS Investment, we specialize in cutting-edge stock market
            analysis and predictive modeling. Our mission is to empower
            investors with accurate, data-driven insights to make informed
            decisions in an ever-changing financial landscape.
          </p>
          <p className="text-lg text-gray-600 dark:text-gray-300 leading-relaxed">
            Utilizing advanced machine learning algorithms and comprehensive
            market data, we provide innovative tools and strategies for
            analyzing trends, identifying opportunities, and minimizing risks.
            Our team is dedicated to transforming complex financial data into
            actionable insights.
          </p>
          <p className="text-lg text-gray-600 dark:text-gray-300 leading-relaxed">
            Whether you are a seasoned investor or just starting your financial
            journey, VIS Investment is your trusted partner in achieving your
            investment goals. Together, we navigate the market and build a
            future of financial confidence.
          </p>
        </div>
      </div>
    </section>
  );
}

export default CompanyIntroduce;
